# Olivetta Loyalty Card 🌿

A digital loyalty stamp card web app for **Olivetta Nail Studio** built with React + Vite + Tailwind CSS.

## Features

- **Customer Signup / Login** — Simple email + name signup, stored in `localStorage`
- **Stamp Card** — 10-stamp cycle with visual stamp grid
- **QR Code Stamping** — Scan at the salon to add a stamp
- **Tiered Rewards**
  - Stamp 5 → 10% off + free 10 min massage
  - Stamp 10 → 20% off + free 15 min massage (card resets after)
- **Admin Panel** — PIN-protected customer management

---

## How to Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## How the QR Stamp URL Works

Place a QR code at the salon (at reception, on a small card at each station, or on the mirror frame) that points to:

```
https://yourdomain.com/stamp?token=OLIVETTA
```

When a logged-in customer scans the QR code with their phone camera:
1. The browser opens `/stamp?token=OLIVETTA`
2. The app validates the token
3. A stamp is added to their card
4. If they've reached stamp 5 or 10, the reward modal pops up
5. They're redirected back to their card

**Important:** The customer must be logged in (email entered) on their phone for the stamp to register. If they're not logged in, they're redirected to the login page.

---

## Admin Page

**URL:** `/admin`
**PIN:** `OLIVETTA2024`

The admin panel lets you:
- View all registered customers and their stamp counts
- Manually add a stamp to any customer
- Reset a customer's card back to 0
- Delete a customer

---

## Deploy Instructions

### Netlify

1. Build the app: `npm run build`
2. The `dist/` folder is deployed
3. Or connect your GitHub repo to Netlify for auto-deploys on push

```bash
npm run build
# Upload the dist/ folder to Netlify
```

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root
3. Follow the prompts — Vercel auto-detects Vite

```bash
npm i -g vercel
vercel
```

### Generic Static Hosting

```bash
npm run build
# Upload contents of dist/ to your hosting provider
```

The app is fully client-side — any static file host works.

---

## Design

- **Colors:** Terracotta, dusty olive, sandy cream, azure, dark espresso
- **Fonts:** Cormorant Garamond (headings) + Inter (body)
- **Style:** Warm, Mediterranean luxury with rounded cards and soft shadows

---

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router 6
- localStorage (no backend)
