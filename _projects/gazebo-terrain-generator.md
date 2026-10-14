---
title: Gazebo Terrain Generator
kind: Simulation tool
summary: Generate a complete Gazebo world for any place on Earth from real elevation, building and satellite data.
tags: [Gazebo, Python, Image Processing, ROS2]
repo: https://github.com/saiaravind19/gazebo_terrain_generator
link: https://gazebosim.org/docs/latest/projects_using_gazebo/
link_label: See it on the Gazebo site
highlight: Featured by Gazebo
featured: true
youtube: [TsV34XBntnY]
order: 2
---
## What it does

Search for a location, draw a region of interest on an interactive map, drop a spawn marker and generate. The tool pulls real elevation (Mapbox DEM) and satellite imagery and builds a ready-to-run Gazebo SDF world.

## Why I built it

Built at NewSpace Research as part of the simulation tooling used to test drone missions virtually before real flights. Real terrain makes simulation closer to what the drones meet in the field.

## Details

- Real terrain, buildings and satellite texture for any Earth location
- Configurable spawn points, tile resolution and output paths (via environment variables)
- Listed on the [official Gazebo projects page](https://gazebosim.org/docs/latest/projects_using_gazebo/)
