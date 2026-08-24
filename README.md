# IndiaCure — Website

A static website for **IndiaCure — Where India Heals the World**, a medical tourism coordination brand connecting international patients with doctors and hospitals in India.

Plain HTML/CSS/JS — no build step, no framework — so it runs anywhere, currently hosted on **GitHub Pages**: https://aannubhav.github.io/IndiaCure/

## Structure

```
index.html               Home page (hero, treatments, hospitals, doctors, consultation form, FAQ, etc.)
treatments.html          Full treatments listing
wellness.html            Wellness & recovery programmes
how-it-works.html        Step-by-step process page
bariatric-surgery.html   Example treatment detail page

admin/index.html         Content admin panel — edit all text/photos, no code required (see below)
content.json             All editable text (5 languages) and photo URLs — the CMS's data file

assets/style.css         Design system (tokens + components)
assets/app.js            Interactivity: nav, doctor filter, testimonial carousel, consultation form
assets/i18n.js           Translation engine + built-in EN/HI/FR/PT/AR dictionaries, RTL support
assets/content-loader.js Merges content.json over the built-in text/images at page load
assets/uploads/          Photos uploaded via the admin panel land here
```

## Running locally

No build step needed — just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Editing content — the admin panel

Go to **`/admin/`** (e.g. https://aannubhav.github.io/IndiaCure/admin/).

1. Paste a GitHub personal access token scoped to this repo, with **Contents: Read and write** permission. It's stored only in your browser (localStorage) and sent only to `api.github.com` — it is never committed to the code.
2. Upload replacement photos (hero background, hospital photos, destination photo, patient story photos) and/or edit any of the ~230 text fields, grouped by site section.
3. Hit **Save All Changes**. This commits straight to the `main` branch, which:
   - Edits **English** text by default. Any field you change is automatically machine-translated into Hindi, French, Portuguese and Arabic (via the free MyMemory API) unless you uncheck "auto-translate" before saving.
   - Switching the language dropdown lets you hand-edit a specific language's text directly (those edits are not auto-translated).
4. GitHub Pages rebuilds automatically — the live site reflects your change within about a minute.

**Not covered by the admin panel** (still edited in code): the sample doctor profiles in `assets/app.js` (`DOCTORS` array).

## The consultation form → email

The "Get Free Consultation" form does not send email until you configure a destination:

1. Sign up free at [formspree.io](https://formspree.io), create a form, and copy its endpoint (`https://formspree.io/f/xxxxxxxx`).
2. Open `/admin/`, find the field `settings.form_endpoint` (English tab, "Settings" group), paste the endpoint, and save.
3. From then on, every submission is POSTed to Formspree and emailed to you. Until this is set, submissions just show a local "request received" message without going anywhere.

## Multi-language support

Handled by `assets/i18n.js` (dictionaries + engine) and `assets/content-loader.js` (merges `content.json` on top at runtime). The language switcher in the header applies translations client-side and switches to RTL layout for Arabic. Editing English content in the admin panel keeps all five languages in sync automatically (see above).

## Deploying elsewhere (e.g. Vercel)

The site is fully static, so any static host works. Connect the GitHub repo in the host's dashboard for automatic deploys on every push — no build command needed (or set the output directory to the repo root if asked).

## Notes

- Hospital names, doctor profiles, and patient stories are **placeholder content**, clearly marked as such in the copy — replace with verified data before treating this as production-ready for real patients.
- Fonts (Caprasimo, Figtree) load from Google Fonts.
- `content.json` is the live data file — don't hand-edit it directly unless you're comfortable with git; use the admin panel instead so translations and image paths stay consistent.
