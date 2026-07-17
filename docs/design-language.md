# KONBINI — Design Language

The source of truth for KONBINI's visual system. Every page and block is built
from this. Companion to `docs/01-tokens.md` (token reference) and `CLAUDE.md`
(engineering conventions). Decisions here were agreed with the client
aspect-by-aspect; pending items are marked **[specimen]** (decided by seeing a
type/colour specimen) or **[phase 5]**.

---

## 1. Philosophy & principles

KONBINI is **a warm technical catalogue**: a rigorously engineered, spec-sheet
skeleton — cobalt, white, and a single orange — kept human by playful line
illustration, confident colour, and a friendly rounded logo. The seriousness
(*powaga*) comes from technical rigor; the warmth from colour, illustration, and
space. Products are treated like parts in a beautiful catalogue.

The few Japanese principles that actually drive interface decisions here:

- **Kanso (簡素)** — disciplined simplicity. Remove until only the essential
  remains. No decoration that isn't doing a job.
- **Ma (間)** — intentional space. Emptiness is composition, not leftover. Section
  rhythm is deliberate and uneven, not a uniform metronome.
- **Seiketsu (清潔)** — clean freshness. The Pocari-Sweat axis: bright, confident,
  electric cobalt on pure white. Energy through cleanliness, not clutter.
- **Fukinsei (不均整)** — asymmetry. In composition and rhythm — never by cropping
  the square (1:1) product photography.
- **Iki (粋)** — refined, spirited chic. Understated, a little playful, never
  showy or childish.

Reference coordinate: **Muji rigor × Pocari energy**, personality **between**
playful cobalt+orange line-art (bakehouse / Миаград / Two Hands) and brutalist
**micrographics** (3.11LABS technical labels / Boring Studios & Mixi invoices /
Bill.). It is **not** muted wabi-sabi zen, **not** neon chaos, **not** warm
editorial-serif.

---

## 2. Colour

Strict palette — four colours plus the photographic grey (which lives **only**
inside photos, never on the page).

| Role | Token | Value | Notes |
|---|---|---|---|
| Brand / action | `--k-color-ink` | `#0b00b5` | cobalt; primary buttons, links, key accents |
| Paper / chrome | `--k-color-paper` | `#ffffff` | the flat, shadowless gallery wall |
| Ink (text) | `--k-color-sumi` | `#1c1c1e` | 墨 — refined near-black, not pure #000 (softer, premium, less glare) |
| Accent (callout) | `--k-color-accent` | orange **[specimen]** | vermilion-leaning, appetite-friendly; callouts/promo only |

**Text intensity hierarchy** (value, not just size/weight):
`--k-ink-strong` ≈ 95% black for headings, `--k-ink-body` ≈ 75% black for body.

**Accent rules (orange):**
- **Callout only** — never a full section background. Promo/sale −X%, key labels.
- Always dark (sumi/cobalt) **or white** text *on* the accent fill — **never**
  accent-coloured text on white.
- It is the loudest voice; because everything else is disciplined, it earns
  attention effortlessly.

**Cobalt full-bleed statement sections** are allowed **sparingly** for
marketing / partner / initiative sections (white or accent text on cobalt).
Everyday shopping chrome stays white.

**Retired** (off-brand): mauve, acid-green, red, kaki (persimmon), moss.
Yellow retired to a rare tertiary at most (orange won on the inspiration set).

All pairings validated WCAG-AA (≥ 4.5:1) with the contrast script — see
`docs/01-tokens.md`.

---

## 3. Typography

The gravitas comes from a **neutral, engineered grotesque + grid discipline**,
not a serif (a serif fights the electric, sans-native world; the Japanese cut is
gothic, not mincho). The rounded logo is the single warm note; the grotesque is
its adult counterweight.

- **Body / UI / most headings** — a serious neutral grotesque with native CJK.
  Lead candidate **[specimen]**: **IBM Plex Sans** + **IBM Plex Sans JP/KR**
  (engineered, adult, free, harmonized ja/ko cuts — solves pl/en/ja/ko in one
  family). Alternates to compare: General Sans / Switzer, Geist.
