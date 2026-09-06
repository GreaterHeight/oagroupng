# OA Group Nigeria — Image Load Audit / v4.42

## Findings
- Leadership card images were wired to derivative `*-card.jpg` filenames while the supplied portrait assets are the authoritative source files.
- The supplied portrait assets were verified as valid JPEG files.
- Earlier optimization passes left malformed HTML image tags containing `/` immediately before attributes such as `loading` and `decoding`.
- The placeholder script could temporarily hide hero images while they were pending; this has been hardened so non-hero real images remain visible while loading.
- Inner-page hero assets listed in `IMAGE-WIRING-MANIFEST.md` that are not physically supplied remain intentional placeholder slots. They are not fabricated or silently replaced.

## Leadership portrait wiring
The six affected cards now use the supplied source portraits:
- Dr-Julius-Olugbde.jpg
- Kehinde-Oyeleke.jpg
- Bamidele-Martins.jpg
- Success-Igboekwere.jpg
- John.jpg
- Udon-Joel.jpg

Otunba Olusola Adekanola continues to use:
- Otuba-Olusola-Adekanola.jpg

## Hero asset status
The current package contains the Leadership hero portrait. The other dedicated hero filenames in the image wiring manifest are not present in the supplied build and therefore remain placeholder-first by design. The placeholder system is retained rather than inventing or substituting unrelated images.

## Verification
All local image references were checked against the package after rewiring. Supplied leadership portraits are present and valid JPEGs.
