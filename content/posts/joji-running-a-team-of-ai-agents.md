---
title: "Joji: what running a team of AI agents on one server taught me"
date: 2026-11-26
type: case-study
tags: [AI agents, multi-agent systems, Hermes, LLM ops, case study]
summary: I run a small team of AI agents on one Linux server, built on the open-source Hermes agent framework. After more than 270 logged changes, the hard problems were never the model. They were hand-offs, stale state, and alerts.
---

Joji started as a personal assistant I could message on WhatsApp. She is now the lead of a small team of AI agents that review code, ship releases, test on staging, triage my inbox, and hunt for jobs. They all run on one Linux server, on top of [Hermes](https://github.com/NousResearch/hermes-agent), the open-source agent framework from Nous Research.

This is not a demo. Every change to the system is logged, and the log has passed 270 entries. Reading it back end to end was the most useful thing I did this month, because the problems repeat, and they are not the ones I expected.

## The team

Each agent is a Hermes profile with its own persona, memory, skills and model settings:

- **Joji**, the lead. I talk to her in plain English; she routes work, follows up, and tells me what needs me.
- **Engineers** who pick up issues, open PRs and fix review findings.
- **A reviewer** who reviews every PR and records findings by severity.
- **A QA agent** who tests changes on staging before anything ships.
- **An ops agent** who reads mail and turns what matters into actions.
- **A research agent** for plans and analysis, and a **job-hunt agent** that finds and scores roles.

A small web dashboard gives me one place to see what everyone is doing and to message any agent directly.

## The release pipeline

Agents are one-shot: each run does one step and reports back. A plain Python driver on a five-minute timer, with no LLM in it, moves each PR through the stages:

**review → fix → staging → QA → ship**

The reviewer approves or sends it back with findings. The owning engineer fixes them. Staging is deployed and QA tests it. Then the engineer merges and verifies production. Every stage change is one line in an ops channel; only failures and decisions reach me directly.

Keeping the orchestration deterministic was the best early decision. The model does the creative part of each step. The plumbing between steps should never be creative.

## What actually broke

When I categorised every incident in the log, the model was rarely the problem. The repeat offenders were:

**Hand-offs lost between steps.** A follow-up registered after the run it was waiting for had already finished, so it waited forever. A step killed by a restart was counted as a failure instead of being retried. The fix in both cases was boring: make every hand-off durable, and treat "killed from outside" differently from "failed".

**Stale state.** An agent reports "done", the dashboard keeps saying "in progress". A decision I had already made kept coming back as a new question. Now every status has a single owner that writes it, and decisions live in one place the agents read before asking.

**Loops that look like progress.** This week a PR went through six fix rounds. Each round fixed the reviewer's findings, and each review found a few new medium-severity ones. Every merged follow-up spawned another follow-up issue. It looked busy and never finished. The fix: after three rounds with nothing high-severity left, ship it and move the leftovers to one shared backlog that blocks nothing.

**Alert noise.** Early on, everything pinged me. The rule now: routine progress goes to the ops channel, only failures and decisions come to me, and duplicate messages are a bug with a test. The last one was a single line of code: a "message announced" flag was set after the record was saved, so the next pass announced it again.

**Operating-system details.** Editing a running shell script killed a live agent run, because bash reads scripts as it executes them; scripts are now replaced atomically. A systemd one-shot unit killed the agent runs it started; one setting (`KillMode=process`) fixed it.

## Models and money

The team runs mostly on a Claude subscription, with an automatic fallback chain to other providers when limits hit. A small proxy enforces a hard daily spending cap for the paid fallback and a separate cap per agent, so one runaway loop cannot burn the budget. A pacing script spreads work across the subscription's usage window instead of exhausting it in an hour.

## Rules that made it trustworthy

- **The live system must not break.** Back up before every edit, put new behaviour behind a flag, and keep a written rollback.
- **Log every change**: what, how, the result, and how to revert it.
- **No agent merges to production without its pipeline.** Shipping is a stage, not a side effect.
- **Agents never contact anyone in my name.** They draft; I send.
- **Facts only.** Job applications, profiles and reports use what I have confirmed, never what sounds plausible.

## What I would tell someone starting

1. Make the orchestration deterministic and the steps small. Let the model be clever inside a step, never between steps.
2. Log everything, then read the log. Patterns you cannot see day to day are obvious across a month.
3. Budget human attention like money. Every message that reaches you should need you.
4. Expect the boring failures: lost hand-offs, stale state, duplicate alerts. They are most of the work, and fixing them is what makes the system feel reliable.

Joji is still a work in progress. That is the point: it is a system I live with every day, and it gets better one logged change at a time.