- **Micrographics metadata** — **IBM Plex Mono** (part-numbers, SKUs, spec
  tables, coordinates, `#001`).
- **Display / statement** — the grotesque at large size; weight is **tokenized**
  (`--k-display-weight`, optional condensed cut) so bold↔medium is a one-token,
  testable decision. Start bold-ish, dial back easily.
- Replaces the interim **Lora + Inter**; CJK self-hosted & subset (CWV).

**Scale & usage:**
- Reading/body base **16px**, generous leading (~1.6).
- **Two heading tiers**: product-shelf headings *moderately large*; standalone
  marketing / promo / partner sections *large*.
- Product-card type: name **≤ +2px** over description; descriptions **13–14px**,
  lighter weight.
- **Weights**: Regular / Medium / Semibold for body & UI (no bold/black in
  running text); bold reserved for display via the token.
- **Case**: uppercase only for micro-labels, kickers, seals (short, Latin).
  Never uppercase long Polish headings or CJK.
- **Prices / numerals**: tabular figures.
- **Links**: cobalt, underlined with offset.
- Exact scale ramp, tracking, optical sizing **[specimen]**.

---

## 4. Shape

**Sharp.** Global corner radius is a single token `--k-radius`, **default `0`**;
ceiling 2–4px if ever raised. One decision, global. This is the counterweight to
the round logo — precise system, friendly signature.

---

## 5. Space, grid & layout

- **Wide** page width + **~120px** desktop margins (≥1200px); responsive below.
- **Ma rhythm**: section spacing is deliberate and uneven (breathe around
  groups, tighten within them) — not uniform. Formalize the scale from the
  `--k-space-*` tokens.
- Aspect ratios: **product packshots 1:1, locked.**
- Modular column grid (Muji discipline); columns/gutters formalized during build.

---

## 6. Signature devices

What makes it unmistakably KONBINI:

- **Flat, shadowless chrome** — the discipline. Zero elevation/drop-shadows on
  UI, no grey section fills. Contrast is carried by photography, type, hairlines,
  cobalt. This restraint is what lets the brutalist photos detonate.
- **Micrographics enrichment** — brackets `[ ]`, monospace metadata, SKU /
  part-number treatment, spec tables, `#001`, coordinates. Used at the **edges**
  (labels, metadata, footers, PDP spec blocks); the core message stays clean.
  Reads as *competence*. Catalogue depth lives on the **PDP, not the shelf**.
- **Line-art illustration** — single-weight cobalt/white drawings (food, objects,
  people, katakana motifs) as patterns + spot art. To be built; directional base
  first for approval.
