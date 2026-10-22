# Sacred Plant Spirit Healing (Katin-awan)

> Public website and ceremonial reservation portal for Velada nocturnal vigils and sacred plant ceremonies in the Philippines.

🌐 **Live Website (GitHub Pages):** [https://neuromicon.github.io/katinawan/](https://neuromicon.github.io/katinawan/)  
📁 **GitHub Repository:** [https://github.com/neuromicon/katinawan](https://github.com/neuromicon/katinawan)  

---

## 🏛️ System Architecture

The project runs on a serverless, privacy-first static architecture with manual organizer verification:

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
| **Google Forms** | Primary participant application portal: contact details, Saturday vigil selection, intentions, safety screening, and consent. |
| **Google Sheets** | Private response database and administrative tracker: manual review, deposit verification, booking confirmation. |
| **Google Apps Script** | Secure Web App bridge connecting the public application interface with private Google Sheets and email notifications. |

---

## 🌿 Core Sections

1. **The Ceremony (Velada):** Traditional Mazatecan nocturnal vigil with powdered mushroom and ceremonial cacao, Philippine shamanic heritage (*Babaylan / Katalonan*), the meaning of *katin-awan* (Cebuano for *clarity and enlightenment*), and mandatory non-medical safety disclosures.
2. **Gathering Calendar:** Saturday nocturnal vigils scheduled at 3:00 PM with intimate circle capacity (10 to 12 seekers). Year filters, month selection, and real-time availability.
3. **Application & Intentions:** Embedded official Google Form with full-screen opening option, plus direct portal submission with reference tracking.
4. **Preparation Guide (La Dieta):** Phased dietary guidelines (avoiding alcohol, recreational drugs, and toxic media starting Monday; avoiding meat and sexual activity 2 days prior), interactive packing checklist, and weekend timetable.
5. **FAQ & Direct Contacts:** 14 categorized questions and contact action buttons (mailto email and Facebook Messenger).
6. **Organizer Console:** Private administrative interface with Google Drive backup, Google Sheets synchronization, and audit logging.

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
   - **Branch**: Select **`main`**, and select the folder **`/docs`**
   - Click **Save**.
4. The website will be live at: **[https://neuromicon.github.io/katinawan/](https://neuromicon.github.io/katinawan/)**

---

## 📄 License & Copyright

Copyright © 2026 Sacred Plant Spirit Healing (Katin-awan). All rights reserved.
