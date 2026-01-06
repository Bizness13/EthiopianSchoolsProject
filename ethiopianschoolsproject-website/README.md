# Ethiopian Schools Project — Website Starter (Static HTML)

This is a lightweight, fast static site you can deploy in minutes.

## What’s included

- `index.html` (home page, includes the YouTube video embed)
- `about.html`, `programs.html`, `impact.html`, `donate.html`, `contact.html`
- `assets/styles.css` (site styling)
- `assets/main.js` (mobile menu + footer year)
- `robots.txt` + `sitemap.xml`

## Customize text in 10 minutes

Open these files and search for placeholders:

- `YOUR_DONATION_LINK_HERE` (in `donate.html`)
- `YOUR_EMAIL_HERE` (in `contact.html`)
- Replace the “Mission” placeholder text (in `index.html` and `about.html`)
- Replace “Program 1/2/3” content (in `programs.html`)
- Replace impact numbers (in `impact.html`)

## Add your logo / photos

- Replace the gradient “mark” in the header (CSS) or update `assets/img/logo.svg`.
- Add photos in `assets/img/` and reference them in the HTML.

## Deploy options

### Option A — Netlify (easy + free)

1. Create an account at Netlify.
2. Drag-and-drop the entire folder contents into Netlify (“Deploy manually”).
3. In Netlify: **Site settings → Domain management → Add custom domain**
4. Follow Netlify’s DNS instructions (either change nameservers, or add A/CNAME records).

**Bonus:** The contact form uses `data-netlify="true"` and can work on Netlify with no backend.

### Option B — Cloudflare Pages (fast + free)

1. Create a Cloudflare account.
2. Create a Pages project from a Git repo (or upload via Wrangler).
3. Add your custom domain and follow DNS prompts.

### Option C — GitHub Pages

1. Create a repo and upload the files.
2. Enable Pages.
3. Add a `CNAME` file with: `ethiopianschoolsproject.org`
4. Point your domain DNS to GitHub Pages.

## YouTube video

The home page embeds your YouTube video using the privacy-enhanced player:

`https://www.youtube-nocookie.com/embed/-aW4RWFJsZ4`

If you ever need to swap it, replace the video ID in `index.html`.

---
Generated: 2026-01-06
