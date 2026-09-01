# OA Group Image Workflow

## Important: generated images do NOT appear automatically

`IMAGE-PROMPTS.md` is a production specification. It tells you what to generate and exactly which filename/path the website expects.

After generating an image, it must be saved into the website's `/images/` directory using the exact filename specified in `IMAGE-PROMPTS.md`.

Examples:

- Generate the tax-reform image → save as `/images/insight-tax-reform.jpg`
- Generate the revenue-recovery image → save as `/images/insight-revenue-recovery.jpg`
- Generate the hero poster → save as `/images/hero-video-poster.jpg`
- Generate the About image → save as `/images/about-institutional-architecture.jpg`

The website will then display the image because the HTML/CSS already references that asset path.

### There is no automatic connection between an AI image generator and this website

Generating an image in ChatGPT, Midjourney, Gemini, Leonardo, Pika, etc. does not upload the resulting file into the OA Group website.

The workflow is:

1. Copy the appropriate generation prompt from `IMAGE-PROMPTS.md`.
2. Generate the image.
3. Export/download the final JPG.
4. Rename it to the exact filename specified.
5. Put it in the website's `/images/` folder.
6. Deploy the updated website.
7. The page will then load that image.

If the filename/path is wrong, the browser will show a missing image.

### JPG decision

JPG is now the canonical supplied image format for this project, per the current production preference. The image prompts and website references have been updated accordingly.


## v3.6 website wiring

The website HTML has been updated so the documented JPG asset paths are wired into their intended components. In particular, all eight Insight article hero images now point to their documented `/images/article-*.jpg` paths.

If you add the correctly named JPG files to `/images/` and deploy the site, the browser can resolve those paths without any additional HTML changes.
