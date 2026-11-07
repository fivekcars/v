# VIX-SCAN — Website

Independent mobile vehicle diagnostics, inspections and fleet condition intelligence for
Dalton-in-Furness, Barrow-in-Furness, Ulverston and the wider Furness area.

**Live domain:** [vix-scan.co.uk](https://vix-scan.co.uk)  
**Email:** vix.scan@yahoo.com · **Phone:** +44 7440 687650

---

## What is in this repository

| Path | Purpose |
|---|---|
| `index.html` | HTML shell, SEO metadata and `AutomotiveBusiness` structured data |
| `src/VixScan.tsx` | The homepage: all sections, copy and the enquiry flow |
| `src/vix-scan.css` | Full design system (colours, typography, layout, responsive rules) |
| `src/site-config.ts` | **Single source of truth** for phone, email, domain, areas and hours |
| `src/main.tsx` | Client entry — hydrates the pre-rendered HTML |
| `src/entry-server.tsx` | Build-time entry used to pre-render the page |
| `scripts/prerender.mjs` | Injects the pre-rendered markup into `dist/index.html` |
| `public/` | `favicon.svg`, `robots.txt`, `sitemap.xml`, `CNAME`, `404.html`, web manifest |
| `docs/DOMAIN_AND_HOSTING_SETUP.md` | **Registrar DNS guide** for `vix-scan.co.uk` |
| `docs/CLOUDFLARE_SETUP.md` | **Active Cloudflare DNS + HTTPS configuration** |
| `replit-export/` | Original Replit export and `Vvix-main.zip` (design source/reference — not used by the build) |
| `Furness_Vehicle_Insight_Full_Website_and_Business_Blueprint.md` | Business and product blueprint |

The React/JSX design and CSS were taken from the original Replit export saved in `Vvix-main.zip`.
The deployable site lives at the repository root so GitHub Pages, Netlify and Vercel can all
build it with one command.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build

```bash
npm run build      # client bundle + pre-render → dist/
npm run preview    # serve dist/ at http://localhost:4173
```

`npm run build` does three things:

1. `vite build` — bundles the site into `dist/`.
2. `vite build --ssr` — compiles the same component for Node so it can be rendered once at build time.
3. `scripts/prerender.mjs` — writes the rendered HTML into `dist/index.html`, then hydrates in the browser.

That means search engines, link previews and visitors without JavaScript still get the full page
content, including the phone number and email address.

---

## Editing business details

All contact details live in `src/site-config.ts`:

```ts
export const site = {
  email: "vix.scan@yahoo.com",
  phoneDisplay: "+44 7440 687650",
  phoneLink: "tel:+447440687650",
  whatsapp: "https://wa.me/447440687650",
  domain: "vix-scan.co.uk",
  // …
};
```

The same values are duplicated in two static places that cannot import TypeScript:

- `index.html` — `<title>`, meta description and JSON-LD structured data.
- `public/404.html` — the standalone not-found page.

Update all three if the phone number or email ever changes.

---

## Deployment

The site is a static build hosted free on **GitHub Pages** — no other service or account needed.

1. In the repository: **Settings → Pages → Source: GitHub Actions** (one-time toggle).
2. Every push to `main` builds `dist/` and publishes it via `.github/workflows/deploy.yml`.
3. Add the custom domain and DNS records in `docs/DOMAIN_AND_HOSTING_SETUP.md`.

Alternative configs are included if you ever need them: `netlify.toml`, `vercel.json` (Cloudflare
Pages also works with build `npm run build` and output `dist`).

Full DNS and registrar instructions: [`docs/DOMAIN_AND_HOSTING_SETUP.md`](docs/DOMAIN_AND_HOSTING_SETUP.md).

---

## Content and compliance notes

The site follows the blueprint's evidence-led positioning. It deliberately does **not**:

- claim a diagnosis is guaranteed, or that an inspection makes a vehicle safe to buy;
- present a fault code as proof that a component has failed;
- promise EV battery testing without a vehicle-specific compatibility check;
- describe an inspection as an MOT, statutory roadworthiness certificate or warranty.

The enquiry form does not post to a server. It builds the message in the browser and opens the
visitor's own email app addressed to `vix.scan@yahoo.com`, so no customer data is stored by the site.
If a real booking/database backend is added later, update the privacy notice and the form FAQ
answer at the same time.
