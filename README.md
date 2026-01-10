# Ethiopian Schools Project – Starter Website

This folder contains a lightweight static website starter for **ethiopianschoolsproject.org**.

## Files

- `index.html` – Home
- `about.html`
- `programs.html`
- `impact.html`
- `donate.html`
- `contact.html` – includes a Netlify-compatible contact form
- `privacy.html`
- `css/styles.css` – site styling
- `js/main.js` – small nav + footer year script
- `assets/` – placeholder logo + favicon

## Customize (recommended)

1. Update the **mission** and **program descriptions**
2. Add **real impact stats** (only what you can verify)
3. Add a real **contact phone**, **email**, and **mailing address**
4. Add your donation platform embed code to `donate.html`
5. Replace `assets/logo.svg` with your logo

## Publish Options

### Option A: Netlify (free & easy)

1. Create a Netlify account
2. Drag-and-drop this folder into Netlify “Deploys” **OR** connect a GitHub repo
3. Netlify will give you a temporary URL
4. In Netlify: **Domain settings → Add custom domain** → `ethiopianschoolsproject.org`
5. Netlify will tell you what DNS records to add at your domain registrar (usually CNAME/A records)

**Contact form:** The form in `contact.html` works if you deploy on Netlify.

### Option B: Cloudflare Pages (free)

1. Create a Cloudflare account
2. Add your domain and set Cloudflare nameservers at your registrar
3. Create a **Pages** project (upload via GitHub)
4. Set build settings to “None” (this is plain HTML)
5. Add the custom domain `ethiopianschoolsproject.org`

### Option C: Any web host

Upload all files via your host’s file manager or FTP to the `public_html` (or equivalent) directory.

## Notes

- This site is static: no database required.
- For donations, use a trusted payment processor and embed their form.
- Review Washington State fundraising disclosure requirements and update the wording to match your fundraising method(s).

© 2026 Ethiopian Schools Project
