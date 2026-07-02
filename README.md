# Tanzim Al Noor — Portfolio Website

A clean, static portfolio site (HTML/CSS/JS only — no build tools, no frameworks).
You can edit it with any text editor and host it for free on GitHub Pages.

## Files

```
index.html      → all content lives here (sections in order: hero, about, skills,
                   experience, projects, research, education, achievements, contact)
styles.css      → all design/colors/spacing. Look at the :root block at the top —
                   change a hex value there to retheme the whole site.
script.js       → small helper script (mobile menu, active-link highlight,
                   back-to-top button). You won't need to touch this.
images/profile.png   → your photo
Tanzim_Al_Noor_CV.pdf → your CV (linked from the "Download CV" buttons)
```

## How to edit content

Open `index.html` in any text editor. Each section is wrapped in a clearly
commented block like:

```html
<!-- ============ EXPERIENCE ============ -->
<section id="experience"> ... </section>
```

- **Add a new job/experience:** copy one `.timeline-item` block under
  `#experience` and edit the text.
- **Add a new project:** copy one `.project-card` block under `#projects`,
  or add a new entry inside the relevant `<details class="cat-block">` in
  the project archive.
- **Add a publication:** copy one `.pub` block under `#research`.
- **Update your CV:** just replace `Tanzim_Al_Noor_CV.pdf` with your new file
  (keep the same filename, or update the `href` in the two "Download CV" buttons).
- **Update your photo:** replace `images/profile.png` (keep the same filename).

## How to change colors/fonts

Open `styles.css` and edit the `:root { ... }` block at the very top:

```css
--navy: #0b2545;       /* headings, dark backgrounds */
--teal: #0f8b8d;       /* primary accent color */
--teal-light: #4fd1c5; /* secondary accent */
--paper: #f7faf9;      /* page background */
```

Changing these few lines re-colors the entire site automatically.

## How to host it for free (GitHub Pages)

1. Create a new GitHub repository, e.g. `tanzim-portfolio`.
2. Upload all the files in this folder (keeping the same folder structure)
   to the repository — either by drag-and-drop on github.com, or:
   ```bash
   git init
   git add .
   git commit -m "Launch portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**, set **Source** to the `main` branch
   (root folder), and save.
4. Your site will be live in a minute or two at:
   `https://<your-username>.github.io/<repo-name>/`
   (or `https://<your-username>.github.io/` if the repo is named
   `<your-username>.github.io`).

## Notes

- No build step, no npm install, no database — open `index.html` directly in
  a browser to preview changes instantly before pushing.
- The "Download CV" buttons just link to the PDF file — there's no contact
  form backend, so the Contact section uses direct `mailto:` / `tel:` links,
  which is the most reliable option for a static GitHub Pages site.
- Fully responsive (mobile menu included) and respects reduced-motion
  accessibility settings.
