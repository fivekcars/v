# VIX-SCAN — Cloudflare DNS + HTTPS Setup

The domain `vix-scan.co.uk` now uses Cloudflare nameservers and Cloudflare is proxying
traffic to the GitHub Pages origin. This guide completes the remaining settings.

---

## 1. What Cloudflare has already imported

Verified from public DNS:

| Record | Present | Notes |
|---|---|---|
| `A` apex | ✅ | Proxied (returns `188.114.96.x/97.x`) |
| `AAAA` apex | ✅ | Proxied (returns `2a06:98c1:...`) |
| `MX` | ✅ | `fwd0/fwd1/fwd2.hosts.co.uk` (email forwarding preserved) |
| `www` CNAME | ❌ **missing** | Add it (below) |
| `_github-pages-challenge-fivekcars` TXT | ❌ **missing** | Add it (below) |

---

## 2. Add these two records in the Cloudflare dashboard

**Dashboard → `vix-scan.co.uk` → DNS → Records → Add record**

### `www` (so `www.vix-scan.co.uk` also works)

| Field | Value |
|---|---|
| Type | `CNAME` |
| Name | `www` |
| Target | `fivekcars.github.io` |
| Proxy status | **Proxied** (orange cloud) |
| TTL | `Auto` |

### GitHub domain-verification TXT (recommended)

GitHub generated this value when you verified the domain at account level. Copy it from
**GitHub → Settings (your avatar) → Pages → the verified domain row**.

| Field | Value |
|---|---|
| Type | `TXT` |
| Name | `_github-pages-challenge-fivekcars` |
| Content | `<the long value GitHub shows>` |
| Proxy status | **DNS only** (grey cloud) |
| TTL | `Auto` |

---

## 3. Check the apex A record's origin

The proxied A record hides its target. Click the `A` record for `@` and make sure the
**value (origin)** is still the GitHub Pages IPs:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

(Cloudflare normally imports these correctly; this is just a check.)

---

## 4. SSL / HTTPS settings

**Dashboard → `vix-scan.co.uk` → SSL/TLS**

1. **Overview → Encryption mode = `Full`**
   - Why not `Full (strict)`: the origin (GitHub Pages) presents a `*.github.io`
     certificate for the domain, so strict hostname validation would fail.
   - Do not use `Flexible` — that would leave the Cloudflare ↔ GitHub leg unencrypted.
2. **Edge Certificates → Always Use HTTPS = ON**
   (This redirects `http://` visitors to `https://` at Cloudflare's edge.)
3. Optional: **Edge Certificates → Automatic HTTPS Rewrites = ON**.

---

## 5. Verify

After the nameserver change finishes propagating (up to a few hours, usually much less):

- `https://vix-scan.co.uk` loads with a padlock (Cloudflare-issued certificate).
- `http://vix-scan.co.uk` redirects to `https://`.
- `https://www.vix-scan.co.uk` loads (GitHub redirects it to the apex).

> Ignore any remaining "DNS check" warning on **GitHub → Settings → Pages**. It compares the
> domain against GitHub's own IPs, but the domain now intentionally resolves to Cloudflare's IPs.
> The site is served by GitHub Pages *through* Cloudflare, so the warning is expected and harmless.

---

## 6. Undoing / changing later

- To hand DNS back to GitHub's own cert system, set the A/AAAA/CNAME records to **DNS only**
  (grey cloud) and set SSL mode to `Full (strict)` once GitHub has issued its certificate.
- Email forwarding stays on `fwd0/1/2.hosts.co.uk` via the MX records — don't delete them.
