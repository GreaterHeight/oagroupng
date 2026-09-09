# OA Group Website — v4.48

## Product Detail Hero Full-Bleed Treatment

Updated the eCertMan® and MatrimonyRoll™ detail-page hero sections to use the same true full-bleed image architecture as the main Products page.

### Changes
- Hero image now fills the complete product detail hero section edge-to-edge.
- Product copy is layered above the image with a controlled dark editorial gradient for readability.
- Preserved the existing placeholder-first image system and missing-image fallback behaviour.
- Added responsive full-bleed behaviour for tablet and mobile layouts.
- Product hero images are now eager/high-priority because they are above-the-fold hero assets.
- No product content or image filenames were changed.

## v4.49 — Product Detail Hero Content Gutter Correction
- Corrected the eCertMan® and MatrimonyRoll™ full-bleed hero copy alignment.
- Restored the shared `.container` horizontal gutter so hero text no longer touches the viewport edge.
- Preserved true full-bleed hero imagery: the background image still fills the complete hero section edge-to-edge.
- Applied the correction responsively using the site's existing `--oa-max` and `--oa-gutter` container system.
