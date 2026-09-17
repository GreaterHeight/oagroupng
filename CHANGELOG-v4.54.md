# OA Group Nigeria Website — v4.54

## Mobile leadership profile modal containment and readability repair

- Reworked the mobile leadership profile modal as a complete, self-contained viewport surface.
- Set the mobile dialog to a full-height flex column with its own opaque white background.
- Ensured the portrait panel and biography panel remain inside the dialog's scroll container.
- Prevented the underlying leadership page, imagery and floating WhatsApp utility from showing through the profile content.
- Kept the close control visible with a fixed mobile position and improved touch target sizing.
- Added explicit mobile text visibility, wrapping and line-height rules.
- Cache-busted the production stylesheet and leadership script to `4.54`.
