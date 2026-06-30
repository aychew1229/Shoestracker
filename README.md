# 👟 SoleTrack — Shoe Marketplace Tracker

> A free, mobile-first Progressive Web App (PWA) for shoe retailers to track daily purchases, sales, profit, and stock — fully offline, no backend required.

[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?logo=github)](https://pages.github.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-green?logo=pwa)](https://web.dev/progressive-web-apps/)
[![Offline First](https://img.shields.io/badge/Works-Offline-orange)](https://web.dev/offline/)
[![No Backend](https://img.shields.io/badge/Backend-None-lightgrey)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 📸 Features at a Glance

| Feature | Details |
|---|---|
| 🔐 Multi-user login | Username + local password, fully siloed per user |
| 📥 Buy Registry | Log shoe batches with date, style, qty, cost per unit |
| 💰 Sell Registry | Log sales with live profit preview before confirming |
| 📊 FIFO Profit Tracking | Profit calculated against the actual cost of that specific stock batch |
| 📦 Stock Alerts | Color-coded inventory (🔴 ≤5 / 🟡 ≤15 / 🟢 OK) |
| 📈 Monthly Reports | Revenue vs buy cost vs net profit with margin % |
| 💾 Export / Import | JSON backup & restore — no data loss if cache is cleared |
| 📴 Offline Mode | Full offline support via Service Worker |
| 📲 Installable | Add to Home Screen on Android and iOS (PWA) |

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it `soletrack` (or any name you prefer)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload the Files

Upload these files/folders to the root of your repository:

```
soletrack/
├── index.html      ← Main app
├── manifest.json   ← PWA manifest
├── sw.js           ← Service Worker (offline support)
└── icons/          ← App icons (used for install + home screen)
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-maskable-192.png
    └── icon-maskable-512.png
```

**Via GitHub website (easiest):**
1. Open your repository
2. Click **Add file → Upload files**
3. Drag in `index.html`, `manifest.json`, `sw.js`, and the entire `icons` folder (drag the folder itself — GitHub preserves the folder structure)
4. Click **Commit changes**

**Via Git (if you have it installed):**
```bash
git clone https://github.com/YOUR_USERNAME/soletrack.git
# Copy the 3 files into the folder
cd soletrack
git add .
git commit -m "Initial SoleTrack release"
git push
```

### Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings** (top tab)
2. Scroll down to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch → **/ (root)** folder
5. Click **Save**

### Step 4 — Access Your App

After 1–2 minutes, your app is live at:

```
https://YOUR_USERNAME.github.io/soletrack/
```

> ✅ That's it! Share this link with anyone who needs to use the app.

---

## 📲 Installing on a Phone (Add to Home Screen)

### Android (Chrome)
1. Open the app link in Chrome
2. After a couple seconds, SoleTrack shows its own **"Install SoleTrack"** banner at the bottom of the screen
3. Tap **Install** → confirm in the native prompt that appears
4. The app icon appears on your home screen like a native app

### iPhone / iPad (Safari)
1. Open the app link in Safari
2. SoleTrack detects iOS Safari and shows a banner with instructions
3. Tap the **Share** button (box with arrow pointing up)
4. Scroll down and tap **Add to Home Screen**
5. Tap **Add** to confirm

> 💡 Once installed, the app works completely offline — even with no internet.

---

## 🔐 How the Login System Works

- All data is stored **locally in your browser** using `localStorage`
- Each username creates its own isolated data space
- Passwords are hashed before storage (not stored in plain text)
- **Different users on the same device** each have their own separate data
- Logging out just clears the active session — all data is preserved

> ⚠️ Data is tied to the **browser + device**. If you switch phones or clear browser storage, use Export/Import to move your data.

---

## 💡 How FIFO Profit Tracking Works

When you record a sale, SoleTrack automatically looks at your purchase history and calculates profit using the **FIFO (First-In, First-Out)** method:

**Example:**
- Jan 1: Bought 10 pairs of "Nike Air" @ ETB 800 each
- Jan 15: Bought 10 more pairs of "Nike Air" @ ETB 900 each
- Jan 20: Sold 5 pairs of "Nike Air" @ ETB 1,200

**Result:** Profit = `(1200 - 800) × 5 = ETB 2,000`
The oldest stock (ETB 800 batch) is used first — this is the correct accounting method.

---

## 💾 Backup & Restore Data

### Exporting
1. Go to **Reports** tab
2. Tap **Export JSON**
3. A file like `soletrack_username_2025-07-01.json` downloads to your device
4. Store it safely in Google Drive, WhatsApp saved files, or email to yourself

### Importing
1. Go to **Reports** tab
2. Tap **Import JSON**
3. Select your backup file
4. Records are merged (no duplicates created)

> ✅ You can import the same file multiple times safely.

---

## 📁 File Structure

```
soletrack/
│
├── index.html          Main single-page application
│                       Contains all HTML, CSS, and JavaScript
│
├── manifest.json       PWA Web App Manifest
│                       Controls install behavior, app name, icons, theme
│
├── sw.js               Service Worker
│                       Enables offline functionality and caching
│
├── icons/              App icons for install prompts & home screen
│   ├── icon-192.png            Standard icon (Android, browser tabs)
│   ├── icon-512.png            Standard icon (splash screens)
│   ├── icon-maskable-192.png   Maskable icon (adaptive icon shapes)
│   └── icon-maskable-512.png   Maskable icon (adaptive icon shapes)
│
└── README.md           This documentation file
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | Vanilla HTML5 + CSS3 (no frameworks) |
| Fonts | Google Fonts (Outfit + Inter) — cached offline |
| Data Storage | `localStorage` (per-user key isolation) |
| Offline Support | Service Worker (Cache-first strategy) |
| Install Prompt | Web App Manifest + `beforeinstallprompt` API |
| Deployment | GitHub Pages (free static hosting) |

---

## 📊 Data Storage Format

All data is stored as JSON in localStorage with this structure:

```
st_users                        → { username: { hash, created } }
st_{username}_purchases         → [ { id, date, style, qty, cost } ]
st_{username}_sales             → [ { id, date, style, qty, price, costPerUnit } ]
```

---

## 🔧 Customization

### Change Currency Symbol
In `index.html`, search for `ETB` and replace with your currency (e.g. `USD`, `KSh`, `NGN`).

### Change Low Stock Threshold
In `index.html`, find this line and change `5` and `15` to your preferred thresholds:
```javascript
const cls = qty <= 5 ? 'low' : qty <= 15 ? 'warn' : 'ok';
```

### Update the App Version (force cache refresh)
In `sw.js`, change the cache name:
```javascript
const CACHE_NAME = 'soletrack-v1.3'; // bump this number
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| App not loading after deploy | Wait 2–5 minutes for GitHub Pages to build |
| Install button not appearing | Use Chrome on Android; Safari on iOS |
| Old version still showing | Hard refresh: Ctrl+Shift+R (desktop) or clear site data |
| Data disappeared | Was the browser cache cleared? Use Export regularly |
| Can't see the app offline | Visit once online first so SW can cache it |

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

*Built with ❤️ for Ethiopian shoe retailers — SoleTrack runs entirely in your browser, costs nothing, and works anywhere.*
