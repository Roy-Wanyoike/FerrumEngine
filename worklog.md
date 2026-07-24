---
Task ID: 1
Agent: Main Agent
Task: Complete site audit, dark mode fix, ColorCustomizer, new platform sections

Work Log:
- Read all 20+ source files to understand full codebase state
- Fixed dark mode readability across 9 component files (vision-hero, platform-layers, why-ferrum, ferrum-principles, dev-experience, stats-bar, enterprise, hall-of-fame, roadmap-section)
- Increased text opacity from /15-40 range to /35-80 range for proper dark mode contrast
- Created ColorCustomizer component (color-customizer.tsx) with 24-swatch palette, hex input, localStorage persistence, live CSS variable rewriting
- Added ColorCustomizer to nav toolbar between GitHub icon and theme toggle
- Rewrote footer.tsx: fixed dead anchor links (now navigates home first then scrolls), fixed API link, increased text opacity from /30-40 to /50-60, added onNavigateHome/onNavigateEffects/onNavigateEffects props
- Updated page.tsx to pass new footer props
- Verified nav dropdowns already had panel hover handlers and 300ms timeout from previous session
- Created Platform Architecture page (platform-architecture.tsx) with interactive dependency diagram, data flow pipeline, framework adapter matrix
- Created Learning Center (learning-center.tsx) with 5 learning paths, 24 modules, expandable accordion
- Created Showcase Gallery (showcase-gallery.tsx) with 8 production-quality project showcases
- Created Vision & Manifesto (vision-manifesto.tsx) with timeline and 6 manifesto sections
- Created Enterprise Component Library (enterprise-components.tsx) with 12 enterprise components
- Extended ViewId type with 5 new views: platform-architecture, showcase, learning, enterprise-components, vision
- Added all new views to page.tsx with dynamic imports and title mapping
- Updated nav docs menu to include Learning Center and Platform Architecture
- Changed Showcase nav link from hall-of-fame to new showcase gallery
- Added CSS custom properties for --ferrum-accent and dark mode minimum contrast vars
- Build verified: 6.9s compile, 0 errors

Stage Summary:
- Dark mode readability dramatically improved across all sections
- ColorCustomizer is a key new feature in the nav toolbar
- 5 new major platform sections created and wired into routing
- Footer links now work correctly from any view
- All changes build successfully