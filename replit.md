# Swarp Foundation Website

## Overview

This is a high-tech, production-ready marketing website for Swarp Foundation, a company offering AI, blockchain, and software development services. The site features a dark theme with electric blue, purple, and cyan branding, smooth animations, and a 10-section homepage structure covering services, products (SwarpPay), case studies, careers, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 14** with App Router - Chosen for React Server Components support, built-in routing, and optimized production builds
- **TypeScript** - Strict type checking enabled for code reliability
- **Tailwind CSS** - Utility-first styling with custom Swarp brand colors configured

### Project Structure
- `/src/app` - Next.js App Router pages and layouts
- `/src/components/sections` - Homepage section components (Hero, Services, CaseStudies, etc.)
- `/src/components/ui` - Reusable UI components (Button, Card, Header, Footer, animations)
- `/src/lib` - Utility functions (cn for className merging)

### Styling Approach
- CSS variables defined in `globals.css` for theming
- Custom utility classes for gradients and glow effects
- Shadcn/ui configuration present (components.json) using "new-york" style
- Dark mode enforced via `className="dark"` on html element

### Animation System
- **Framer Motion** for component animations and transitions
- Custom animated background with canvas-based particle system
- TypeWriter component for rotating headline text
- Text scramble effects for visual interest

### Component Patterns
- Client components marked with `"use client"` directive for interactivity
- Reusable Card, Button components with variant props
- Section components are self-contained with their own data and styling

### Path Aliases
- `@/*` maps to `./src/*` for clean imports

## External Dependencies

### Core Libraries
- `next` (v14.2.18) - React framework
- `react` / `react-dom` (v18.3.1) - UI library
- `framer-motion` (v11.11.11) - Animation library
- `lucide-react` (v0.460.0) - Icon library

### Styling
- `tailwindcss` (v3.4.1) - CSS framework
- `tailwindcss-animate` - Animation utilities for Tailwind
- `clsx` + `tailwind-merge` - Conditional className handling

### Development
- `typescript` (v5) - Type checking
- `eslint` with `eslint-config-next` - Linting
- `autoprefixer` / `postcss` - CSS processing

### No Backend/Database
- Currently a static frontend site
- Contact form logs to console (placeholder for future API integration)
- No authentication or data persistence implemented