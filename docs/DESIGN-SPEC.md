# Stella Portfolio — Living Design Specification

Last updated: 2026-09-03

## Design Direction

The portfolio uses the visual language of a cinematic game menu while remaining a professional AI/SWE portfolio. The interface should feel like entering Stella's technical world—not like playing an unrelated game.

The expressive/professional balance is intentionally asymmetric: the landing screen carries the cinematic identity, while every content module behaves like a disciplined editorial portfolio. Target balance: approximately 25% game/cyber styling and 75% professional information design.

Core qualities:

- dark, cinematic, and dimensional
- subtle cyberpunk city atmosphere
- restrained code/terminal language
- K-pop and hip-hop editorial confidence through spacing, composition, and typography
- professional readability before decoration
- personal anchors: Stella's portrait, orange pixel cat, SJ identity, and real product imagery

Avoid:

- decorative system text with no informational value
- horror, weapons, or aggressive game tropes
- excessive neon, glitch effects, or illegible condensed type
- generic template cards and evenly stretched dashboard tiles
- fake product screens, fake logos, or unsupported claims

## Visual System

### Palette

- Base: near-black navy `#050B12`
- Surface: deep blue-black `#06101B`
- Primary text: warm white `#F3F0E8`
- Secondary text: blue gray `#C8D2D8`
- Accent: mint `#67DCC0`
- Secondary accent: violet `#8D7CFF`
- Personal accent: muted rose `#C96F94`

### Typography

- Primary UI: Geist Sans
- Technical labels: Geist Mono
- Large headings: bold sans serif with tight tracking
- Body copy: comfortable sans serif; no thin gray text on dark backgrounds
- Small game-style labels are reserved for indexes, status, controls, and metadata

### Image Treatment

- Background: cinematic rainy/futuristic city with dark overlay and restrained data-line details
- About portrait: real LinkedIn half-body portrait in a quiet rectangular frame
- Browser icon and header avatar: orange pixel cat
- Project visuals: real demo screenshots, shown with product-appropriate aspect ratios
- Organization and product marks: official/local assets only

## Information Architecture

1. Landing / Start screen
2. Experience
3. Projects
4. Research
5. About
6. Resume
7. Contact

Experience is listed before Projects. Capybara Science Lab appears only in the dedicated Research module. Contact and Resume remain separate.

## Page Layout Rules

### Landing

- Character/city visual occupies the atmospheric right side.
- Name, role, and value proposition remain immediately readable on the left.
- “Enter Portfolio” is the primary action; Resume is secondary.
- Motion is subtle: background drift, slow character breathing, and restrained light movement.
- On the first visit in a browsing session, the homepage performs a non-blocking sequence of approximately 5.4 seconds. `STELLA` and `JIANG` are typed through real state updates at 150 ms per letter, with a brief line-break pause. The blinking underscore follows the current insertion point, settles at `JIANG_`, and the terminal command, role, introduction, actions, and availability status appear afterward in a tighter sequence.
- The full startup sequence plays once per session. Returning home uses the normal fast transition, and reduced-motion visitors receive the complete static homepage immediately.

### Menu

- Terminal/game-menu panel with six useful modules only.
- Each row contains index, clear title, meaningful subtitle, and direction arrow.
- Subtitles must retain high contrast and readable size.
- The full terminal menu is the entry screen. Inside content modules it collapses into a quiet, fixed left rail showing only useful section names.
- Entering a module uses a controlled two-stage transition: the full terminal first compresses toward the compact left-rail dimensions while its inner copy fades; only after it reaches the rail does the clear module navigation settle in and the content stage enter. The transition uses standard transforms and opacity for consistent rendering without snapshot blur or ghosting.
- The current module receives the rail's strongest contrast and mint indicator; every other module remains available for direct switching without returning to the full menu.
- The main menu keeps a single `ESC` control. Clicking it or pressing Escape returns to the landing page and replays the staged intro. Menu items remain directly clickable, and Enter keyboard support works without an extra on-screen hint. Inside a content module, Escape returns to the menu without replaying the intro.

### Experience

- Vertical chronological timeline with a continuous illuminated path and one node per role.
- The timeline spine is the only vertical rule in each experience row. Active company copy and expanded details use contrast, indentation, and spacing instead of adding parallel accent rules.
- Each entry shows date, company/product logo, role, location, and concise evidence-led summary.
- Timeline nodes remain quiet coordinates; even the current-role node uses only a restrained mint outline.
- As the visitor scrolls, the company logo and company/role copy—not the sequence number—rise into clarity. The entry nearest the reading zone receives the strongest contrast, mint role accent, and restrained logo glow; revealed entries remain readable.
- Default copy is a curated web summary rather than the complete resume: one positioning sentence remains visible, while an accessible `VIEW DETAILS` control smoothly reveals up to two strongest outcomes and compact technology tags. Only one role is expanded at a time.
- Companies with verified official websites link directly from the company name, with a restrained external-link arrow and hover treatment. Public product links remain in the expanded layer. FocusTrail exposes separate `ADTI TEST` and `PRODUCT DEMO` actions.
- Official logos are preferred to text placeholders.
- Wide wordmarks may use a wider logo cell; square icons should remain visually consistent.

### Projects

- Featured projects receive larger cards and real demo images.
- PantryAgent uses a compact three-screen product-flow gallery: product loop, receipt scan, and meal plan. Every portrait capture remains fully visible with `object-fit: contain`; mobile uses a restrained horizontal scroll instead of cropping the screens.
- Intent2Escrow retains a landscape product frame.
- C&S MovieStore uses a real employee-dashboard demo frame and is presented as a full-stack system by Team C&S Restaurant without foregrounding its course context.
- Mosaic remains in the project archive as a personal activity-analytics system, using its generated daily review to demonstrate the final reflective output.
- Product logo, role/context, summary, workflow, and technology appear in that order.

