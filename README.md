# Sacred Plant Spirit Healing (Katin-awan)

> Public website and registration portal for Velada nocturnal vigils and sacred plant ceremonies in the Philippines.

🌐 **Live Website (GitHub Pages):** [https://neuromicon.github.io/katinawan/](https://neuromicon.github.io/katinawan/)  
📁 **GitHub Repository:** [https://github.com/neuromicon/katinawan](https://github.com/neuromicon/katinawan)  
⚡ **Google Apps Script Endpoint:** `https://script.google.com/macros/s/AKfycbwzY-NMBbpaKxX8XYtPRDiRnvc7EW_yRQEaYLzj3mOa8eOclhpVX-Z98K2SJ5mwxQeaMQ/exec`

---

## 🏛️ System Architecture

The project runs on a serverless, static architecture with strict privacy and manual organizer verification:

```
[GitHub Repository] ──(build)──> [GitHub Pages]
                                      │
                              (submit application)
                                      ▼
                                [Google Forms]
                                      │
                              (record responses)
                                      ▼
                                [Google Sheets]
                         (restricted organizer access)
```

| Component | Responsibility |
| :--- | :--- |
| **GitHub Pages** | High-performance static web interface (React, TypeScript, Tailwind CSS, assets). Zero hosting cost, automated SSL, global CDN. |
| **Google Forms** | Primary participant application: contact details, date selection, intentions, safety & health screening, emergency contacts. |
| **Google Sheets** | Private response database and administrative tracker: manual review, deposit verification, booking confirmation. |
| **Google Apps Script** | Secure Web App bridge connecting the public application interface with private Google Sheets and Gmail notifications. |

---

## 🌿 Core Sections

1. **The Ceremony (Velada):** Traditional Mazatecan nocturnal vigil with powdered mushroom and ceremonial cacao, Philippine shamanic heritage (*Babaylan / Katalonan*), the meaning of *katin-awan* (Cebuano for *clarity and enlightenment*), and mandatory non-medical safety disclosures.
2. **Gathering Calendar:** Live status indicators for confirmed gathering dates. When dates are unconfirmed or pending, visitors can apply with flexible dates.
3. **Application & Intentions:** Application form with input validation, reference ID generation (`KTW-YYYYMMDD-XXXX`), consent verification, and clear deposit notices.
4. **Preparation Guide (La Dieta):** Phased dietary guidelines (avoiding alcohol, recreational drugs, and toxic media starting Monday; avoiding meat and sexual activity 2 days prior), interactive packing checklist, and weekend timetable.
5. **FAQ & Direct Contacts:** 14 categorized questions and verified contact channels (`katinawanph@gmail.com`, Facebook Messenger).
6. **Organizer Console:** Private administrative interface (PIN: `1234` or `katinawan`) with Google Drive backup, Google Sheets synchronization, and audit logging.

---

## 🛠️ Local Development & Build

```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Run TypeScript type check
npm run lint

# Build production bundle for GitHub Pages
npm run build
```

---

## 🚀 Publishing to GitHub Pages

1. Open repository settings at **[github.com/neuromicon/katinawan](https://github.com/neuromicon/katinawan)**.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**
   - **Branch**: Select **`main`**, and select the folder **`/docs`** (or branch **`gh-pages`** / root)
   - Click **Save**.
4. The website will be live at: **[https://neuromicon.github.io/katinawan/](https://neuromicon.github.io/katinawan/)**

---

## 📄 License & Copyright

Copyright © 2026 Sacred Plant Spirit Healing (Katin-awan). All rights reserved.
