---
title: Experience
permalink: /experience/
lede: Three robotics roles across warehouse fleets and aerial swarms, plus earlier internships.
---
{% for job in site.data.experience %}
### {{ job.role }}, {{ job.org }}

*{{ job.place }} · {{ job.when }}*

{% for pt in job.points %}- {{ pt }}
{% endfor %}
{% endfor %}

## Education

**University of Maryland, College Park**, M.Eng. in Robotics, Fall 2026 – present.

**Manipal Institute of Technology**, B.Tech. in Mechatronics, 2017 – 2021 (GPA 8.56 / 10).

## Earlier experience

{% for e in site.data.earlier %}- **{{ e.org }}**, {{ e.role }} ({{ e.when }}). {{ e.text }}
{% endfor %}

## Recognition

- **Gazebo terrain generator** is listed on the [official Gazebo site](https://gazebosim.org/docs/latest/projects_using_gazebo/).
- **1st place**, Techfest IIT Bombay Covideate, 2020–21 ([coverage](https://timesofindia.indiatimes.com/education/news/manipal-students-bag-global-covid-19-challenge-prize/articleshow/77892430.cms)).
- **3rd place**, India International Science Festival 2020, Swasth Bharath category.
- **IEEE paper:** [Automatic switching of water motor pump: a new approach](https://ieeexplore.ieee.org/document/9121147).
- **Begell House paper:** [Monitoring physiological data through wearable electronics](https://www.dl.begellhouse.com/references/0632a9d54950b268,51a4b7060f03db78,175e1f4572f79e03.html).
- **Udemy course:** [ESP32: A Beginner's Guide to IoT & Electronics](https://www.udemy.com/course/esp32-a-beginners-guide-to-iot-and-electronics/).
