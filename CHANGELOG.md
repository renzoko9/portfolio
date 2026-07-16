# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-07-16

### Changed

- Language toggle now switches instantly on the same page instead of navigating to a separate `/en/` route, with the choice persisted in `localStorage`.
- Reworked the header's language/theme divider to align with the page's grid lines instead of floating between the two controls.
- Colored the theme toggle's sun and moon icons instead of leaving them neutral gray.

### Fixed

- Language toggle now displays the currently active language instead of the one it would switch to.

## [1.0.0] - 2026-07-15

### Added

- Portfolio built with Astro, self-hosted fonts (Space Grotesk, JetBrains Mono), and a custom Tailwind-like utility CSS design system.
- Bilingual site (ES/EN) with a language toggle showing country flags, harmonized with the theme toggle.
- Real social links (LinkedIn, GitHub, X) and a working mailto contact form.
- Branded "RC." favicon (SVG + ICO).

### Changed

- Rewrote the About bio into a single, more direct paragraph.
- Reduced the hero title size for better scale harmony.
- Expanded the skills list (Redis, WebSockets, Tailwind, TanStack Query, and others).
- Bled project rows to the frame lines and added a spacer row between sections.
- Marked the INOUT project as "deploying" instead of live.

### Fixed

- Theme toggle sun/moon icons no longer render stacked on top of each other.

### Removed

- Design reference files, no longer needed after implementation.
