# Blackjack Neo

Futuristic Blackjack mini app for [Base](https://base.org) and [Farcaster](https://farcaster.xyz). Neon cyberpunk design, swipe controls, and Mini App–ready manifest.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Controls

- **Swipe up** → Hit  
- **Swipe down** → Stand  
- **Swipe right** → Double (when allowed)  
- **Swipe left** → Split (when pair)  
- **Tap "Play again"** after a round → New game  

## Deploy (Base + Farcaster)

1. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```
   Set `NEXT_PUBLIC_APP_URL` to your production URL (e.g. `https://blackjack-chi-rust.vercel.app`).

2. **Base**
   - Go to [base.dev](https://base.dev) → Create Mini App, add your app URL.
   - Optional: add `base:app_id` to layout metadata after registration.

3. **Farcaster manifest**
   - Ensure Deployment Protection is off in Vercel (Settings → Deployment Protection).
   - Open [Base Build Account association](https://www.base.dev/preview?tab=account), enter your app URL, submit, then verify and copy the `accountAssociation` object.
   - Paste it into `public/.well-known/farcaster.json` (and optionally keep in sync with `minikit.config.ts`).
   - Redeploy.

4. **Validate**
   - [Base Preview](https://base.dev/preview) — add your URL, check Metadata and Account association.
   - [Farcaster Embed](https://farcaster.xyz/~/developers/mini-apps/embed) — ensure Embed Valid ✓.

## Project layout

- `app/` — Next.js App Router (layout, page, api/webhook).
- `components/` — GameTable, Card, ChipSelector, SwipeDetector, FarcasterReady, etc.
- `hooks/` — useSwipeGesture, useHaptics.
- `lib/blackjack/` — deck, hand, dealer logic.
- `store/` — Zustand game state.
- `public/` — icon.png, hero-image.png, manifest.json, `.well-known/farcaster.json`.
- `minikit.config.ts` — Base Mini App manifest config (reference).

## Tech stack

- Next.js 14, TypeScript, Tailwind CSS  
- Framer Motion, Zustand  
- @farcaster/miniapp-sdk (ready, embed metadata)  
- Base-ready metadata and manifest  

## Assets

- **icon.png** — 1024×1024 app icon (PNG, no transparency for featured).
- **hero-image.png** — 1200×630 OG/embed image.

Generated assets are in `public/`. For featured guidelines (e.g. 3 screenshots 1284×2778), add more assets and reference them in `farcaster.json` / `minikit.config.ts`.

## License

MIT
