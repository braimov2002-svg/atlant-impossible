# ATLANT — Construction Group · Impossible Edition

Interactive 3D web showcase for **Atlant Construction Group** (agcg.uz): "Architectural Grandeur Meets Cyber-Futurism".
Uzbek-first (`/uz`), statically generated, four routes, one procedural 3D building engine, and a scroll-scrubbed construction film on the home page.

| Scroll-scrubbed construction film (hero) | | |
| --- | --- | --- |
| ![](docs/screenshots/hero-site.jpg) | ![](docs/screenshots/hero-frame.jpg) | ![](docs/screenshots/hero-facade.jpg) |
| ![](docs/screenshots/hero-landscape.jpg) | ![](docs/screenshots/hero-terrace.jpg) | ![](docs/screenshots/hero-interior.jpg) |
| **Blueprint / realistic showcase** | **Services matrix** | **Tashkent footprint map** |
| ![](docs/screenshots/showcase-blueprint.jpg) | ![](docs/screenshots/services-matrix.jpg) | ![](docs/screenshots/map-tashkent.jpg) |
| **/projects** | **/services** | **/about** |
| ![](docs/screenshots/projects-gallery.jpg) | ![](docs/screenshots/services-page.jpg) | ![](docs/screenshots/about-timeline.jpg) |

<img src="docs/screenshots/mobile.jpg" width="360" alt="Mobile">

## Quick start

```bash
# Node ≥ 20.9
npm install
npm run dev              # http://localhost:3000 → /uz
npm run build && npm start
npm run typecheck
cp .env.example .env.local   # optional: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID for bookings
```

QA helper: append `?lod=high|mid|low|none` to any URL to force a 3D level-of-detail tier.

Re-render the hero film (needs the dev server; takes ~1 h on a CPU-only machine, minutes on a GPU):

```bash
npm run dev                                   # serves the /render harness (dev only)
RENDER_BASE=http://localhost:3000 npm run render:sequence
node scripts/render-sequence.mjs --only 0,0.4,0.9 --out /tmp/look   # quick look-dev frames
```

## Routes

| Route | What it is |
| --- | --- |
| `/uz` | Scroll-scrubbed construction film, flagship 3D showcase, services matrix, cost & timeline estimator, 3D map, booking portal |
| `/uz/projects` | Filterable gallery. Every card is a live 3D model with its own Blueprint ⇄ Realistic switch (plus a global switch) |
| `/uz/services` | Bento of BIM · General construction · Heavy infrastructure over live material shaders |
| `/uz/about` | GSAP ScrollTrigger timeline with a sticky map that lights up the company footprint |

`/`, `/projects`, `/services`, `/about` redirect to the `/uz/…` equivalents.

## Stack

Next.js 15.5 (App Router, RSC, Server Actions, SSG) · React 19 · Tailwind CSS v4 (`@theme` config) · three r186 · @react-three/fiber 9 · @react-three/drei 10 · GSAP 3 + ScrollTrigger + @gsap/react · Framer Motion · Lenis · Radix Slider · lucide-react · zod 4.
Fonts (self-hosted via `next/font`, all with Cyrillic): **Geologica** (variable, `SHRP` sharpness axis → `font-sharp` utility), **Onest**, **JetBrains Mono**.

## Architecture

