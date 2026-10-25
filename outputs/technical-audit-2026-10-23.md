# Technical Audit & Architecture Review — Katin-awan

Date: 2026-10-23  
Target: `https://github.com/neuromicon/katinawan` (branch: `main`)  
Deployment Target: GitHub Pages (`https://neuromicon.github.io/katinawan/`)

---

## 1. Executive Summary

This document reflects the current verified architecture and production-grade state of the Katin-awan web application following the audio overhaul, CSV data pipeline tightening, and asset reorganization.

Previous legacy artifacts referenced in historical reviews (such as localStorage mock fallbacks, admin PIN protection, fake event generators, and bulky local MP3 files) have been removed.

---

## 2. Key Subsystems & Status

### 2.1 Audio Subsystem (YouTube IFrame API)
- **Previous Issue**: Local MP3 files (`Welcome.mp3` ~9.4 MB and `BGM.mp3` ~6.0 MB) bloated the repository and failed to transition reliably from the Welcome track to the background music due to browser autoplay policy violations on the `ended -> play()` transition, `preload="none"`, and large payload sizes.
- **Current Solution**:
  - Replaced local files with YouTube streaming integration:
    - Welcome track: `https://youtu.be/LiMpzfY2SH4` (`LiMpzfY2SH4`)
    - Looping BGM: `https://youtu.be/sei7b7p9doQ` (`sei7b7p9doQ`)
  - All large local audio files (`public/audio/`, `docs/audio/`) removed from repository.
  - Implemented via the official YouTube IFrame API using off-screen player containers.
  - Audio sequence begins on first user interaction gesture (`pointerdown`, `keydown`, `touchstart`) or successful browser autoplay.
  - When the Welcome track ends, the player automatically triggers the BGM player and seamlessly loops.
  - If a browser blocks background transition, the UI cleanly updates to show the Play state so a single tap resumes immediately.
  - BGM is preloaded/cued as early as possible after Welcome starts.
  - Audio controls preserve the original UI design: Play/Pause toggle, Mute toggle, 0–100% volume slider defaulting to 20%, and track status indicator ('Welcome' / 'Background').

### 2.2 Event Calendar & Data Ingestion (`src/services/api.ts`)
- **Strict Environment Configuration**:
  - `VITE_EVENTS_CSV_URL` is strictly required. No hardcoded Google Sheets fallback URL is baked into the client bundle.
  - Missing environment variable immediately throws an informative error.
- **Strict `Published` Filtering**:
  - Rows are parsed and filtered strictly for `Published === 'TRUE'` (case-insensitive).
  - Rows with empty, missing, `FALSE`, or arbitrary values are strictly excluded.
- **Date & Timezone Handling**:
  - Events are parsed as `Asia/Manila` (UTC+8) and compared to UTC current time (`nowUtc`).
  - Past dates are excluded from the published schedule.
- **Apps Script Fallback**:
  - An optional Apps Script Web App fallback (`VITE_APPS_SCRIPT_URL`) is supported. If configured, the client attempts the CSV feed first and seamlessly falls back to the Apps Script endpoint if the CSV feed fails.
  - `apps-script/Code.gs` remains available for deployment to Google Apps Script.

### 2.3 Gallery Assets & Manifest Pipeline
- **Folder Flattening**:
  - Removed accidental nested `public/gallery/gallery/` folder and consolidated all 35 photographs directly under `public/gallery/`.
  - Updated `scripts/generate-gallery-manifest.mjs` to read directly from `public/gallery/` and generate clean relative image references without nested directory prefixes.
  - `public/gallery/manifest.json` correctly enumerates all 35 gallery photos with corresponding accessible alt descriptions.

### 2.4 SEO & Domain Configuration
- `public/robots.txt` points directly to the canonical GitHub Pages sitemap: `https://neuromicon.github.io/katinawan/sitemap.xml`.
- `public/sitemap.xml` specifies canonical location `https://neuromicon.github.io/katinawan/`.
- No lingering references to legacy development domains (e.g. Vercel).

### 2.5 Testing & Verification
- Unit test suite added in `src/services/api.test.ts` covering CSV parsing, header normalization, Manila timezone conversion, strict `Published=TRUE` validation, and past event filtering.
- Automated tests run via `npx --yes tsx --test src/services/api.test.ts`.
