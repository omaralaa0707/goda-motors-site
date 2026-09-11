# Goda Motors — site 24 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Goda Motors, and not an official site.**

- **Live:** https://goda-motors-site.vercel.app
- **Repo:** [goda-motors-site](https://github.com/omaralaa0707/goda-motors-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: A light architectural concrete ground — #E6E4E1, lifted from their own daylight studio wall and floor rather than another dark night shot — with ink #1B1918, and a single warm note lifted from their pendant light: russet #8A2A19 for accents and text, a soft amber #F2B37A reserved for the fixture's glow and never a surface

**Type pairing**
: Big Shoulders + Albert Sans / Noto Kufi Arabic + Vazirmatn (AR)

**3D / signature technique**
: **The ring**: their own suspended pendant light — a russet torus housing a bright emissive arc, faked-glow via two wider translucent tori layered behind it since no bloom pass is available — hanging above each car's own cover-fit photograph and swinging very slightly on its cable, never dead still

**Motion language**
: Said — a block settles up a few pixels while a soft blur resolves, as though the words were just finished being spoken; distinct from every hard-settle or dissolve arrival elsewhere in the set

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/godamotors_/
- Facebook: https://www.facebook.com/GodaMotors/
- Google Maps: https://www.google.com/maps/place/Goda+motors/data=!4m2!3m1!1s0x0:0x2b268aadd8828873

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
