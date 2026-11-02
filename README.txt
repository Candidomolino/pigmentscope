LIVE APP: https://candidomolino.github.io/pigmentscope/
REPOSITORY: https://github.com/Candidomolino/pigmentscope

PigmentScope — microfluidic pigment color analysis
Version 1.0 — 2 November 2026

START
Open docs/index.html in a modern browser and choose an image or video from your computer.
For built-in examples, serve the folder locally: run Python with serve.py, then visit http://127.0.0.1:8765/.
The included server uses byte ranges so video seeking works.
No selected images or videos are uploaded; measurements run in your browser.

1. Choose an image/video or a research example.
2. Choose a visual starting range: phycoerythrin, phycocyanin, betacyanin or betaxanthin. These are editable color ranges, not molecule identification.
3. Draw sample and comparable reference rectangles on the image. Avoid text, walls, glare and scale bars.
4. Adjust hue and saturation/brightness limits; use Color mask to inspect the selection.
5. Measure the image, or choose video playback interval and sampling step.
6. Export CSV or settings + results (JSON).

INTERPRETATION
Mean RGB includes all nontransparent sample pixels; the color-matched area counts pixels passing the HSV thresholds.
The reference contrast is -log10(sample mean G/reference mean G) from processed RGB. It is an empirical index, not spectrophotometric absorbance.
Published photos do not by themselves give concentration, purity, chemical identity or extraction recovery.
Concentration requires standards acquired with matching geometry, lighting, exposure, white balance and image processing, plus validation.
Grayscale images can support flow/intensity analysis, but pigment hue and color coverage are unavailable.
Video sampling uses fixed rectangles, without droplet tracking or camera-motion correction.
Playback time may differ from acquisition time (for example, accelerated video).
Images larger than 2048 pixels on the longest side are analyzed at a reduced working resolution; both dimensions are exported.
Video samples export both requested and actual playback times, with a guard against failed seeking.

RESEARCH
The Paper library contains seven primary-paper records, distinguishing inspected media, listed attachments and unverified access.
Start with Seručnik 2020 (R-phycoerythrin), Luo 2016 (C-phycocyanin), and Boravelli & Vir 2024 (betalains, media still to obtain).
Stücheli 2020 provides a pigment-specific example of smartphone RGB calibration, in cuvettes rather than microfluidic extraction.
See CREDITS.txt for exact sources and media reuse terms.

FILES
docs/ — browser program and examples
serve.py — optional local preview server, standard Python only
tests/core.test.cjs — mathematical verification of analysis functions
VALIDATION.txt — completed checks and media-verification notes
Supporting PDFs and the original AVI are linked to their original repositories in CREDITS.txt.

The analysis is exploratory. Retain the original images, experimental metadata and calibration data for any quantitative study.
