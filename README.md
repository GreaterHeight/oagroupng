# OA Group (OAGroupNG) — Production Website

Pure HTML5 + CSS3 + Vanilla JavaScript. No framework, build step, external font, icon library or runtime dependency is required.

## Important source-of-truth decision
The supplied OA Group Master Color Specification is treated as the controlling palette. Its three immutable source colours are #5C6C94, #AAB4C8 and #FFFFFF. The build prompt contained legacy entity accent colours outside that palette; those colours are NOT used as brand colours here because the Master Color Specification explicitly forbids introducing unapproved colours. Entity cards use controlled OA tonal derivatives as visual identifiers.

## Deploy
Upload the folder contents to the web root of the domain:
https://www.oagroupng.com/

The site works as static files on Apache, Nginx, IIS, GitHub Pages or similar static hosting.

## Routing
Directories contain index.html files, so clean URLs work on hosts that serve directory indexes:
- /about/
- /companies/
- /services/
- /blog/
- /contact/
- /faq/
- /privacy/
- /disclaimer/
- /terms/

## Before launch
1. Connect the contact form to the organisation's approved mail/form endpoint. The front-end intentionally does not pretend to send mail.
2. Confirm and publish the real office street address before activating map structured data or an embedded map.
3. Replace the role-based leadership architecture with approved individual biographies and images when supplied.
4. Confirm current CAC numbers, ICAN details and any regulator/licence claims before publishing them.
5. Replace social placeholder href="#" values with approved official profiles.
6. Confirm whether entity subdomains are live; remove data-status="coming-soon" and the corresponding tooltip behaviour when they launch.
7. If analytics/marketing cookies are introduced, implement a documented consent-management workflow before activation.
8. Generate/update sitemap URLs if additional article detail pages are added.

## Accessibility
The build includes skip links, semantic landmarks, labelled form controls, visible focus states, keyboard-accessible dropdowns and accordions, reduced-motion support, and colour rules derived from the Master Color Specification.

## Quality
The build includes:
- Unique page titles/descriptions
- Canonical URLs
- hreflang en-NG
- Organization JSON-LD
- FAQPage JSON-LD
- robots.txt
- sitemap.xml
- llms.txt and llms-full.txt
- Responsive mobile-first styling
