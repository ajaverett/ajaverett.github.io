# AJ Averett — Interactive Résumé

A résumé that opens into role-by-role data stories. Built as a fully static
Next.js export so it can run on GitHub Pages without a server or sign-in.

## Local development

```bash
pnpm dev
```

The résumé content lives in `app/page.tsx`; the visual system and responsive
transitions live in `app/globals.css`. Pushing `main` automatically publishes
the exported site to `https://ajaverett.github.io`.
