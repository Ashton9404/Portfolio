# Portfolio — Ashton Li

Personal developer portfolio. Bilingual (English / Traditional Chinese), English by default.

**Live:** <https://ashton9404.vercel.app>

## Stack

| Concern   | Choice                                      |
| --------- | ------------------------------------------- |
| Framework | Vue 3 (`<script setup>`, Composition API)   |
| Language  | TypeScript                                  |
| Build     | Vite                                        |
| Styling   | Tailwind CSS v4 (CSS-first, no config file) |
| Routing   | Vue Router (history mode)                   |
| i18n      | Vue I18n                                    |
| Meta/SEO  | `@unhead/vue`                               |
| Hosting   | Vercel                                      |

No state management library: the only shared state is the theme and the locale,
each handled by a composable over `localStorage`.

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script               | Purpose                            |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Dev server with HMR                |
| `npm run build`      | Type-check, then produce `dist/`   |
| `npm run preview`    | Serve the production build locally |
| `npm run type-check` | `vue-tsc` only                     |
| `npm run lint`       | ESLint with `--fix`                |
| `npm run format`     | Prettier over `src/`               |

## Project structure

```text
src/
├── assets/main.css        Tailwind entry + design tokens (@theme)
├── components/
│   ├── layout/            AppHeader, AppFooter, PageSection
│   ├── sections/          One component per page section
│   └── ui/                BaseButton, BaseCard, TechTag, SectionHeading, …
├── composables/           useTheme, useSeo, useMessageList
├── data/                  Language-independent content (profile, skills, …)
├── i18n/
│   ├── index.ts           createI18n + locale persistence
│   └── locales/           en.json · zh-TW.json
├── router/
├── types/i18n.d.ts        Global message-schema augmentation
└── views/                 HomeView, ProjectDetailView, NotFoundView
```

### Content lives in two places, on purpose

- `src/data/*.ts` — structured, language-independent facts: slugs, tech stacks,
  URLs, ISO dates.
- `src/i18n/locales/*.json` — prose only.

A GitHub URL or a tech-stack entry is therefore edited once, not once per
language. Dates are stored as ISO year-month and formatted through `Intl` at
render time, so English shows `Dec 2025` and Chinese `2025年12月` from one value.

### Adding a language

1. Copy `src/i18n/locales/en.json`, translate the values.
2. Add the locale to `SUPPORTED_LOCALES` and `messages` in `src/i18n/index.ts`.

`messages` is typed as `Record<AppLocale, MessageSchema>`, where `MessageSchema`
is `typeof en`. A missing or misspelled key fails `npm run type-check` rather
than silently falling back to English at runtime.

### Adding a project

1. Append an entry to `projects` in `src/data/projects.ts`.
2. Add the matching block under `projects.items.<i18nKey>` in **both** locale files.
3. Add the new URL to `public/sitemap.xml`.

## Internationalisation behaviour

- English is the default on a first visit. Browser language is deliberately
  **not** detected — the primary audience is international recruiters.
- The choice is stored in `localStorage` under `portfolio-locale` and restored
  on the next visit.
- `<html lang>` is kept in sync (`setLocale` in `src/i18n/index.ts` is the only
  writer of that attribute).

Known trade-off: switching language does not change the URL, so there are no
`hreflang` alternates. For a single-person portfolio this is an acceptable
simplification; making locale part of the path would be the fix if it ever matters.

## Theming

`light` / `dark` / `system`, persisted under `portfolio-theme`. An inline script
in `index.html` applies the resolved theme before first paint so a refresh in
dark mode never flashes white. Tailwind v4 defaults `dark:` to
`prefers-color-scheme`, so `main.css` redefines it against a `.dark` class:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Semantic tokens (`surface`, `fg`, `edge`, …) are CSS variables overridden inside
`.dark` and exposed to utilities via `@theme inline`. Components never reference
raw colour shades, so both themes change from one edit.

## SEO

- Static `<title>`, description, canonical, Open Graph, Twitter card and
  `Person` JSON-LD in `index.html`. Social crawlers do not run JavaScript, so a
  static copy is required for link previews to render.
- `useSeo()` (`src/composables/useSeo.ts`) updates the same tags per route for
  search engines, which do.
- `public/robots.txt` and a hand-written `public/sitemap.xml`.

## Deployment (Vercel)

1. Push the branch and open <https://vercel.com/new>.
2. **Import Git Repository** → `Ashton9404/Portfolio`.
3. Vercel detects Vite. Confirm the defaults:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. No environment variables are required — the site is fully static.
5. Deploy. Every push to `main` redeploys; pull requests get preview URLs.

`vercel.json` adds the SPA rewrite so `/projects/<slug>` resolves on a direct
visit or refresh, plus immutable caching for Vite's fingerprinted assets.

### Custom domain

Add it under **Settings → Domains** in Vercel, then update `siteUrl` in
`src/data/profile.ts` and the absolute URLs in `index.html`, `public/robots.txt`
and `public/sitemap.xml`.

## Before going live

- [ ] Add `Ashton_Li_Resume.pdf` to `public/resume/` — the "Download résumé"
      buttons link to `/resume/Ashton_Li_Resume.pdf`.
- [ ] Point `projects[].links.github` for **Laravel Admin Starter** at the real
      repository (currently a placeholder in `src/data/projects.ts`).
- [ ] Confirm the Vercel URL, then update `siteUrl` in `src/data/profile.ts`.

## Licence

Source code is available for reference. Written content, project descriptions
and the résumé are © Ashton Li.