```
src/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx          # root layout: fonts, metadata, Header + Footer + Lenis (persist across routes)
│  │  ├─ template.tsx        # route transition: obsidian curtain + gold/cyan blade (opacity-only wrapper)
│  │  ├─ page.tsx            # ★ home (Server Component)
│  │  ├─ projects/page.tsx   # gallery
│  │  ├─ services/page.tsx   # services bento
│  │  └─ about/page.tsx      # timeline
│  ├─ render/                # dev-only frame renderer for the hero film (own root layout)
│  ├─ actions/inquiry.ts     # "use server" booking: zod, Tashkent-time slot validation, honeypot, Telegram
│  └─ globals.css            # ★ design system (Tailwind v4 @theme tokens + glass/shimmer/blueprint utilities)
├─ components/
│  ├─ three/
│  │  ├─ sequence/           # ★ daylight arch-viz scene the hero film is rendered from
│  │  │  ├─ ConstructionScene.tsx  # R+4 residence builds itself as progress 0→1, camera flies inside
│  │  │  └─ textures.ts            # metric-scale procedural textures (limestone, concrete, formwork, leaves…)
│  │  ├─ building/
│  │  │  ├─ geometry.ts      # procedural generators: twist-tower, twin-residential, stepped-office, industrial, courtyard, bridge
│  │  │  ├─ textures.ts      # canvas-drawn facade textures (curtain/residential/office/industrial/stone) + lit windows
│  │  │  ├─ materials.ts     # role materials, blueprint-line / grid-ground / volumetric-beam GLSL
│  │  │  ├─ Building.tsx     # reusable model with the Blueprint ⇄ Realistic clip-plane scan
│  │  │  └─ Stage.tsx        # environment (procedural light-formers), lights, blueprint ground
│  │  ├─ ShowcaseScene.tsx / ShowcaseStage.tsx   # single-model stage (home showcase)
│  │  ├─ GalleryViews.tsx    # ONE shared canvas + drei <View> per gallery card
│  │  ├─ UzMap3D.tsx / MapStage.tsx               # country dot-bars ⇄ Tashkent city dive, projected DOM pins
│  │  └─ SceneCanvas.tsx     # lazy mount, offscreen pause, LOD, PerformanceMonitor, fallbacks
│  ├─ sequence/player.ts     # canvas image-sequence player (coarse-to-fine loading, cross-fade)
│  ├─ shader/MaterialSurface.tsx   # raw-WebGL material shader (concrete/steel/glass/granite/blueprint), cursor-lit
│  ├─ sections/home/…, projects/…, services/…, about/…
│  ├─ layout/                # Header, Footer, NavLink (Lenis-aware), SmoothScroll (+ route scroll manager), cursor
│  └─ ui/                    # button, mode-toggle, page-header, section-heading, slider, spotlight-card, …
├─ data/projects.ts          # portfolio facts + 3D specs (language-neutral) · cities
├─ lib/                      # sequence.ts (frames, chapters), estimator.ts, booking.ts (slots, ICS), geo, motion, utils, site
├─ i18n/                     # config, get-dictionary, dictionaries/uz.ts (all copy)
└─ hooks/                    # useDeviceTier, useInViewport, useReducedMotion
scripts/render-sequence.mjs  # Playwright driver: renders public/sequence/{landscape,portrait}/NNNN.webp
```

### How the hero film works

The home hero follows the "scroll a construction timelapse" pattern: an empty plot turns into a finished limestone residence, and then the camera flies onto a terrace and into an apartment. It is **pre-rendered video frames, not live WebGL**, so it looks the same on every phone and costs no GPU.

1. **Scene**: `components/three/sequence/ConstructionScene.tsx` is a deterministic daylight arch-viz scene. Everything is a pure function of `progress`:
   - Context: neighbouring stone villa, rendered house, street, leaf-card trees.
   - Construction stages: hoarding and excavator, raft foundation, then a concrete frame rising level by level with red formwork, scaffolding and a tower crane.
   - Finish: limestone envelope with glazing, curtains and glass balustrades; planted terraces; a furnished interior.
   - Lighting and post: sun shadows, sky dome and IBL, N8AO ambient occlusion, neutral tone mapping and vignette.
2. **Render**:
   - `/render` is a dev-only route with its own root layout. It returns 404 in production unless `ATLANT_RENDER=1` is set.
   - The route exposes `window.__render(p)`, which renders one frame at 1.5× supersampling and returns WebP.
   - `scripts/render-sequence.mjs` drives it headlessly. It writes 100 landscape frames (1440×810) and 90 portrait frames (720×1280) to `public/sequence/`.
3. **Play**: `components/sequence/player.ts` draws the frames into a `<canvas>` with "cover" fit.
   - Frames load coarse to fine (every 16th, then 8th, 4th…), so any scroll position has a nearby frame almost at once. With `Save-Data`, it stops at every 4th frame.
   - It cross-fades the two frames around the exact progress, so 100 frames scrub smoothly.
   - The first frame is also a real `<img>` (`<picture>` with a portrait source), so it paints before JavaScript runs.
