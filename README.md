# PigmentScope

[Open PigmentScope](https://candidomolino.github.io/pigmentscope/)

Explore color in microfluidic photographs and videos of pigmented biomolecules, with a source-checked library for phycoerythrin, phycocyanin and betalains. Selected files are processed in the browser and are not uploaded.

## Use

1. Open the app and choose a research example or your own image/video.
2. Draw sample and comparable reference rectangles.
3. Adjust the hue range and saturation/brightness limits; inspect the color mask.
4. Measure the image or choose video sampling times, then export CSV or JSON.

The tool measures color-matched area, mean RGB, hue and an empirical reference contrast. It does not identify molecules or determine concentration from uncalibrated published images. Concentration requires matched standards and validation. Grayscale video supports flow/intensity measurements; native pigment hue is unavailable.

## Local development

The static app is in `docs/`. Run `python serve.py` and visit `http://127.0.0.1:8765/`. The optional server supports byte ranges for video seeking.

Run the calculation checks with `node --test tests/core.test.cjs`.

## Research media

See [CREDITS.txt](CREDITS.txt), [PAPERS.txt](PAPERS.txt) and [VALIDATION.txt](VALIDATION.txt). Included supporting media from Seručnik et al. (2020) and Luo et al. (2016) are CC BY-NC 4.0; retain attribution and the noncommercial restriction. The flow WebM preserves all 256 decoded frames from the original AVI and is grayscale.

GitHub Pages publishes `docs/` from the `main` branch.

The bundled video is stored in small parts for transfer through the connected GitHub service. The app joins them into the original WebM bytes and checks their SHA-256 before decoding. Serve the app to use the bundled movie locally.
