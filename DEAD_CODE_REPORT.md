# Dead Code Report

Date: 2026-03-06

## Scope
- Candidate directory: `src/components/sections`
- Backup files in `src/components/services/content/*.backup`
- Unused stylesheet: `src/styles/globals.css`

## Actions Taken
1. Deleted backup files under `src/components/services/content`.
2. Deleted unimported stylesheet `src/styles/globals.css`.
3. Audited references to `src/components/sections/*`.

## Reference Audit Evidence
### Files Present in src/components/sections
```text
src/components/sections/capabilities-timeline.tsx
src/components/sections/careers.tsx
src/components/sections/case-studies.tsx
src/components/sections/ecosystem-partners.tsx
src/components/sections/final-cta.tsx
src/components/sections/metrics.tsx
src/components/sections/projects.tsx
src/components/sections/security.tsx
src/components/sections/services-slideshow.tsx
src/components/sections/services.tsx
src/components/sections/swarppay-spotlight.tsx
src/components/sections/what-we-build.tsx
```

### Direct import/search matches for components/sections
```text
(no matches)
```

## Conclusion
- `src/components/sections/*` has no direct references from `src/app` or `src/components` and is currently a dead-code candidate.
- The directory was not deleted automatically to avoid removing potentially planned work without explicit confirmation.
