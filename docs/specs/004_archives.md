# UI Specification: Nue Archives (Portfolio)

## 1. Overview
**Page:** `/archives`
**Goal:** Display the developer's skills, history, and "mission logs" (projects) in a format consistent with the Nue-Japan cybersecurity theme.

## 2. Design Concept
- **Theme:** "Secure Data Vault" / "Akashic Records".
- **Visuals:** 
    - Dark, minimalist aesthetic.
    - Data streams/particles in the background.
    - "File Folder" or "Holographic Slate" metaphors for content sections.

## 3. Key Modules

### A. Agent Profile (Header)
- **Content:**
    - Name / Codename ("Nuell-Gon").
    - Role ("Full Stack Engineer / Security Specialist").
    - Status ("Active").
- **Style:** ID Card format with a glitched avatar.

### B. Tech Weaponry (Skills)
- **Content:**
    - **Frontend:** Next.js, React, Tailwind, TypeScript.
    - **Backend:** Python (FastAPI), Rust, PostgreSQL, Docker.
    - **Tools:** Git, Linux, Figma.
- **Layout:** Hexagonal grid or "Inventory Slot" design. Hovering reveals proficiency level.

### C. Mission Logs (Projects)
- **Content:**
    - List of past projects.
    - Each item includes: Title, Date, Tech Used, Summary, Link (if available).
- **Layout:** Vertical timeline with connecting lines (like a git graph).

## 4. Navigation
- Back button to Mainframe (`/mainframe`).
- "Download Dossier" (Resume PDF link - placeholder).

## 5. Interactions
- **Scroll Animations:** Elements fade in or slide in as the user scrolls.
- **Hover Effects:** "Decryption" text effect on headers.
