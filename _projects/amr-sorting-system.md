---
title: AMR Sorting System
kind: Multi-robot fleet
summary: Warehouse sorting with a ROS2 robot fleet, A* path planning, state-machine task management and a Rust gRPC/Modbus hub.
tags: [ROS2, Rust, gRPC, Modbus, Python]
repo: https://github.com/saiaravind19/sorting-system
featured: true
youtube: [eQAzZhX_X8I]
order: 1
---
## Architecture

1. **ROS2 fleet layer:** navigation, A* path planning on a predefined map, and state-machine task management across multiple robots (Behaviour Tree support for scaling).
2. **Rust communication hub:** gRPC and Modbus bridge for status and messages between the fleet and the delivery hub.
3. **Python delivery hub:** simulates a PLC, with a GUI for bin management.

## Why it is split this way

Each layer can be tested and replaced on its own, and the Modbus interface is the same protocol industrial PLCs commonly use.
