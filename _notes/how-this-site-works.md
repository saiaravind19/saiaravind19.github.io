---
title: How this site works
date: 2026-10-14
summary: Push a markdown file, get a page. A quick guide for future me.
---
Every page here is a plain markdown file in a git repo.

- **A new project:** add `_projects/my-project.md`. It appears on the Projects page and, if `featured: true`, on the home page.
- **A new note:** add `_notes/my-note.md` with a `date` and `summary`.
- **A standalone page:** add `anything.md` at the top level with a `title` and a `permalink`, then add it to `_data/nav.yml` if it should be in the menu.

GitHub Pages builds the site on every push, so there is nothing to run locally.
