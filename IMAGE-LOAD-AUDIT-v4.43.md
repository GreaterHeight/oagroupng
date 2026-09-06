# OA Group Image Load Audit — v4.43

## Governing behavior

A placeholder is a **failure state only**. It is never displayed while an existing image is loading.

- Existing image file → render the real `<img>` immediately.
- Missing/failed image → apply `.is-empty` and show the designed placeholder.
- No `.is-placeholder-pending` visual state.
- No placeholder-first flash.
- Brand/logo assets are excluded from the generic fallback.

## Audit totals

- HTML pages scanned: 29
- Image references scanned: 156
- Existing image files: 91
- Missing image files: 65

## Missing assets

The following declared `/images/` assets are not physically present in the v4.41 source package and therefore remain legitimate placeholder candidates:

- `index.html` → `/images/insight-tax-reform.jpg`
- `index.html` → `/images/insight-revenue-recovery.jpg`
- `index.html` → `/images/insight-diaspora-property.jpg`
- `industries/index.html` → `/images/industries-nigeria.jpg`
- `contact/index.html` → `/images/contact-office.jpg`
- `purpose-values-mission/index.html` → `/images/purpose-values-mission-hero.jpg`
- `purpose-values-mission/index.html` → `/images/purpose-values.jpg`
- `purpose-values-mission/index.html` → `/images/mission-execution.jpg`
- `purpose-values-mission/index.html` → `/images/purpose-alignment.jpg`
- `disclaimer/index.html` → `/images/disclaimer-institutional-hero.jpg`
- `search/index.html` → `/images/search-institutional-hero.jpg`
- `gallery/index.html` → `/images/gallery-editorial-hero.jpg`
- `gallery/index.html` → `/images/gallery-office-team-02.jpg`
- `gallery/index.html` → `/images/gallery-project-01.jpg`
- `gallery/index.html` → `/images/gallery-project-02.jpg`
- `gallery/index.html` → `/images/gallery-project-03.jpg`
- `gallery/index.html` → `/images/gallery-project-04.jpg`
- `gallery/index.html` → `/images/gallery-property-01.jpg`
- `gallery/index.html` → `/images/gallery-property-02.jpg`
- `gallery/index.html` → `/images/gallery-property-03.jpg`
- `gallery/index.html` → `/images/gallery-events-training-01.jpg`
- `gallery/index.html` → `/images/gallery-events-training-02.jpg`
- `gallery/index.html` → `/images/gallery-events-training-03.jpg`
- `gallery/index.html` → `/images/gallery-video-01.jpg`
- `gallery/index.html` → `/images/gallery-video-02.jpg`
- `gallery/index.html` → `/images/gallery-video-03.jpg`
- `gallery/index.html` → `/images/article-government-contracts.jpg`
- `gallery/index.html` → `/images/article-integrated-approach.jpg`
- `code-of-conduct/index.html` → `/images/code-of-conduct-hero.jpg`
- `code-of-conduct/index.html` → `/images/code-of-conduct-integrity.jpg`
- `code-of-conduct/index.html` → `/images/code-of-conduct-culture.jpg`
- `solutions/index.html` → `/images/solutions-integrated.jpg`
- `our-companies/index.html` → `/images/our-companies-portfolio.jpg`
- `our-companies/index.html` → `/images/companies-portfolio-in-action.jpg`
- `our-companies/index.html` → `/images/company-assurance-advisory.jpg`
- `our-companies/index.html` → `/images/company-property-development.jpg`
- `our-companies/index.html` → `/images/company-finance-commercial.jpg`
- `terms/index.html` → `/images/terms-institutional-hero.jpg`
- `privacy/index.html` → `/images/privacy-institutional-hero.jpg`
- `about/index.html` → `/images/about-institutional-architecture.jpg`
- `about/index.html` → `/images/about-people-collaboration.jpg`
- `about/index.html` → `/images/about-governance-boardroom.jpg`
- `products/index.html` → `/images/products-hero.jpg`
- `insights/index.html` → `/images/insights-editorial-hero.jpg`
- `insights/index.html` → `/images/article-tax-reform.jpg`
- `insights/index.html` → `/images/article-revenue-recovery.jpg`
- `insights/index.html` → `/images/article-diaspora-property.jpg`
- `insights/index.html` → `/images/article-agency-banking.jpg`
- `insights/index.html` → `/images/article-government-contracts.jpg`
- `insights/index.html` → `/images/article-integrated-approach.jpg`
- `insights/index.html` → `/images/article-internal-controls-audit.jpg`
- `insights/index.html` → `/images/article-property-yield.jpg`
- `faq/index.html` → `/images/faq-institutional.jpg`
- `careers/index.html` → `/images/careers-culture.jpg`
- `careers/index.html` → `/images/careers-collaboration.jpg`
- `careers/index.html` → `/images/careers-learning.jpg`
- `careers/index.html` → `/images/careers-leadership.jpg`
- `insights/agency-banking-business-model-nigeria/index.html` → `/images/article-agency-banking.jpg`
- `insights/what-nigerias-2025-tax-reform-means-for-smes/index.html` → `/images/article-tax-reform.jpg`
- `insights/win-federal-government-contracts-nigeria/index.html` → `/images/article-government-contracts.jpg`
- `insights/diaspora-real-estate-investment-nigeria/index.html` → `/images/article-diaspora-property.jpg`
- `insights/internal-controls-vs-external-audit/index.html` → `/images/article-internal-controls-audit.jpg`
- `insights/property-yield-vs-capital-appreciation/index.html` → `/images/article-property-yield.jpg`
- `insights/oa-group-integrated-approach/index.html` → `/images/article-integrated-approach.jpg`
- `insights/recover-lost-revenue-nigerian-businesses/index.html` → `/images/article-revenue-recovery.jpg`

## Existing assets

Existing assets are allowed to render directly; they must not show the placeholder first.