4. **Choreography**:
   - The section is 5.2 viewports tall (4.4 on phones) with a sticky stage. One GSAP ScrollTrigger (`scrub: 0.45`, with Lenis smoothing) produces `progress`.
   - `progress` drives the player, the progress rail and the chapter label: Yer uchastkasi → Poydevor → Karkas → Fasad → Obodonlashtirish → Interyer. Chapter boundaries are in `lib/sequence.ts`.
   - The headline stays fixed bottom-left, and the project facts (16 xonadon · 5 qavat · 2027 · A) count up bottom-right.

**Using real renders or drone footage:** export numbered frames (`0001.webp`, …) into `public/sequence/landscape` and `public/sequence/portrait`, then update `frames`/`width`/`height` in `lib/sequence.ts`. Nothing else changes. `ffmpeg -i film.mp4 -vf fps=12,scale=1440:-2 -c:v libwebp -q:v 78 %04d.webp` does it from a video.

### Blueprint ⇄ Realistic

`<Building>` renders every part twice: realistic materials clipped to `y ≤ h`, and a cyan ghost clipped to `y ≥ h`, plus structural lines shown above `h`. Toggling the mode sweeps `h` from the ground to the roof (or back) with a glowing scan plane. The home showcase, all gallery cards and the Tashkent map share this engine.

### Performance / LOD

- The hero ships no WebGL: frames are ~100 KB WebP each (≈10 MB for the landscape film), loaded progressively after the first frame.
- Every WebGL scene is a `next/dynamic({ ssr: false })` chunk; three.js loads after hydration.
- Canvases mount near the viewport and pause (`frameloop="never"`) when offscreen. `PerformanceMonitor` lowers DPR under load.
- `/projects` renders 10 live buildings through **one** WebGL context (drei `View` scissor viewports).
- Tiers (`hooks/useDeviceTier.ts`) control DPR, antialiasing, environment maps and map density. The `none` tier gets static SVG fallbacks.
- `prefers-reduced-motion` is honoured by Lenis, CSS, GSAP idle loops and 3D auto-motion.

### Routing & smooth scroll

Lenis lives in the root layout and persists across routes. `RouteScrollManager` resets its target on every navigation and resolves cross-page hashes (`/uz#contact` from `/uz/about`) after re-measuring. `NavLink` stops Next from double-handling same-page hashes so Lenis glides instead. Tested: client-side navigation (no reloads), scroll reset, cross-page and same-page anchors, back button.

## Content to replace before launch

agcg.uz was not reachable from the build environment. Every placeholder is flagged in code and badged **"Namuna"** in the UI:

- **Portfolio** (`src/data/projects.ts` + `projectsText` in the dictionary): the 10 projects are samples (incl. *Atlant Tower* / *Luxury Residence* from the brief).
- **Timeline** (`aboutPage.milestones`): sample company history, years and cities.
- **Contacts** (`src/lib/site.ts`): `null` values are hidden until filled.
- **Estimator** (`src/lib/estimator.ts`): cost/m², duration curve and warranty terms are planning assumptions.
- **Logo** (`components/ui/logo.tsx`, `app/icon.svg`): placeholder mark.
- **Hero film** (`public/sequence/…`, `hero.facts` in the dictionary): a 3D visualisation of a sample residence, badged "Namuna · 3D vizualizatsiya". Replace it with real CGI or drone frames (see above).

## Notes

- Next.js is pinned to **15.x**. `overrides.next.postcss` lifts Next's bundled PostCSS to a patched release (`npm audit` → 0 vulnerabilities).
- Glassmorphism uses only the standard `backdrop-filter`. Next's CSS minifier otherwise keeps just the `-webkit-` form, which Chrome ignores.
- Adding a locale: create `i18n/dictionaries/ru.ts` typed as `Dictionary`, then register it in `get-dictionary.ts` and `i18n/config.ts`.
- The earlier *Agro Global Consulting Group* build lives on branch `feat/agcg-impossible-web`.
