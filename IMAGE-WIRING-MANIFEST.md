# OA Group Nigeria — Image Wiring Manifest

## Full-bleed inner-page heroes

| Page | HTML | Hero asset | Master |
|---|---|---|---|
| About | `/about/` | `about-institutional-architecture.jpg` | 16:9 |
| Our Companies | `/our-companies/` | `our-companies-portfolio.jpg` | 16:9 |
| Solutions | `/solutions/` | `solutions-integrated.jpg` | 16:9 |
| Industries | `/industries/` | `industries-nigeria.jpg` | 16:9 |
| Careers | `/careers/` | `careers-culture.jpg` | 16:9 |
| Gallery | `/gallery/` | `gallery-editorial-hero.jpg` | 16:9 |
| Insights | `/insights/` | `insights-editorial-hero.jpg` | 16:9 |
| Contact | `/contact/` | `contact-office.jpg` | 16:9 |
| FAQ | `/faq/` | `faq-institutional.jpg` | 16:9 |
| Privacy | `/privacy/` | `privacy-institutional-hero.jpg` | 16:9 |
| Terms | `/terms/` | `terms-institutional-hero.jpg` | 16:9 |
| Disclaimer | `/disclaimer/` | `disclaimer-institutional-hero.jpg` | 16:9 |
| Search | `/search/` | `search-institutional-hero.jpg` | 16:9 |

Individual Insight article pages use their dedicated `article-*.jpg` asset as
the full-bleed hero and each has its own 16:9 prompt in `IMAGE-PROMPTS.md`.

## Production rule

Do not use a 1.91:1 card/social image as an inner-page hero unless it is
explicitly specified as a hero asset. Every inner-page hero has a dedicated
16:9 master and a corresponding prompt.

## v4.8 Body Image Wiring

### `/about/`
- `about-people-collaboration.jpg` — body visual, "The Institution at Work"
- `about-governance-boardroom.jpg` — body visual, "Governance in Practice"

### `/our-companies/`
- `companies-portfolio-in-action.jpg` — body visual, "The Portfolio in Practice"
- `company-assurance-advisory.jpg` — specialist capability visual
- `company-property-development.jpg` — specialist capability visual
- `company-finance-commercial.jpg` — specialist capability visual

All six use the established placeholder-first `<img>` + `.arch-frame`
mechanism. If a JPG is not yet supplied, the existing image fallback removes
the failed image and displays the approved placeholder. Supplying the exact
JPG in `/images/` makes the real image render without further HTML changes.
