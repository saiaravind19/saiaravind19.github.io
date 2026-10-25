---
title: parallelverse
kind: Fleet simulator
summary: A 2D batch simulator built on the Madrona ECS engine that steps many warehouse worlds with hundreds of robots each in one process.
tags: [C++, Madrona, ECS, ZeroMQ, Protobuf]
repo: https://github.com/saiaravind19/parallelverse
featured: true
youtube: [JtwCn2WjRnU]
order: 2.5
---
## What it does

Each CSV layout becomes its own world, filled with differential-drive circular robots that follow waypoints with a trapezoidal speed profile and stop on contact. A top-down GUI shows one tab per world, and robots are commanded over ZeroMQ with protobuf messages.

## How it uses Madrona

Robots are ECS entities, and every step runs a task graph of systems (commands, drive, collision detect and resolve, status) across all worlds at once. Component columns are exported as flat buffers, so state and commands for every world move in a single batch.

## Why I built it

Gazebo is too heavy for fleets of hundreds of robots, so this gives a lightweight way to benchmark planners and task managers, like my [AMR sorting system](https://github.com/saiaravind19/sorting-system), at high robot density.
