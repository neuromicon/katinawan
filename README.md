# Katin-awan

React, Vite, and TypeScript website published on GitHub Pages at [neuromicon.github.io/katinawan](https://neuromicon.github.io/katinawan/).

## Event calendar

The calendar reads CSV from the public `Events` tab in Google Sheets. Only rows whose `Published` cell is exactly `TRUE` are displayed. The published sheet must contain public event data and must not include private application, payment, or organizer notes. Keep a stable `event_id` (or `id`), `title`, `starts_at` (or `start date`), and `Published` column. Optional columns include `ends_at`, `timezone`, `description`, `capacity`, and `location`.

The browser requests the published CSV directly. A successful CSV with no `Published=TRUE` rows displays “Подтверждённых дат пока нет”; a network, format, or schema error displays “Не удалось загрузить даты”. There is no local event or application fallback.

`apps-script/Code.gs` contains one read-only `doGet` endpoint that returns public rows from the same `Events` tab, filtered by `Published=TRUE`. The website calendar currently reads the CSV feed directly; the Apps Script endpoint is not used as a client fallback.

## Forms and media

Applications are handled only by the embedded Google Form. The contact section provides email and Messenger links; it does not collect form data on the site.

Gallery images live under `public/gallery/`. The build creates `public/gallery/manifest.json` from those files. Welcome and background audio are served from `public/audio/Welcome.mp3` and `public/audio/BGM.mp3`. Audio starts after the first user interaction, plays Welcome first, then loops BGM; volume defaults to 20% and can be muted or adjusted.

The Google Sheets CSV URL is public client-side configuration in `.env.example` as `VITE_EVENTS_CSV_URL`. Changing it does not make the sheet private. Publish only fields intended for every visitor.

## Local development

The repository uses `bun.lock` as its dependency lockfile.

```bash
bun install --frozen-lockfile
bun run dev
bun run lint
bun run build
```

`bun run build` writes the deployable site to `docs/` with the Vite base path `/katinawan/`. The build clears `docs/` before generating the Pages artifact; keep source assets in `public/`, not in `docs/`.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` type-checks and builds on pushes and pull requests to `main`. Pushes to `main` are deployed with the GitHub Pages artifact actions. In the repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The workflow uploads the generated `docs/` directory and deploys it automatically.
