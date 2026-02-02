# Directory Structure Specification

This document outlines the directory structure for the `nuell-gon` project.

## Overview
The project follows a standard Next.js (App Router) structure with TypeScript and Tailwind CSS.

## Root Directory
- `/src`: Application source code.
- `/docs`: Project documentation and specifications (docDD).
- `/scripts`: Automation and utility scripts.
- `/public`: Static assets (images, fonts, etc.).

## Detailed Structure

```
nuell-gon/
├── docs/                   # Documentation Driven Development specs
│   ├── architecture/       # Architectural decisions and structure
│   └── specs/              # Feature specifications
├── scripts/                # CI/CD and maintenance scripts
├── public/                 # Static files
├── src/                    # Source code
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/         # React components
│   │   ├── ui/             # Reusable UI components (buttons, inputs)
│   │   └── features/       # Feature-specific components
│   ├── lib/                # Third-party library configurations
│   ├── utils/              # Helper functions and utilities
│   ├── types/              # Global TypeScript type definitions
│   └── styles/             # Global styles and Tailwind configuration
├── .gitignore
├── next.config.mjs         # Next.js configuration
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Naming Conventions
- Directories: `kebab-case`
- Files: `kebab-case` (except React components which can be `PascalCase` if preferred, or `kebab-case` with named exports)
- Components: `PascalCase`
