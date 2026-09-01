# OA Group Nigeria — Deployment

## GitHub Pages
1. Create a GitHub repository for the website.
2. Upload the complete contents of this directory to the repository root.
3. Enable GitHub Pages from the repository settings and select the production branch/root.
4. Add `www.oagroupng.com` as the custom domain and retain the generated CNAME if GitHub creates one.
5. Configure DNS at Cloudflare according to GitHub Pages current IP/CNAME requirements.
6. Set SSL/TLS to Full/Strict after the certificate is active.
7. Test every page, form, subdomain link and responsive breakpoint.

## Static-form behaviour
Because GitHub Pages has no server-side processing, the contact and career forms validate in-browser and prepare a `mailto:` submission to `info@oagroupng.com`. For production lead capture, connect the forms to an approved form-processing service or backend without changing the visual architecture.

## Content verification before launch
Replace or verify any company-specific regulatory, professional-affiliation, registration or leadership information before publication. The build does not invent missing licence numbers, registration numbers or leadership identities.