### Research

- Research remains module `03`; its two studies are numbered locally as `RESEARCH 01` and `RESEARCH 02`.
- Trajalysis and Cost-Aware Active Failure Diagnosis use one shared entry structure: local number, title, research context, rose metadata rule, lead statement, four-step method strip, study description, mint evidence panel, and technology line.
- The rose rule identifies people and institutional context; the mint translucent panels identify methods and measurable evidence. These colors carry the same meaning in both entries.
- Four-step frameworks stay compact and horizontal on desktop, then become a two-column strip on mobile.
- Titles and findings may vary in length, but spacing, type hierarchy, border treatment, and content order remain identical.

### About

- Desktop target: one viewport without scrolling.
- Title and subtitle at top; main copy on left, LinkedIn portrait on right.
- Technical toolkit sits directly below the introduction and to the left of the portrait.
- Toolkit items are content-width chips, not stretched grid cells.
- Use available space confidently: large readable copy and portrait, without making the page feel empty.

### Resume

- Desktop target: one viewport without scrolling.
- Resume is embedded inside the website; it does not require leaving the site.
- Left column provides identity, role, education, public-version note, and Download PDF.
- Right column contains the one-page PDF preview.
- On mobile, columns stack and natural scrolling is allowed.

### Contact

- Separate from Resume.
- Email, GitHub, and LinkedIn each use a recognizable icon.
- Links stay direct and high contrast.

## Responsive Rules

- Desktop: cinematic two-column compositions and one-screen treatment for sparse pages.
- Mobile: stack columns, preserve touch targets, and allow scrolling instead of shrinking copy excessively.
- Project screenshots use product-specific sizing rather than one global crop ratio.
- Respect `prefers-reduced-motion`.

## Motion Rules

- Use smooth easing and short-to-medium durations.
- Page transitions should feel continuous but should not delay access to information.
- Content-page hover effects use contrast and border changes rather than lift, glow, or large image movement.
- Background movement must remain quiet enough for reading.
- The hero character keeps only restrained ambient breathing and hair movement. Mouse-follow parallax, hover enlargement, signal acceleration, and focus glow are removed so the portrait reads as a cinematic identity image rather than a game interaction target.
- The hero is the single expressive motion moment; content modules use motion only when it explains sequence, such as the experience timeline.

## Asset Register

| Asset | File | Status |
|---|---|---|
| Pixel cat avatar/favicon | `public/profile-cat.png`, `public/favicon.svg` | Active |
| Photorealistic Cinematic Stella hero | `public/stella-cinematic-hero.png` | Active default — `/?hero=real` or `/` |
| Semi-realistic Cinematic Stella hero | `public/stella-cinematic-hero-semi-real.png` | Saved alternative — `/?hero=semi` |
| Full-CG Cinematic Stella hero | `public/stella-cinematic-hero-cg.png` | Saved alternative — `/?hero=cg` |

### Hero idle-motion prototype

- The active hero keeps the face stable while the masked body layer performs a restrained slow breathing shift.
- A narrow masked hair-edge layer adds sub-pixel breeze motion without warping facial features.
- Two mint signal particles travel through the scene as agent/data traces.
- The jacket pixel-cat receives a brief, infrequent orange signal pulse.
- Mobile hides the positional cat/data overlays; `prefers-reduced-motion` disables the complete sequence.
| Previous city character background | `public/stella-city-reference.png` | Retained as an archived visual option |
| About portrait | `public/stella-linkedin-portrait.jpg` | Active |
| FocusTrail logo | `public/brands/focustrail.svg` | Active; newest monochrome mark combined with a clear FocusTrail wordmark in the interface |
| PantryAgent logo | `public/brands/pantryagent.svg` | Active |
| PantryAgent product flow | `public/projects/pantryagent-overview.jpg`, `pantryagent-scan.jpg`, `pantryagent-plan.jpg` | Active; three complete portrait screens |
| Intent2Escrow demo | `public/projects/intent2escrow-demo.png` | Active |
| C&S MovieStore demo | `public/projects/fabflix-demo.jpg` | Active; selected from the team's demo video |
| Mosaic daily review | `public/projects/mosaic-demo.jpg` | Active; reflective-report output |
| NextTier logo | `public/brands/nexttier.png` | Active; downloaded from official site |
| FessorAI logo | `public/brands/fessorai.png` | Active; enlarged and tightly framed for timeline legibility |
| Alibaba Group logo | `public/brands/alibaba-group.png` | Active; official Alibaba Group media asset |
| Beijing Join-Cheer logo | `public/brands/join-cheer.jpg` | Active; official bilingual horizontal mark extracted from the company's 2022 annual report |
| Guolian Minsheng Securities logo | `public/brands/guolian-minsheng-securities.png` | Active; user-provided official current wordmark |
| Public resume | `public/documents/stella-yuxuan-jiang-resume.pdf` | Active; embedded |

## Maintenance Rules

1. Record approved layout and visual changes in this file.
2. Record exact public-facing text in `docs/CONTENT-DRAFT.md`.
3. Synchronize approved copy to `content/portfolio-content.json`.
4. Add asset provenance/status to the Asset Register.
5. Run `npm run build` after implementation changes.
6. Check desktop and mobile behavior before considering a page complete.
