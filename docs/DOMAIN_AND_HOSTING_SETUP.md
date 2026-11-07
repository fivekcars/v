# VIX-SCAN — Live Hosting & Domain Setup Guide

Domain: **vix-scan.co.uk**
Website: a static build of this repository (`npm run build` → `dist/`).

There are two parts to going live:

1. **Switch on GitHub Pages** for this repository — one toggle, section 1.
2. **Point the domain at GitHub Pages** in the registrar control panel, sections 2 and 3.

Other hosts (Netlify, Vercel, Cloudflare Pages) remain configured in the repo if you ever want them,
but they are not needed.

---

## 1. One-time: switch on GitHub Pages (30 seconds)

The repository is public and the deployment workflow is already committed, so **GitHub Pages is the
only thing needed** — no extra account, no extra service, no billing.

1. Open <https://github.com/fivekcars/v/settings/pages>
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
   If it currently says **Deploy from a branch**, that is the wrong setting — branch mode publishes
   the raw source files instead of the built site, which produces a blank page.
3. That is the whole setup. The workflow `Deploy VIX-SCAN website` builds `dist/` and publishes it on
   every push to `main`.

> This toggle is the one step that cannot be automated: creating a Pages site requires repository
> administration rights, which the automation token used here does not have.

If an earlier run failed because Pages was not enabled yet, open
**Actions → Deploy VIX-SCAN website → Re-run all jobs** once after enabling it.

Your site will be live at `https://fivekcars.github.io/v/` immediately, and at `https://vix-scan.co.uk`
once the domain is attached (section 2).

---

## 2. Attach `vix-scan.co.uk`

After the first successful deploy:

1. Go to **Settings → Pages → Custom domain**, enter `vix-scan.co.uk`, click **Save**.
   (`public/CNAME` already ships the same value with every deploy.)
2. Add the DNS records in the table below at your registrar (section 3 explains exactly where).
3. Wait for GitHub to show **DNS check successful**, then tick **Enforce HTTPS**.

### DNS records for GitHub Pages

| Type | Name / Host | Value | TTL |
|---|---|---|---|
| A | `@` (apex / root) | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |
| CNAME | `www` | `fivekcars.github.io` | 3600 |
| CAA (optional) | `@` | `0 issue "letsencrypt.org"` | 3600 |

IPv6 equivalents (optional but recommended):

| Type | Name | Value |
|---|---|---|
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

> The `www` record must be a **CNAME** (not an A record) pointing at `fivekcars.github.io`
> — no `https://`, no trailing slash, no repository name.

---

## 3. Where to enter these records at your registrar

The wording differs slightly per company, but the path is always the same:
**log in → your domain → DNS / DNS records / Manage DNS → add record**.

- **123-reg** — *Manage domain* → **Advanced DNS** → *Add new record*.
- **GoDaddy** — *Domain portfolio* → your domain → **DNS** → *Add new record*.
- **Namecheap** — *Domain List* → **Manage** → **Advanced DNS** → *Add new record*.
- **Cloudflare** — *Websites* → `vix-scan.co.uk` → **DNS** → **Records** → *Add record*.
- **IONOS / 1&1** — *Domains & SSL* → domain → **DNS** → *Add record*.
- **Gandi** — *Domain* → **DNS Records** → *Add*.
- **Fasthosts** — *Domains* → **DNS** → *Add DNS record*.
- **Google Domains / Squarespace Domains** — *Domain* → **DNS** → *Custom records*.

### Step-by-step

1. Log in to the registrar where `vix-scan.co.uk` was purchased.
2. Open the domain and find **DNS settings / DNS management**. If the registrar offers
   "nameservers" and "DNS records" tabs, stay on **DNS records** (do not change nameservers).
3. **Delete or edit conflicting records first:**
   - Remove any existing **A record** for `@` that points at a parking/placeholder IP.
   - Remove any existing **CNAME** for `www` pointing at a parking page.
   - Do **not** delete **MX** or **TXT** records — those handle email, including `vix.scan@yahoo.com`
     alias routing and domain verification.
