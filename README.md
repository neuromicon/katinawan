# Katin-awan

React, Vite, and TypeScript website published on GitHub Pages at [neuromicon.github.io/katinawan](https://neuromicon.github.io/katinawan/).

## Event calendar

<<<<<<< HEAD
The calendar reads CSV from the public `Events` tab in Google Sheets. Only rows whose `Published` cell is strictly `TRUE` (case-insensitive) are displayed. The published sheet must contain public event data and must not include private application, payment, or organizer notes. Keep a stable `event_id` (or `id`), `title`, `starts_at` (or `start date`), and `Published` column. Optional columns include `ends_at`, `timezone`, `description`, `capacity`, and `location`.

The browser requests the published CSV directly via `VITE_EVENTS_CSV_URL`. A successful CSV with no `Published=TRUE` rows displays “No upcoming ceremonies yet”; a network, format, or schema error displays “Could not load confirmed dates”. There is no local dummy event fallback.

`apps-script/Code.gs` contains a read-only `doGet` endpoint that returns public rows from the same `Events` tab, filtered by `Published=TRUE`. If configured via the optional `VITE_APPS_SCRIPT_URL` environment variable, the client will automatically fall back to this Apps Script endpoint if the primary CSV feed request fails.
=======
The calendar reads CSV from the public `Events` tab in Google Sheets. Only rows whose `Published` cell is exactly `TRUE` are displayed. The published sheet must contain public event data and must not include private application, payment, or organizer notes. Keep a stable `event_id` (or `id`), `title`, `starts_at` (or `start date`), and `Published` column. Optional columns include `ends_at`, `timezone`, `description`, `capacity`, and `location`.

The browser requests the published CSV directly. A successful CSV with no `Published=TRUE` rows displays “Подтверждённых дат пока нет”; a network, format, or schema error displays “Не удалось загрузить даты”. There is no local event or application fallback.

`apps-script/Code.gs` contains one read-only `doGet` endpoint that returns public rows from the same `Events` tab, filtered by `Published=TRUE`. The website calendar currently reads the CSV feed directly; the Apps Script endpoint is not used as a client fallback.
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8

## Forms and media

Applications are handled only by the embedded Google Form. The contact section provides email and Messenger links; it does not collect form data on the site.

<<<<<<< HEAD
Gallery images live directly under `public/gallery/`. The build script `scripts/generate-gallery-manifest.mjs` creates `public/gallery/manifest.json` from those files.

Welcome and background audio are powered via the official YouTube IFrame API using off-screen embeds:
- Welcome track: `https://youtu.be/LiMpzfY2SH4`
- Background music (looping): `https://youtu.be/sei7b7p9doQ`

Audio begins after the first user interaction gesture (or successful browser autoplay), plays Welcome first, preloads the BGM track, and then automatically transitions into looping background music. Volume defaults to 20% and can be adjusted with the slider or muted. If a strict browser autoplay policy blocks the transition, the player cleanly presents the Play control so one tap resumes playback. Old local MP3 files are removed from the repository.

The Google Sheets CSV URL is configured in `.env` and documented in `.env.example` as `VITE_EVENTS_CSV_URL`.

## Local development

The repository uses `bun.lock` as its dependency lockfile (or `npm`).

```bash
bun install --frozen-lockfile # or npm install
bun run dev                  # or npm run dev
bun run lint                 # or npm run lint
bun run build                # or npm run build
=======
Gallery images live under `public/gallery/`. The build creates `public/gallery/manifest.json` from those files. Welcome and background audio are served from `public/audio/Welcome.mp3` and `public/audio/BGM.mp3`. Audio starts after the first user interaction, plays Welcome first, then loops BGM; volume defaults to 20% and can be muted or adjusted.

The Google Sheets CSV URL is public client-side configuration in `.env.example` as `VITE_EVENTS_CSV_URL`. Changing it does not make the sheet private. Publish only fields intended for every visitor.

## Local development

The repository uses `bun.lock` as its dependency lockfile.

```bash
bun install --frozen-lockfile
bun run dev
bun run lint
bun run build
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
```

`bun run build` writes the deployable site to `docs/` with the Vite base path `/katinawan/`. The build clears `docs/` before generating the Pages artifact; keep source assets in `public/`, not in `docs/`.

<<<<<<< HEAD
## Testing

Unit tests for core logic (CSV parsing, Manila timezone conversion, and strict `Published=TRUE` filtering) are located in `src/services/api.test.ts`. Run them with:

```bash
npx --yes tsx --test src/services/api.test.ts
```

=======
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` type-checks and builds on pushes and pull requests to `main`. Pushes to `main` are deployed with the GitHub Pages artifact actions. In the repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The workflow uploads the generated `docs/` directory and deploys it automatically.
