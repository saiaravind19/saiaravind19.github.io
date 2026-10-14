---
title: Drone Show with PX4
kind: Multi-drone system
summary: Drones form shapes extracted from any input image, using decentralized collision avoidance during formation changes.
tags: [PX4, ROS, Gazebo, Qt, RVO, Image Processing]
repo: https://github.com/saiaravind19/px4_drone_show
highlight: Swarm
featured: true
youtube: [PH_vu_SqwpU]
order: 4
---
## What it does

Give it an image. Image processing extracts the shape and the drones fly into that formation. PX4 handles flight control, and a Qt UI lets you feed in images and monitor the show.

## Collision avoidance

Transitions between shapes are where drones are most likely to cross paths. Each drone uses Reciprocal Velocity Obstacles (RVO), so avoidance is decentralized: no central planner, and no single point of failure.

## Stack

PX4, ROS, Gazebo, Qt and image processing.
