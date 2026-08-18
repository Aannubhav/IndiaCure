# IndiaCure — Website

A static, dependency-free website for **IndiaCure — Where India Heals the World**, a medical tourism coordination brand connecting international patients with doctors and hospitals in India.

Rebuilt from an original design concept into plain, functional HTML/CSS/JS (no build step, no framework) so it can be hosted anywhere — including GitHub Pages.

## Structure

```
index.html              Home page (hero, treatments, hospitals, doctors, consultation form, FAQ, etc.)
treatments.html         Full treatments listing
wellness.html           Wellness & recovery programmes
how-it-works.html       Step-by-step process page
bariatric-surgery.html  Example treatment detail page
assets/style.css        Design system (tokens + components)
assets/app.js           Interactivity: nav, doctor filter, testimonial carousel, form handling
```

## Running locally

No build step needed — just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploying with GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, enable **Pages** → source: `main` branch, root folder.
3. The site will be live at `https://<username>.github.io/<repo>/`.

## Notes

- All hospital names, doctor profiles, patient stories, and contact details are **placeholder content** clearly marked as such — replace with verified data before going live.
- Fonts (Caprasimo, Figtree) are loaded from Google Fonts.
- Hero and section imagery uses a mix of a stock photo and simple placeholder blocks; swap in real photography as it becomes available.
