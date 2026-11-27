---
title: "From 3 commits a week to 97 in a day: what changed when my agents started committing"
date: 2026-11-27
type: blog
tags:
  [AI agents, git, developer productivity, code review, multi-agent systems, engineering metrics]
summary: For most of 2026 I averaged about three commits a week. Since October my repositories see hundreds a week, peaking at 97 in one day. Most of them are not mine. Here is the real data, how one agent change travels from issue to production, and what that volume taught me about review, attribution and measuring the right thing.
---

This is a follow-up to [Joji: an operating system for a team of AI agents](/writing/joji-running-a-team-of-ai-agents/). That post was about the architecture. This one is about what it did to my git history, because the change is easier to see in commits than in any diagram.

## The numbers

I pulled every commit from every repository on my GitHub account for 2026, and split them three ways: commits I made, commits my agents made, and scheduled automation (backups, daily batches). Merge commits and other people's commits are left out.

![Commits per week in 2026, stacked by me, agents and automation](/writing/from-three-commits-a-week-to-ninety-seven-a-day/commits-per-week.svg)

- **January to September:** about **3 commits a week** on average. In **24 of those 38 weeks I committed nothing at all.** Side projects happened in bursts, then stopped.
- **1 October to 27 November:** **1,441 commits.** 924 by agents (64%), 428 by me (30%), 89 by automation (6%). Weekly totals between 62 and 357.
- **Busiest day:** 23 November, **97 commits across 11 repositories**, 88 of them by agents.
- **Merges into main:** 7 in the first nine months, **389** in the last two.

![Every day of 2026 as a GitHub-style heatmap](/writing/from-three-commits-a-week-to-ninety-seven-a-day/every-day-2026.svg)

Two things stand out. My own commits went up too, from 113 in the first nine months to 428 in the last two, because I now spend my time on the system and on review instead of on typing. And the agents' share keeps growing: this week they made about 90% of it.

## The work doesn't stop when I do

![Commits by hour of day since October](/writing/from-three-commits-a-week-to-ninety-seven-a-day/hour-of-day.svg)

My commits follow my day: they start around nine and thin out late in the evening. The agents keep going through the evening and past midnight, and the grey spike at 3 a.m. is the nightly memory backup. A change can be reviewed, fixed, tested on staging and shipped while I'm offline: one went live at 11:46 p.m. this week. If it gets stuck, it waits for me in the morning with one clear question.

## One change, end to end

A raw commit count says nothing about whether the work is any good. What makes the volume safe is the shape every change takes:

![Git graph of one agent change from issue to production](/writing/from-three-commits-a-week-to-ninety-seven-a-day/one-change-git-graph.svg)

1. An issue is filed, by me or by an agent that hit a problem (the opportunity-hunt agent files bugs against the application engine it uses).
2. An engineer agent branches, writes tests first, then the fix and the docs. That is three or four commits.
3. A separate reviewer agent reviews the pull request and records findings by severity.
4. The engineer fixes them, and the reviewer looks again. After three rounds with something serious still open, it comes to me.
5. A clean review merges, deploys and verifies the live result.

That is why one change produces five to ten commits. The volume is the trail of a process, not a measure of output.

## What the volume taught me

**1. Commits are exhaust. Measure what ships.** The numbers I actually watch are changes merged and verified live, the things that came back to me, and a small set of scripted tests for the lead agent's behaviour that run before I change anything in her core. The commit chart is nice to look at. It is not the scoreboard.

**2. If agents commit as you, you need attribution.** My agents push through my GitHub account, so GitHub shows every commit as mine. My first weekly summary of "what I built" happily credited me with an agent's afternoon of Unicode edge cases. Now every commit is tagged me, agent or automation from the identity it was made with, and only my own work feeds the summary and my writing ideas.

**3. A review loop needs an exit.** At one point every merged follow-up pull request spawned a new follow-up issue from the reviewer, which spawned another pull request. The board was never empty, so the next step never started. The fix was boring: a cap on fix rounds, and minor leftovers go to one backlog issue instead of a new loop.

**4. Many writers means stale copies.** The agents work on a server; I push from my laptop. An agent once searched its own out-of-date copy of a repository, decided a project didn't exist, and made a duplicate folder. The rule now is simple: pull first, before reading or changing any repository.

**5. Volume multiplies small bugs.** The most useful thing the test set found was not a model problem. A size limit was quietly cutting the lead agent's standing rules down to a short preview, so for weeks she had only part of her instructions. At three commits a week I would never have noticed. At ninety, the misses were visible enough to go looking.

## Where this leaves me

I write less code by hand than I did in September, and far more of my code reaches production. My job has moved to the parts the agents can't own: deciding what matters, writing the rules, reviewing the hard calls and fixing the system when it drifts. The git history is just the most honest record of that shift.

_Run it on your own history:_ the scripts behind these numbers and charts are open source as [commit-pulse](https://github.com/vaibhava17/commit-pulse). It works on any GitHub account or local repositories, you write the rules for who is human, agent or automation, and it is usable by hand or by an AI agent.

_How I counted: default branches of every repository on my account, 1 January to 27 November 2026, from the GitHub API. Merge commits and collaborators' commits excluded. "Agents" means commits made from the agent server's identity; "automation" means scheduled jobs such as backups._
