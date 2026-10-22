# Katin-awan — Sacred Plant Spirit Healing

> **Katin-awan** (Cebuano: *clarification, explanation, enlightenment* — from the root *tin-aw*, clear/lucid).  
> Elegant, production-grade website and ceremonial booking container for Sacred Plant Spirit Healing in the Philippines.

[![CI Validation](https://github.com/neuromicon/katinawan/actions/workflows/ci.yml/badge.svg)](https://github.com/neuromicon/katinawan/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/new)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)

---

## 🌿 Overview

This repository contains the complete frontend, booking workflow, administration dashboard, and backend integration for **Katin-awan** / **Sacred Plant Spirit Healing**:

- **Public Experience:**
  - **The Ceremony:** Mazatecan *Velada* nocturnal vigil, Philippine *Babaylan/Katalonan* animist heritage, and mandatory non-medical safety disclosures.
  - **Gathering Calendar:** Dynamic event capacity badges (`Open`, `Almost Full`, `Waitlist`, `Closed`), date selection, and sanctuary privacy policy.
  - **Ceremony Application:** High-trust booking form with input validation, immediate application reference generation (`KTW-YYYYMMDD-XXXX`), and clear deposit warnings.
  - **Preparation Guide (La Dieta):** Phased dietary and lifestyle guidelines (Monday & Thursday protocols) with an interactive packing checklist and 2-day timetable.
  - **FAQ:** 14 categorized questions with instant search.
  - **Contact & Status Lookup:** Direct channel (`katinawanph@gmail.com`, Messenger) and live self-service application status checker.
- **Organizer Console (Admin):**
  - Protected with organizer authentication (Demo PIN: `1234` or `katinawan`).
  - Strict 6-stage booking state machine: `PENDING_REVIEW` → `AWAITING_DEPOSIT` → `DEPOSIT_REPORTED` → `DEPOSIT_VERIFIED` → `CONFIRMED` (with `WAITLISTED`, `DECLINED`, `CANCELLED`).
  - Capacity calculation and lock protection.
  - Event management (create, modify capacity, publish, close).
  - 1-click CSV export of applications.
  - Audit logs tracking administrative actions.
- **Google Drive Integration (Direct Workspace API):**
  - Sign in with Google using official Google Identity / Firebase Auth.
  - Direct 1-click **Export Application Tracker to Drive** (creates timestamped CSV on Drive).
  - 1-click **Save Form Specification to Drive** (saves the 5-section questionnaire specification from `form__21b2401e.md` to Drive).
  - 1-click **Create Sanctuary Folder** (`Katin-awan Ceremonies & Applications`) in Google Drive.
  - Live Drive File Browser with search, direct web view links, and safe deletion confirmation.
- **GitHub & CI/CD Hub:**
  - Configured for `https://github.com/neuromicon/katinawan`.
  - Continuous deployment connected to Vercel.
  - GitHub Actions CI validation workflow (`.github/workflows/ci.yml`).
  - Direct repository and workflow links inside the Organizer Console.
- **Architecture Dual Mode:**
  - **Zero-Config Standalone Mode:** Runs out of the box on Vercel with reactive local storage persistence (perfect for demonstrations, previews, and testing).
  - **Google Apps Script + Google Sheets Mode:** Connects to a private spreadsheet with automated Gmail notifications using the provided `/apps-script/` bundle.

---

## 🚀 Deployment to Vercel (for `https://github.com/neuromicon/katinawan`)

### Method 1: Automatic Continuous Deployment (Recommended)

1. **Push this codebase to GitHub:**
   ```bash
   git remote add origin https://github.com/neuromicon/katinawan.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Open [Vercel Dashboard](https://vercel.com/new).
   - Select **Import Git Repository** and choose `neuromicon/katinawan`.
   - Vercel automatically detects the framework:
     - **Framework Preset:** `Vite`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`
   - Click **Deploy**.

3. **Continuous Deployment (CI/CD):**
   - Every push to the `main` branch automatically triggers a production deployment with preview URLs generated for pull requests.
   - The `.github/workflows/ci.yml` workflow automatically runs typechecking and builds on every commit and PR.

### Method 2: Deployment via Vercel CLI

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Authenticate
vercel login

# 3. Link and Deploy
vercel link
vercel --prod
```

---

## ⚙️ Environment Variables

Configure these in the Vercel Project Settings (**Settings → Environment Variables**):

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_APPS_SCRIPT_URL` | *(Optional)* URL of deployed Google Apps Script Web App | `https://script.google.com/macros/s/AKfycb.../exec` |
| `VITE_APP_URL` | Production application public URL | `https://katinawan.vercel.app` |
| `VITE_ADMIN_API_KEY` | *(Optional)* Custom key for server-side Apps Script authorization | *(random string)* |

*Note: If `VITE_APPS_SCRIPT_URL` is omitted, the application uses its built-in local persistence engine seamlessly.*

---

## 📊 Google Sheets & Google Apps Script Backend Setup

The `/apps-script/` folder contains production-ready Google Apps Script files:

```
apps-script/
├── Code.gs           # Entrypoint (doGet, doPost, routing)
├── Auth.gs           # Admin allowlist & Google Identity checks
├── Events.gs         # Gathering data service & capacity calculation
├── Applications.gs   # Concurrency LockService, applicant registration & transitions
├── Payments.gs       # Deposit reporting & verification
├── Notifications.gs  # Email templates (Received, Approved, Confirmed, Waitlist)
└── Admin.gs          # Dashboard summaries, settings & audit logs
```

### Setup Steps:
1. Create a new Google Spreadsheet in Google Drive named **Katinawan Sanctuary Data**.
2. Open **Extensions → Apps Script**.
3. Copy the `.gs` files from `/apps-script/` into the script editor.
4. Set Script Properties in **Project Settings → Script Properties**:
   - `SPREADSHEET_ID`: (Your Google Sheet ID)
   - `ADMIN_EMAILS`: `neuromicon@gmail.com,katinawanph@gmail.com`
   - `ADMIN_API_KEY`: *(Optional secret)*
5. Click **Deploy → New deployment**:
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (allows public form submission while admin functions require authentication)
6. Copy the **Web App URL** and add it as `VITE_APPS_SCRIPT_URL` in Vercel or in the in-app Organizer Settings tab.

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/neuromicon/katinawan.git
cd katinawan

# Install dependencies
npm install

# Start local development server
npm run dev

# Run typecheck and build validation
npm run lint
npm run build
```

---

## 🛡️ Security & Ethical Guidelines

- **No Medical Claims:** The website strictly avoids claiming cures or guarantees for psychiatric or medical conditions.
- **Non-Commercial Spiritual Respect:** Honors Mazatecan Velada traditions and indigenous Philippine spiritual lineages (*Katalonan/Babaylan*).
- **Sanctuary Privacy:** Exact geographic coordinates are never displayed publicly; directions are delivered only after organizer verification.

---

## 📄 License

Apache-2.0. Copyright © 2026 Sacred Plant Spirit Healing (Katin-awan).
