# UI Specification: Landing Page (Top)

## 1. Design Concept
**Theme:** "The Chimera of Data & Logic" (Nue)
**Style:** Cyberpunk x Traditional Japanese (Neo-Japanesque)

### Color Palette
- **Background:** `bg-[#050505]` (Obsidian Black)
- **Primary Accent:** `text-[#D00000]` (Deep Crimson / Vermilion) - Representing "Nue's Life/Blood"
- **Secondary Accent:** `text-[#A855F7]` (Neon Purple) - Representing "Cyber/Mystery"
- **Text (Main):** `text-[#E0E0E0]` (Off-white / Silver)

### Typography
- **English (Headings/UI):** Futuristic Sans-serif (e.g., `Inter`, `Orbitron` or similar system font)
    - `font-sans tracking-widest uppercase`
- **Japanese (Accents):** Mincho (Serif)
    - `font-serif writing-vertical-rl text-xs opacity-80`
    - Used for decorative kanji elements (e.g., "鵺", "技術", "混沌").

---

## 2. Component Specifications

### 2.1 Hero Section
**Layout:** Full screen (`h-screen w-full`), centered content.

**Background Animation:**
- **Visual:** Geometric particles floating in a void.
- **Tech:** CSS Animations or Light Canvas.
- **Behavior:** Subtle floating motion, connecting lines on hover (optional).
- **Tailwind Hint:** `absolute inset-0 -z-10 overflow-hidden`

**Main Content:**
1.  **Title:** "NUE-JAPAN"
    - **Style:** Large text (`text-6xl md:text-9xl`), Bold (`font-black`).
    - **Effect:** Glitch Animation.
        - Occasional random displacement (clip-path).
        - RGB split shifts (`text-shadow`).
    - **Tailwind Hint:** `animate-glitch` (Requires custom keyframes in `tailwind.config.ts`).

2.  **Subtitle:** "The Chimera of Data & Logic"
    - **Style:** Small, spaced out (`text-sm md:text-xl tracking-[0.5em]`).
    - **Color:** `text-gray-400`.
    - **Animation:** Fade-in from bottom (`animate-fade-in-up`).

3.  **Decorative Elements:**
    - Vertical Japanese text running along the sides (e.g., "仮想", "現実").
    - `absolute left-4 top-1/2 -translate-y-1/2 writing-vertical-rl font-serif text-[#D00000]/50`.

### 2.2 Action Button (System Check)
**Position:** Below the subtitle.

**Design:**
- **Shape:** Sharp edges or chamfered corners (Cyberpunk style).
- **Label:** "System Check"
- **Style:**
    - Border: `border border-[#A855F7]`
    - Background: `bg-transparent hover:bg-[#A855F7]/10`
    - Text: `text-[#A855F7] font-mono`
    - Glow: Box-shadow glow on hover (`shadow-[0_0_15px_#A855F7]`).

**Interaction:**
- **Hover:**
    - Glitch text effect on the label (characters shuffle briefly).
    - Background light up.
- **Click:**
    - Ripple effect.
    - Transition to Diagnostic Page (future task).

---

## 3. Implementation Notes

### Tailwind Customization Requirements
Need to add the following to `tailwind.config.ts`:
- **Colors:**
    - `obsidian: '#050505'`
    - `neon-purple: '#A855F7'`
    - `deep-crimson: '#D00000'`
- **Keyframes (for `globals.css` or config):**
    - `glitch`: For the main title.
    - `fade-in-up`: For the subtitle.

### Assets
- No external images required for now (CSS generated).
- Fonts: Use Google Fonts (Inter for En, Noto Serif JP for Ja) via `next/font`.