4. Add the **four A records** for `@` exactly as listed in section 2.
5. Add the **CNAME** record for `www` → `fivekcars.github.io`.
6. Save. Some panels ask for `@` vs blank: use `@` (or leave the name field empty) for the apex.
7. If the panel has a **TTL** field, `3600` (1 hour) is fine; lower it to `300` while testing.
8. Wait 15–60 minutes, then check propagation:
   - `nslookup vix-scan.co.uk`
   - `nslookup www.vix-scan.co.uk`
   - or https://dnschecker.org
9. In **GitHub → Settings → Pages**, confirm the custom domain shows **DNS check successful**,
   then tick **Enforce HTTPS**.

---

## 4. Alternative hosts (optional — not needed)

### Netlify

| Type | Name | Value |
|---|---|---|
| A | `@` | `75.2.60.5` |
| CNAME | `www` | `<your-site-name>.netlify.app` |

### Vercel

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

### Cloudflare Pages

| Type | Name | Value |
|---|---|---|
| CNAME | `@` | `<your-project>.pages.dev` (Cloudflare flattens the apex for you) |
| CNAME | `www` | `<your-project>.pages.dev` |

---

## 5. Troubleshooting

### The domain loads, but the page is blank
The Pages **Source** is set to *Deploy from a branch*. That publishes the raw repository root, whose
`index.html` is the Vite shell that loads `/src/main.tsx` — browsers cannot execute TypeScript, so
nothing renders.

**Fix:** Settings → Pages → Build and deployment → **Source: GitHub Actions**. The built site in
`dist/` is then published instead.

### The browser says the connection is not secure
- You are on `http://` — tick **Enforce HTTPS** under Settings → Pages once the first Actions deploy
  has succeeded.
- The certificate is issued automatically by Let's Encrypt after GitHub's DNS check passes at the
  custom domain. This can take from a few minutes up to about an hour (occasionally 24 h).
- If it never becomes available, confirm the four A records point at `185.199.108–111.153` and that
  the `www` CNAME points at `fivekcars.github.io`.

### GitHub says "DNS check failed" but the records look right
- The check uses cached resolver data. Records with a 6-hour TTL (`21600`) can take that long to be
  picked up. Lower the TTL on the A/CNAME records to `300` at the registrar for faster re-checks.
- Click **Check again** next to the message on **Settings → Pages**.
- If it keeps failing, **remove** the custom domain, save, wait a minute, then **add**
  `vix-scan.co.uk` again. That forces a fresh check and a new certificate request.
- Confirm from your own machine: `nslookup vix-scan.co.uk` should return the four `185.199.*`
  addresses, and `nslookup www.vix-scan.co.uk` should return `fivekcars.github.io`.
- Certificate status: <https://api.github.com/repos/fivekcars/v/pages> → `https_certificate.state`.
  `new` / `approved` / `issued` = provisioning in progress; once issued, tick **Enforce HTTPS**.

### `fivekcars.github.io` redirects to `vix-scan.co.uk`
That is expected — the custom domain is attached, so GitHub redirects the default address to it.

---

## 6. Post-launch checks

- [ ] `https://vix-scan.co.uk` loads the VIX-SCAN homepage.
- [ ] `https://www.vix-scan.co.uk` also loads (add a redirect rule if your host does not do this automatically).
- [ ] Padlock/HTTPS is active and `http://` redirects to `https://`.
- [ ] Click-to-call works on a mobile: `+44 7440 687650`.
- [ ] Email links open to `vix.scan@yahoo.com`.
- [ ] Enquiry form → *Create enquiry* → *Email this enquiry* opens a pre-filled email.
- [ ] `https://vix-scan.co.uk/robots.txt` and `/sitemap.xml` are reachable.
- [ ] Submit the sitemap in **Google Search Console**, and create/claim a **Google Business Profile**
      for the Dalton-in-Furness service area.
- [ ] Send the site to a phone and a desktop and check the header phone number, contact cards and footer.

---

## 7. Things only the business owner can confirm

These are deliberately **not** invented in the code:

- Company/legal name, trading address and any VAT number for the footer.
- Verified insurance cover, qualifications and equipment claims before adding a trust badge.
- A postal address if you want it published (a service-area business can omit it).
- Whether you want a booking/payment provider (Stripe, Square) later — the current form uses email,
  which avoids storing customer data and therefore avoids most UK GDPR record-keeping for the site.
