# VIX-SCAN — Live Hosting & Domain Setup Guide

Domain: **vix-scan.co.uk**
Website: a static build of this repository (`npm run build` → `dist/`).

There are two parts to going live:

1. **Host the files** (this repository is already configured for Netlify, Vercel, Cloudflare Pages and GitHub Pages).
2. **Point the domain at the host** in the registrar control panel (DNS records below).

---

## 1. Choose your host

| Host | Cost | Best for | Config in this repo |
|---|---|---|---|
| **Netlify** (recommended) | Free | Works with this **private** repository on the free plan; simple DNS instructions | `netlify.toml` |
| **Cloudflare Pages** | Free | Free DNS + CDN; private repos supported | Build command `npm run build`, output `dist` |
| **Vercel** | Free | Fast global CDN, preview deployments | `vercel.json` |
| **GitHub Pages** | Free | Only for **public** repos (or a paid GitHub plan) | `.github/workflows/deploy.yml` |

> **Important:** `github.com/fivekcars/v` is currently a **private** repository. GitHub Pages is not
> available for private repositories on the free plan, so use **Netlify**, **Cloudflare Pages** or
> **Vercel** — or make the repository public if you prefer GitHub Pages.

You only need one host. The steps below cover Netlify first, then GitHub Pages.

---

## 2. Deploy with Netlify (recommended)

1. Go to <https://app.netlify.com> and sign in (GitHub login is easiest).
2. **Add new site → Import an existing project → GitHub**, then choose `fivekcars/v`.
3. Netlify reads `netlify.toml` automatically. Confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy site**. The first build takes about a minute.
5. Your site appears at `https://<random-name>.netlify.app`. Check it loads.
6. **Domain management → Add a domain** → enter `vix-scan.co.uk`.
7. Netlify shows the records to add. Choose one of the two options:

   **Option A — keep DNS at your registrar (simplest)**

   | Type | Name / Host | Value | TTL |
   |---|---|---|---|
   | A | `@` (apex / root) | `75.2.60.5` | 3600 |
   | CNAME | `www` | `<your-site-name>.netlify.app` | 3600 |

   If your registrar supports **ALIAS / ANAME / CNAME flattening**, you can use
   `apex-loadbalancer.netlify.com` as the apex target instead of the A record.

   **Option B — use Netlify DNS**

   Copy the four nameservers Netlify gives you (for example `dns1.p01.nsone.net`) into the
   registrar's **Nameservers** tab and save. Netlify then manages all records itself.

8. In Netlify, set **Primary domain** to `vix-scan.co.uk`. Netlify adds the `www` → apex redirect
   automatically.
9. HTTPS is provisioned automatically by Let's Encrypt once DNS resolves. Check
   **Domain management → HTTPS** shows "Your connection is secure".

The build re-runs on every push to `main`, so publishing a change is just a `git push`.

### DNS records for GitHub Pages (public repository only)

Add these at your registrar (section 3 explains where):

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

> The `www` CNAME must be a **CNAME** (not an A record) and must point at `fivekcars.github.io`
> — no `https://`, no trailing slash, no repository name.

Then, in GitHub: **Settings → Pages → Source: GitHub Actions**, and set the custom domain to
`vix-scan.co.uk`. `.github/workflows/deploy.yml` publishes `dist/` on every push to `main`, and
`public/CNAME` keeps the domain attached.

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
4. Add the **A records** for `@` exactly as listed for your chosen host in section 2 or 4.
5. Add the **CNAME** record for `www` pointing at the host address your host gave you
   (for example `fivekcars.github.io` or `<your-site-name>.netlify.app`).
6. Save. Some panels ask for `@` vs blank: use `@` (or leave the name field empty) for the apex.
7. If the panel has a **TTL** field, `3600` (1 hour) is fine; lower it to `300` while testing.
8. Wait 15–60 minutes, then check propagation:
   - `nslookup vix-scan.co.uk`
   - `nslookup www.vix-scan.co.uk`
   - or https://dnschecker.org
9. In your host's dashboard, confirm the domain shows as verified, then enable HTTPS / "Force HTTPS".

---

## 4. Alternative hosts — DNS records

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

## 5. Post-launch checks

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

## 6. Things only the business owner can confirm

These are deliberately **not** invented in the code:

- Company/legal name, trading address and any VAT number for the footer.
- Verified insurance cover, qualifications and equipment claims before adding a trust badge.
- A postal address if you want it published (a service-area business can omit it).
- Whether you want a booking/payment provider (Stripe, Square) later — the current form uses email,
  which avoids storing customer data and therefore avoids most UK GDPR record-keeping for the site.
