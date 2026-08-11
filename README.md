# perlmutter.tech

Personal site of Alexandre Perlmutter — Cloud & Platform Engineer.
Static-generated with [Astro](https://astro.build), styled with Tailwind CSS 4, deployed to GitHub
Pages at [www.perlmutter.tech](https://www.perlmutter.tech).

## Requirements

Node `>=22.12`. Astro's ESLint parser additionally wants `^22.22.3 || ^24.16.0 || >=26.3.0`, so
prefer an LTS at or above those patches.

## Commands

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Dev server with HMR at `localhost:4321`        |
| `npm run build`   | Production build to `dist/`                    |
| `npm run preview` | Serve the built output locally                 |
| `npm run check`   | `astro check` — types and template diagnostics |
| `npm run lint`    | ESLint over `.astro`, `.ts` and config files   |
| `npm run format`  | Prettier write                                 |
| `npm run verify`  | check + lint + format:check, same gates as CI  |

## Architecture

```
src/
  assets/       images processed by astro:assets (responsive, AVIF/WebP)
  components/   presentational .astro components
  content/      content collections — articles (md/mdx), schema in src/content.config.ts
  data/         typed structured records — site, experience, projects, certifications, education
  lib/          shared helpers — article fetching and date formatting
  layouts/      Base.astro — head, theme bootstrap, nav/footer shell
  pages/        file-based routes
  styles/       global.css — design tokens and base layer
public/         served verbatim — CNAME, robots.txt, favicon, og-default.png
scripts/        one-off generators, not part of the build
```

### Social card

`public/og-default.png` (1200×630) is what `og:image` points at. It is generated, not
hand-drawn — regenerate it with:

```sh
swift scripts/og-card.swift public/og-default.png
```

The script converts the same OKLCH tokens `global.css` declares into sRGB, so the card
cannot drift from the dark theme. The role line is duplicated from `site.role`; keep them
in step. Requires macOS (AppKit/CoreText) and is deliberately outside `npm run build` —
the output is committed.

### Writing

Articles are Markdown or MDX under `src/content/articles`; the filename is the slug. Frontmatter
is validated by the schema in `src/content.config.ts` — `title`, `description` and `pubDate` are
required, `updatedDate`, `tags` and `draft` optional. Drafts render under `astro dev` and are
excluded from both the build and `/rss.xml`.

Body styles live in the `.prose` class in `global.css` rather than `@tailwindcss/typography`,
which would ship its own colour and rhythm scale to fight back to these tokens.

> Deleting an article can leave a ghost entry in `node_modules/.astro/data-store.json`, which
> makes the build fail on a path whose file no longer exists. `rm node_modules/.astro/data-store.json`
> clears it — purging `.astro/` does not.

### Design tokens

Semantic colour tokens are declared in OKLCH on `:root` and `.dark` in `src/styles/global.css`, then
surfaced to Tailwind through `@theme inline` so utilities resolve them at runtime rather than baking
values in. Every foreground/background pair is WCAG AA verified in both themes.

Do not hardcode colours in components — use `paper`, `surface`, `line`, `line-strong`, `ink`,
`ink-muted`, `ink-faint`, `accent`, `accent-ink`, `accent-wash`.

### Theming

`Base.astro` carries an `is:inline` script that resolves the theme before first paint, so there is no
flash on load. The preference is tri-state (`system` / `light` / `dark`) and lives in `localStorage`
under `theme`; absence means "follow the system". `ThemeToggle.astro` owns the cycling.

### JavaScript budget

No UI framework is registered. The only client JS is the pre-paint theme resolver and a small
`IntersectionObserver` for scroll reveals — a couple of KB total. Add `@astrojs/react` back only when
a component genuinely needs component state.

## Deployment

`main` deploys automatically via `.github/workflows/deploy.yml`, gated behind type check, lint,
format check and build. Every other branch and PR runs the same gates through `ci.yml`.

`public/CNAME` pins the custom domain and must stay in `public/` so it is emitted into `dist/`.
