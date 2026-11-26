---
title: "Joji: an operating system for a team of AI agents on one server"
date: 2026-11-26
type: case-study
tags: [AI agents, multi-agent systems, Hermes, LLM ops, agent security, case study]
summary: I run a small team of AI agents on one 4-core server, built on the open-source Hermes framework. The agents are replaceable. The real engineering is everything around them - task state, memory, permissions, recovery and human attention. Architecture, security model, real numbers and three incidents.
---

Joji started as a personal assistant I could message on WhatsApp. She is now the lead of a small team of AI agents that review code, ship releases, test on staging, triage my inbox and hunt for opportunities. They all run on one Linux server with 4 cores and 7 GB of RAM, on top of [Hermes](https://github.com/NousResearch/hermes-agent), the open-source agent framework from Nous Research.

This is not a demo. Every change to the system is logged, and the log has passed 270 entries. Reading it back end to end changed how I think about the project: **Joji is not a collection of AI agents. It is an operating system for autonomous workers.** The agents are replaceable. The engineering that matters is everything around them: persistent task state, reliable execution, memory, ownership and permissions, recovery, and managing the one resource that does not scale, my attention.

## The team

Each agent is a Hermes profile with its own persona, memory, skills and model settings:

- **Joji**, the lead. I talk to her in plain English; she understands the ask, delegates, follows up, and tells me what needs me.
- **Engineers** who pick up issues, open PRs and fix review findings.
- **A reviewer** who reviews every PR and records findings by severity.
- **A QA agent** who tests changes on staging in a real browser before anything ships.
- **An ops agent** who triages my mail and turns what matters into tasks.
- **A research agent** for plans and analysis, and an **opportunity-hunt agent** that finds and scores opportunities.

## Architecture

```
  Me
   │  WhatsApp · web dashboard
   ▼
  Joji (lead agent, always-on gateway)
   │  understands the ask · picks an owner · writes a brief · follows up
   ▼
  Launcher ── slot lock (2 runs per agent) ── run registry (append-only)
   │
   ├─ engineers   ├─ reviewer   ├─ QA   ├─ ops   ├─ research   └─ opportunity hunt
   │     one-shot runs: read the brief, do one step, report
   ▼
  Deterministic drivers (no LLM): release pipeline · follow-ups · watchdog · scheduled jobs
   │
   ▼
  Shared infrastructure: task state files · memory · logs · model routing + budget proxy
```

**How a message travels.** I send Joji a request. She works out what is being asked and who owns it (code in a repo goes to that repo's engineer, a review to the reviewer, a mail problem to ops), writes a **brief** (a short Markdown file: task, context, acceptance criteria, constraints, who to report to) and launches the owner with it.

**How an agent gets context.** Every run starts fresh. The agent gets its own persona and lessons, two shared files every agent sees on every turn (my standing rules, and a short "world" file of people, projects and current state), the brief, and the repo's own instructions. It does not inherit Joji's conversation. If something is not in those, the agent does not know it, which turned out to be a feature: it forces every hand-off to be written down.

**How results come back.** An agent ends its run with a structured report to the driver that owns the task (for a PR, the release pipeline), and a one-line summary in an ops channel. Joji reads those reports to answer "what's the status of X?" instead of guessing.

**Where task state lives.** In plain files, not in anyone's memory: an append-only registry of runs (who, what, when, exit code, which model), one state file per release pipeline with its full history, a queue for follow-ups, and a ledger of open questions waiting for me. A dashboard reads the same files.

**What happens when an agent crashes.** The launcher records the exit. A step killed from outside (a restart, an out-of-memory kill, my own "stop everything") is re-queued quietly, up to three times, instead of being counted as a failure. A watchdog checks every two minutes for runs that died without reporting. A run that keeps dying reaches me as one message with the log.

## The task lifecycle

Everything Joji delegates follows the same shape. Each transition has exactly one owner:

```
CREATED ─► RUNNING ─► REPORTED ─► (next step) ─► DONE
   │          │           │
   │          ├─► BUSY ───┘  agent's slots full: retried on the next tick
   │          ├─► KILLED ─►  re-queued (max 3), then NEEDS YOU
   │          └─► FAILED ─►  NEEDS YOU, with the log
   └─ WAITING ─► starts when the run it depends on finishes
```

| Transition                    | Owner                                                 |
| ----------------------------- | ----------------------------------------------------- |
| created (brief written)       | Joji, a scheduled job, or the pipeline                |
| started, busy, killed, failed | the launcher (slot lock + run registry)               |
| reported                      | the agent itself, once, at the end of its run         |
| next step / done              | the deterministic driver for that kind of work        |
| needs you                     | the driver, after a rule says only a human can decide |

**No duplicate execution.** Each agent has two run slots guarded by a lock; a third launch exits immediately with a "busy" code and is retried. A follow-up that is registered after the run it waits for has already finished fires straight away instead of waiting forever (that was a real bug). Two agents never own the same step: the pipeline state file names the owner.

**Can agents delegate to each other?** Only through the same mechanism: an agent writes a brief or files an issue, and the owner picks it up through the launcher. There is no agent-to-agent chat.

## The release pipeline

A plain Python driver on a five-minute timer, with no LLM in it, moves each PR through:

**review → fix → staging → QA → ship**

The reviewer approves or sends it back with findings. The owning engineer fixes them. Staging is deployed and QA tests it. Then the engineer merges and verifies production. After three fix rounds with something serious still open, the PR comes to me. Keeping this orchestration deterministic was the best early decision: **the model is creative inside a step; the plumbing between steps never is.**

## How Joji remembers things without remembering everything

Memory is layered, and most of it is deliberately small:

- **Per-agent memory.** Each agent has its own memory files and store. Agents do not read each other's.
- **Shared, capped files.** My standing rules and the "world" file are shown to every agent on every turn. Both have a hard size cap (around 7 KB each), checked nightly, so they stay current instead of growing into a second history.
- **Lessons.** At the end of a run, an agent may append **at most one** short lesson, with evidence. A nightly curator condenses them and archives the rest, so lessons stay specific and few.
- **Searchable history.** Every conversation is stored in SQLite with full-text search (FTS5), so "what did we decide about X?" is a search, not something an agent has to carry in context.
- **A semantic index.** An hourly job embeds facts, memory entries, the shared files and my past messages into a local vector index (tool output skipped, secrets redacted). A nightly job curates it.
- **Decisions live in one place.** For anything that needs my call, the question and my answer go into one tracker the agents read before asking. That is how "please stop asking me the same thing" got fixed.
- **Stale information.** Status lines in the world file are hints, not truth: the rule is to check live state before acting on one.

Context stays bounded because the system prompt is kept byte-stable (good for prompt caching), runs are one-shot, and long conversations are compressed rather than replayed.

## Security and permissions

The principle I keep coming back to: **an agent's ability to understand an action never implies permission to execute it.** Permissions are enforced by tools, drivers and caps, not by asking the model nicely.

| Action                                  | Who can do it                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Read code                               | engineers, reviewer, QA                                                                                             |
| Open a pull request                     | engineers                                                                                                           |
| Review a PR                             | reviewer, through a read-only GitHub wrapper: it can comment, not push or merge                                     |
| Merge to main / deploy production       | only the owning engineer, only in the pipeline's ship stage, after review (and QA on staging for products)          |
| Send email or message anyone in my name | nobody. Agents draft, I send. The only outbound channels are my DM and the ops channel                              |
| Read and triage my mail                 | the ops agent: labels, archives or bins, marks read. It never sends                                                 |
| Spend money on a paid model             | through a proxy with a hard daily cap and a smaller cap per agent                                                   |
| Submit applications                     | the opportunity-hunt agent, company career sites only, daily cap, and currently on hold until a supervised test run |
| Change production data                  | only through migration tooling that backs up first                                                                  |
| Restart the core service                | only with my OK, and only when no agent is mid-run                                                                  |

**Credentials.** API keys and tokens live in environment files and a secrets directory outside every repository. Agents use them through tools; the rule is that a secret is never printed, logged, committed or put in a brief. Secrets are backed up nightly, encrypted, to off-site storage, and the decryption key lives only on my laptop.

**Untrusted input.** Job postings, emails and web pages are treated as data, never instructions. Job postings go through a deterministic scanner for hidden text and prompt-injection patterns before an agent reads them.

**Public output.** This site's weekly post is written by Joji and published without my review, so it passes a deterministic privacy gate first (no private project names, hosts, ids, keys or people). If the gate finds anything, nothing is published.

**What isn't isolated yet.** All agents run as the same operating-system user. Permissions are enforced by tooling and process, not by OS-level sandboxing per agent. That is the next real step.

## Real numbers (last 14 days)

| Metric                             | Value        |
| ---------------------------------- | ------------ |
| One-shot agent runs                | 855          |
| Finished cleanly                   | 819 (96%)    |
| Killed or died mid-run             | 24           |
| Failed                             | 10           |
| Ran on a fallback model            | 22           |
| Median run length                  | 7 minutes    |
| PRs through the release pipeline   | 223          |
| Shipped                            | 200 (90%)    |
| Passed review with zero fix rounds | 143 (64%)    |
| Needed me at some point            | 88 (39%)     |
| Worst case                         | 7 fix rounds |

The number I care most about is the 39%. Most of those were legitimate (a product decision, a credential, a merge into something only I own), but it is the clearest measure of how much the system still leans on me. I don't have a reliable baseline for "hours saved" or cost per task yet, so I won't invent one.

## Two runs, end to end

**Shipping a change.** I asked for a page in one of my products to stop showing placeholder numbers and use real, sourced data. Joji wrote a brief and handed it to the engineer that owns that repo. The engineer opened a PR; the reviewer sent it back once; staging went up; QA failed it once for an unsourced claim it caught on the page; the engineer fixed it; QA passed; it shipped and was verified on production. About five hours from ask to production, two fix rounds, and no step that needed me.

**A failed CI run in my inbox.** The ops agent sees a "workflow failed" email. It does not reply to anything. It queues the failure for a small dispatcher (again, no LLM) that skips it if a pipeline already owns that PR or a rerun already passed, and otherwise starts the repo's owner with a brief: read the failing log, rerun if it is flaky, fix through a PR if it is real. One line goes to the ops channel. Two failed attempts in a day, and it stops and asks me instead of trying a third time.

## Three incidents

**Every message to Joji was announced twice.** _Root cause:_ the "announced" flag was set in memory after the record had already been saved; the next pass re-read the record and announced it again. _Fix:_ set the flag before saving. _Regression test:_ a test that sends one message and asserts exactly one announcement; it fails on the old code.

**Killed steps were counted as failures.** _Root cause:_ a step stopped from outside (a restart, my own stop) looked identical to an agent failing, so the driver escalated it to me. _Fix:_ treat externally killed exit codes as "re-queue", up to three times, then escalate. Restarts stopped generating noise.

**A review loop that looked like progress.** One PR went through six fix rounds: each round fixed the reviewer's findings, and each new review found a few new medium-severity ones. Every merged follow-up spawned another follow-up issue. _Fix:_ in that repo, after three rounds with nothing high-severity left, the PR ships, and the leftovers go to one shared backlog that blocks nothing. Only high-severity findings get their own issue.

## Models and money

The team runs mostly on a Claude subscription, so the main limit is usage quota, not a bill. A pacing script spreads work across the subscription's usage window instead of exhausting it early. When limits hit, runs fall back to other providers through a proxy that enforces a hard daily spending cap and a smaller cap per agent, so one runaway loop cannot burn the budget. Fallback keeps things moving, but a weaker model is not equivalent output, so when the subscription window runs low, new work waits for it to reset instead of starting on a fallback.

## What I still don't trust agents to do

- **Resolve ambiguity.** A vague ask still produces a confident, wrong plan.
- **Know when to stop reviewing.** A reviewer can always find one more thing. Stopping is a rule, not a judgment.
- **Guarantee production is fine.** QA on staging catches a lot. It is not proof.
- **Keep shared context fresh on their own.** Anything written down goes stale. Caps, curators and "check live state" rules slow that down; they do not stop it.
- **Be deterministic.** Deterministic orchestration does not make the agents deterministic. The same brief can take a different path twice.
- **Act in my name.** Agents draft; I send. That will not change soon.

## Rules that made it trustworthy

- **The live system must not break.** Back up before every edit, put new behaviour behind a flag, keep a written rollback.
- **Log every change**: what, how, the result, and how to revert it.
- **Nothing reaches production without its pipeline.** Shipping is a stage, not a side effect.
- **Facts only.** Applications, profiles and reports use what I have confirmed, never what sounds plausible.

## What I would tell someone starting

1. Make the orchestration deterministic and the steps small. Let the model be clever inside a step, never between steps.
2. Put task state in files with one owner per transition. Memory is for knowledge, not for state.
3. Enforce permissions in tools and drivers, not in prompts.
4. Log everything, then read the log. Patterns you cannot see day to day are obvious across a month.
5. Budget human attention like money. Every message that reaches you should need you.

Joji is still a work in progress, and that is the point: it is a system I live with every day, and it gets better one logged change at a time.
