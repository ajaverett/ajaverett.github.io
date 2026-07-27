# AJ Averett — Interactive Résumé

A résumé that opens into role-by-role data stories. Built as a fully static
Next.js export so it can run on GitHub Pages without a server or sign-in.

## Local development

```bash
pnpm dev
```

The base résumé content lives in `app/resume-data.json`. The website displays
one canonical rendered Letter page so desktop and mobile always have identical
font metrics, line breaks, and proportions. `app/page.tsx` supplies the
interactive overlay and `app/globals.css` supplies its transitions.

After changing the base résumé data, regenerate the PDF, page image, and
interactive hotspot map:

```bash
python -m pip install reportlab pypdf pypdfium2
pnpm generate:resume
```

Pushing `main` automatically publishes the exported site to
`https://ajaverett.github.io`.
