# saiaravind19.github.io

Personal site. Push markdown, get pages. Built with Jekyll, which GitHub Pages runs automatically on every push.

## Add content

| I want to add… | Create this file | Front matter |
|---|---|---|
| A project | `_projects/name.md` | `title`, `summary`, `tags: [..]`, optional `repo`, `demo`, `link`, `kind`, `highlight`, `featured: true`, `order` |
| A note / write-up | `_notes/name.md` | `title`, `date`, `summary` |
| A standalone page | `name.md` | `title`, `permalink`, optional `lede` |

The body is ordinary markdown. Code fences, tables, images and links all work.

## Edit shared content

Contact details, resume path and status line: `_data/profile.yml`. Headline numbers: `_data/proof.yml`. Jobs: `_data/experience.yml`. Skills: `_data/skills.yml`. Menu: `_data/nav.yml`.
Replace the resume by overwriting `assets/Sai_Aravind_resume.pdf`.

## Run locally (optional)

```
bundle install
bundle exec jekyll serve
```

## Demos and images

In a project's front matter:

```yaml
youtube: [VIDEO_ID, ANOTHER_ID]      # embedded players (load on click)
images:                              # gallery with click-to-zoom
  - /assets/img/projects/rig.jpg
  - { src: /assets/img/projects/sim.png, caption: "Gazebo run", alt: "Three drones in formation" }
```

Put image files in `assets/img/projects/`. Inside the markdown body you can also use
`{% raw %}{% include youtube.html id="VIDEO_ID" %}{% endraw %}` and
`{% raw %}{% include figure.html src="/assets/img/projects/x.png" caption="..." %}{% endraw %}`.
