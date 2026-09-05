# OA Group Nigeria — v4.37 Form QA

Static implementation checks:

- Contact form: production endpoint configured; no mailto submission logic.
- Careers form: production endpoint configured; multipart CV upload configured; no mailto submission logic.
- Newsletter: production AJAX endpoint configured; no mailto submission logic.
- FormSubmit domain added to CSP `connect-src` and `form-action` across HTML pages.
- Contact enquiry routing remains intact and is included in the email subject/routing metadata.
- Contact success/error feedback is shown in-page.
- Careers success/error feedback is shown in-page.
- Newsletter success/error feedback is shown in-page.
- Native form fallback endpoint is configured.

Browser delivery cannot be independently verified from this build environment because it requires an external live submission and the recipient's FormSubmit activation. The first live submission/activation must be performed on the deployed site.