- **Diagonal energy band** — angled cobalt band/gradient (client's recurring device).
- **Circular katakana seal** — ラーメン / マッチャ style stamp badges.
- **Tategaki edge accents** — vertical Japanese type (`konbini-kanji` block exists).
- **Keisen hairlines** — **minimal**: 1px lines only where needed (footer,
  list/spec separations), not a full grid of rules.

---

## 7. Components

- **Primary action** — cobalt fill, white text, sharp (radius 0), flat.
- **Secondary / tertiary** — **text + technical detail** (arrow / `[ ]` bracket),
  micrographics-style; not filled buttons.
- **Inputs** — mix: large fields (hero search) underlined; functional forms
  (checkout / address) boxed 1px, 0 radius.
- **Product card** — fixed structure, agreed with the client:
  1. **packshot** (1:1, on white) — **nothing is ever laid on it**: no badges, no
     price, no promo. The photograph is the asset.
  2. **name** — always first, always **full width**, ~2 lines. Never in a row with
     the price (long titles would fight it).
  3. row: **`wariant · cena`** — variant left, price right. Size/weight lives here,
     not in the name.
  No SKU on the shelf; catalogue/micrographics depth belongs on the PDP.
  Meta cells speak **one typographic voice** (mono, uppercase, tracked) — mixing a
  mono code with a sans label reads as a bolted-on sticker, not a system.
- **Origin** — from `konbini.origin_country`. Placement **[open]**: code above the
  name (leading option), or a small round vector flag on the packshot (the one
  sanctioned exception to rule 1). Flags are **flat vector 1:1 only** — use
  circle-flags (MIT), inlined, with per-flag namespaced ids (they all ship
  `id="a"` and would collide). **Never emoji** — Windows does not render flag emoji.
- **Icons** — outline, ~1px stroke, 16×16 / 18×18. Katakana seal family separate.
- **Availability — one positive state.** There is no "wyprzedane" message. Both
  out-of-stock and not-yet-launched products show
  **`Niebawem dostępne — Powiadom mnie`**, with no variant, no price and no
  dimming: a brief invitation, not a dead end. *Rule to confirm: apply only to
  products that genuinely return; for discontinued items the card should leave the
  shelf, otherwise we promise a restock that never comes.*
- **Promo** — struck old price + new price in orange. **No `−X%` chip.**
  Product-attribute tags (vegan, spice, allergens) come from Phase-5 metafields.
- Full states (hover / active / focus / disabled) defined during build.

---

## 8. Motion

**Crisp / mechanical** — fast, decisive transitions, hard easing, a "cut"
quality (matches brutalist/micrographics + Pocari energy). Restrained, never
soft-organic float. Tokens: `--k-ease-out`, `--k-duration-micro/reveal`. Always
respect `prefers-reduced-motion`.

---

## 9. Photography

The ownable moat. Two modes, documented so new shots always match.

- **Product ("brutalist stage")** — cool neutral-grey seamless, one hard
  directional key light, a long hard-edged cast shadow to one side, hero centred
  and slightly from below, ~1:1. Colour/energy come from the products; the stage
  stays neutral. **The grey exists only to make the product pop against the
  page's white — never migrate it onto the page.**
- **People / editorial** — cobalt blue-duotone treatment.
- **Interface rule** — product media sits on **pure white**, never a grey tile
  (the photo carries its own stage); no double-frame, no UI shadow.

To codify for future shoots: grey seamless value, light angle/distance, shadow
hardness, camera height, lens.

---

## 10. Voice & tone

Visuals are disciplined; Polish copy stays warm and a little playful
("Kluchy", "Zupoteka", "Melanż past" are brand assets). Brand moments may use the
nostalgia register from *O nas* ("kawałek domu daleko od domu"). Never invent
brand claims; say "japońsko-koreański", never "azjatycki" as the primary
descriptor; never "mały sklep". See `CLAUDE.md` brand-voice rules.

---

## 11. Accessibility

First-class. WCAG-AA contrast on every pair; visible focus states; keyboard
operability; `lang` attributes on CJK spans; reduced-motion honoured; uppercase
and letter-spacing Latin-scoped (harmful in CJK). See `docs/04-i18n.md`.

---

## 12. Governance

Tokens are the single source of truth (`snippets/konbini-tokens.liquid`). All
custom code consumes `--k-*` / Horizon vars — no raw hexes (grep-audited). The
`konbini-*` naming convention keeps everything merge-safe. This document gates
every new page: if a choice isn't derivable from here, it's a design decision to
raise, not to improvise.

---

## Open (decided by specimen / later)

- Typeface lock (IBM Plex vs alternates) — **[specimen]**
- Exact orange hue (朱 `#E0451F` / warm `#EA5B24` / bright `#FF5C00`) — **[specimen]**
- Display weight (bold ↔ medium) — **[specimen]**, tokenized
- Origin placement on the card — **[open]** (see Components)
- "Niebawem dostępne" scope: restocking items only? — **[open]**
- Short **display name** metafield — the real product titles are long and dominate
  the shelf; full title stays for SEO/search — **[phase 5]**
- Line-art illustration system — directional base pending approval
- Exact type scale ramp / tracking — **[specimen]**
- Product-attribute tags — **[phase 5]**

Review artifacts: [type/colour specimen](https://claude.ai/code/artifact/36b1e43d-edf9-4a3c-90e4-fce7a1645c5c) ·
[product-card variants A–F, preview + wireframe](https://claude.ai/code/artifact/288a62a0-541d-402f-ae3c-d67d2e93eac9)
