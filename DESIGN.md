# DESIGN.md — Apex Luxury

Single source of truth for the visual system. Read this before changing any
styling, so intentional choices are not "fixed" by a later audit.

## Brand

- **Name:** Apex Luxury — Real Estate & Contracting
- **Domain / config:** `src/config/site.ts` (rebrand everything here first)
- **Default currency:** `INR` (`siteConfig.defaultCurrency`); the UI switcher in
  the header persists to the `apex_currency` localStorage key. Rebranding to
  USD/EUR/GBP is a one-line change in `site.ts`.

## Tokens

| Token | Value | Note |
| --- | --- | --- |
| Charcoal | `#0c0d10` | primary surface |
| Champagne gold | `#dfba48` (`--accent: 45 55% 58%`) | the only accent |
| Ivory | `#fdfbf7` | light text on dark |
| `--radius` | `0rem` | flat sharp luxury — **never** round corners |

Type: **Archivo** (display), **Manrope** (body), **JetBrains Mono** (labels).
Fonts are loaded via `<link>` + `preconnect` in `index.html` (not CSS `@import`).

## Architectural Specification (`luxury` + `atelier-zero`)

This project implements the bespoke **Luxury Editorial** architectural design system, inspired by high-horology and bespoke architectural publications (Atelier Zero / Bugatti / Aman / Patek Philippe).

### Core Aesthetic Rules
1. **Obsidian & Champagne Gold**: Pitch-black canvas (`#0c0d10`) illuminated solely by warm, champagne-gold accents (`#dfba48`) and ivory serif/grotesque typographic contrast (`#fdfbf7`).
2. **Zero Border Radius (`--radius: 0rem`)**: Clean, razor-sharp architectural geometry. Rounded corners or soft pills are strictly forbidden.
3. **Doppelrand Hardware Depth**: Cards utilize a physical hardware-plate appearance via double bezels:
   - Outer hairline: `border border-white/10`
   - Inner highlight bevel: `shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]`
   - Class utility: `.luxury-plate` (defined in `src/index.css`)
4. **Editorial Monospace Kickers**: Technical coordinates, metadata tags, and section eyebrows use JetBrains Mono in tracked uppercase (`tracking-[0.25em]` to `tracking-[0.3em]`).
5. **Mobile Thumb-Zone Conversion Bar**: High-end real estate buyers require instantaneous contact triggers. On mobile/tablet viewports, properties expose a sticky glassmorphic bottom bar (`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d10]/95 backdrop-blur-md`) with the active currency valuation, direct dial, and instant tour booking.
6. **Printable Architectural Client Dossier (`@media print`)**:
   - High-net-worth real estate transactions require tangible physical presentations.
   - Built-in `@media print` rules strip web chrome (navigation, footers, interactive modals, dark backdrops), invert typography to deep charcoal on crisp white, preserve high-res imagery, and generate an architecturally proportioned A4/Letter dossier via `window.print()`.

## Intentional overrides of the craft-floor rules

`impeccable`'s craft-floor bans the following patterns by default. They are
**deliberately kept** here and should not be re-flagged:

1. **Tiny uppercase tracked eyebrow label above a heading**
   (`text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold`).
   This is the section signature of the template. Kept by explicit product
   decision.
2. **1px hairline borders** (`border-white/10`, `w-16 h-[1px] bg-accent`).
   They define the flat-sharp-luxury grid and are part of the identity.
3. **Lucide icons** are used deliberately as a functional, monochrome set.

Everything else in craft-floor still applies (focus-visible rings, reduced-motion
support, tap-target floor, no gradient text, no `text-[7-9px]` below the
`0.6875rem` floor — see `src/index.css`).

## Motion

- `gsap` + `lenis`; all animation is gated behind
  `prefers-reduced-motion` (see `Layout.tsx`, `MagneticButton.tsx`,
  `Property.tsx`). Do not add motion that ignores that query.
- Easing: `power3.out` (not `elastic`, which reads as playful).

