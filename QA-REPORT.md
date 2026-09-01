# OA Group Nigeria Website — QA Review & Corrections

## Scope
Reviewed the generated OA Group Nigeria static website against the supplied OA Group Master Color Specification and Website Generation Prompt v3.0.

## Defects found and corrected

1. **Desktop navigation could be hidden by JavaScript.** The menu was initialized with `hidden=true` regardless of viewport. Corrected to initialize hidden only on mobile and to recover correctly on resize.
2. **Mobile navigation lacked robust state handling.** Added outside-click close, Escape close, focus return, keyboard focus containment and body scroll locking.
3. **Navigation lacked `aria-current`.** Added path-aware current-page state for better screen-reader orientation.
4. **FAQ accordion was not fully ARIA-compliant.** Added stable button/panel IDs, `aria-controls`, `aria-labelledby`, `role="region"`, and synchronized `aria-hidden` state.
5. **FAQ/Gallery pages contained an extra closing `</section>` tag.** Removed from all affected pages.
6. **FAQ implementation was page-inline rather than reusable.** Replaced with a dedicated `accordion.js` module.
7. **Gallery video buttons had no implementation.** Added a functional vanilla-JS modal placeholder so every video CTA opens an accessible modal. The placeholder explicitly requires the approved production/YouTube asset before launch.
8. **Lightbox had no focus trap or focus restoration.** Added keyboard focus containment, Escape/arrow-key handling, body scroll locking, focus restoration and basic image-error handling.
9. **Lightbox did not explicitly handle an empty item set.** Added safe initialization guards.
10. **Contact/career forms used `mailto:` without explaining static-site limitations.** Hardened validation and clearly informs users that a CV must be attached manually because GitHub Pages has no server-side multipart form processor.
11. **Career CV upload was not validated.** Added PDF/DOC/DOCX type validation and a 5 MB maximum.
12. **Form validation feedback was inconsistent.** Added invalid-field state and status messaging while preserving native browser validation.
13. **Newsletter form lacked explicit consent.** Added required newsletter consent checkbox and Privacy Policy link to the shared footer form.
14. **Cookie banner lacked the requested management path.** Added a lightweight preference-management state. No analytics/non-essential cookie is enabled by this static build.
15. **`localStorage` access could throw and abort page initialization in privacy-restricted contexts.** Added safe storage detection and exception handling.
16. **Inline styling was widespread.** Removed inline styles and moved layout/entity styling into the CSS system, improving maintainability and CSP compatibility.
17. **The modal used pure black as a functional background.** Replaced it with the approved OA Group deep tone to respect the supplied colour governance.
18. **Font preconnect directives were missing despite the prompt requiring them.** Added Google Fonts preconnects.
19. **Security hardening was incomplete.** Added a restrictive CSP meta policy, referrer policy, `object-src 'none'`, `base-uri 'self'`, and allowed only required frame/font origins.
20. **Search rendering relied on `innerHTML`.** The source dataset remains trusted/static, but the implementation now keeps all user-entered search text out of generated HTML; only static dataset fields are rendered.
21. **Search page footer was incomplete relative to the mandatory footer architecture.** Replaced it with the canonical footer, including social links, newsletter consent, cookie controls and back-to-top control.
22. **Solution tabs lacked keyboard arrow/Home/End behavior.** Added a dedicated `solutions.js` implementation following the ARIA tab interaction model.

## Verification completed

- JavaScript syntax check: PASS
- Required HTML pages: 23
- HTML pages with one H1: PASS
- Images with missing alt text: PASS
- Duplicate IDs: PASS
- Missing referenced JS assets: PASS
- Broken local links: PASS
- Forbidden production markers (`TODO`, `Lorem Ipsum`, `Coming Soon`, etc.): PASS
- Inline styles remaining in HTML: 0
- Required gallery image placeholders: 12
- Video placeholders: 3
- FAQ entries: 25
- Individual insight pages: 8
- Local static route requests: 23/23 returned successfully

## Known deployment constraints

The site is intentionally static and targets GitHub Pages. GitHub Pages does not provide server-side form processing, file uploads, newsletter storage or transactional email. Contact/career/newsletter submissions therefore open the visitor's configured email application. A real form endpoint should be added before production if server-side submission, attachment handling, CRM routing or newsletter subscription storage is required.

The supplied specification does not provide verified CAC numbers, licence numbers or leadership identities. Those were not fabricated.
