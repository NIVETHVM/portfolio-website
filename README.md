# Niveth VM: portfolio

Personal portfolio built with Next.js (static export), TypeScript, GSAP and Lenis.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm run typecheck
```

Needs Node.js 20 or newer.

## Edit content

- **Projects** (names, descriptions, stats, links): `src/data/projects.ts`
- **Résumé:** replace `public/Niveth-VM-Resume.pdf` (keep the file name)
- **Share image:** `public/og.png` (1200 × 630)
- **Tool logos:** `public/icons/*.svg`, listed in `src/components/Tools.tsx`
- **LeetCode numbers:** `src/components/LeetCode.tsx`
- **Colours and fonts:** the variables at the top of `src/app/globals.css`
- **Portrait:** `src/data/portrait.ts` is generated from a photo (one string per row, digits 0–4 are brightness)

## Deploy

**Vercel:** import the repo at vercel.com/new. It detects Next.js and deploys every push.

**GitHub Pages:** run `npm run build` and publish the `out` folder. If the site lives at
`username.github.io/repo-name/`, add `basePath: "/repo-name"` to `next.config.ts` first.

For correct link previews, set `NEXT_PUBLIC_SITE_URL` to your live address (Vercel sets this automatically).

## Pages

- `/`: hero with the character portrait, about, selected work, tools, LeetCode, contact
- `/game-dev/`: includes a playable Reverse Tic-Tac-Toe
- `/software/`
- `/ai/`
