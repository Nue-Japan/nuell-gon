# UI Specification: Mainframe (Dashboard)

## 1. Overview
**Page:** `/mainframe`
**Goal:** The central hub (Dashboard) where users can access various services and view system status. Accessed after checking "System Compatibility".

## 2. Design Concept
**Theme:** "The Hub / Operating System Desktop"
**Style:** Cyberpunk HUD, Card-based Grid Layout, High Information Density but Organized.

### Color Palette
- **Background:** `bg-obsidian` (Deep black)
- **Cards:** `bg-gray-900/50` (Glassmorphism), Border `border-neon-purple/30`
- **Text:** `text-gray-300` (Body), `text-white` (Headers), `text-neon-purple` (Accents)

## 3. Component Specifications

### 3.1 Layout
- **Container:** Max-width container (`max-w-7xl`), centered.
- **Header:**
    - Left: "NUE-MAINFRAME"
    - Right: User Status (e.g., "GUEST_USER" or Login Button)
- **Grid:** Responsive Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

### 3.2 Cards (Modules)

#### A. "Chimera Specs" (Diagnostic)
- **Icon:** CPU / Chip
- **Title:** "Hardware Analysis"
- **Description:** "Analyze local machine capabilities and compatibility."
- **Status:** "READY" (Green)
- **Action:** Link to `/specs` (Future task)

#### B. "Nue Archives" (Portfolio)
- **Icon:** Folder / Archive
- **Title:** "Data Archives"
- **Description:** "Access developer history, skills, and project logs."
- **Status:** "ONLINE" (Green)
- **Action:** Link to `/archives` or external portfolio.

#### C. "Board" (Community)
- **Icon:** Message / Chat
- **Title:** "Comm Link"
- **Description:** "Encrypted communication channel."
- **Status:** "LOCKED" (Red/Gray) or "LOGIN REQUIRED"
- **Action:** Disabled or Login Prompt.

#### D. "System Status" (Backend Monitor)
- **Icon:** Server / Waveform
- **Title:** "Core Systems"
- **Description:** "Real-time backend metrics."
- **Content:**
    - "API Latency: 45ms" (Static for now)
    - "Nodes Active: 3"
- **Status:** "STABLE" (Green)

### 3.3 UI Elements
- **Card Hover:** Glow effect (`shadow-neon-purple`), slight scale up.
- **Animations:** Cards fade in sequentially (`staggered-fade-in`).

## 4. Implementation Notes

### Routing
- `src/app/system-check/page.tsx` "Enter Mainframe" button should link to `/mainframe`.
- Create `src/app/mainframe/page.tsx`.

### Icons
- Use `lucide-react` (standard icon library for React/Next.js) for consistency.
