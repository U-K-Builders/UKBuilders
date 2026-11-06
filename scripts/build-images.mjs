// Builds the website's images from the originals in photos/.
//
//   photos/buildings/justin-night-view.jpg  →  public/images/buildings/justin-night-view.jpg
//
// photos/ is the only place photos are kept. public/images/ is generated
// (and git-ignored), so never edit it by hand. Runs automatically before
// `npm run dev` and `npm run build`; run it yourself with `npm run images`.

import { mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'photos');
const OUT = path.join(ROOT, 'public', 'images');

// Largest web size; originals stay full resolution in photos/.
const MAX_W = 1600;
const MAX_H = 2000;
const LOGO_SIZE = 256;

// Social share image (WhatsApp, Facebook, LinkedIn): 1200 × 630.
const SHARE = { from: 'buildings/justin-night-view.jpg', to: 'og-image.jpg', top: 0.3 };

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) yield full;
  }
}

async function build() {
  await rm(OUT, { recursive: true, force: true });
  let count = 0;

  for await (const file of walk(SRC)) {
    const rel = path.relative(SRC, file);
    const out = path.join(OUT, rel);
    await mkdir(path.dirname(out), { recursive: true });

    const isLogo = rel.startsWith(`logo${path.sep}`);
    const img = sharp(file).rotate(); // apply EXIF orientation; metadata is dropped on output
    if (isLogo) {
      await img.resize(LOGO_SIZE, LOGO_SIZE, { fit: 'inside', withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(out);
    } else if (/\.png$/i.test(file)) {
      await img.resize(MAX_W, MAX_H, { fit: 'inside', withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(out);
    } else {
      await img.resize(MAX_W, MAX_H, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(out);
    }
    count += 1;
  }

  const src = path.join(SRC, SHARE.from);
  const { width, height } = await sharp(src).metadata();
  const scale = 1200 / width;
  const scaledH = Math.round(height * scale);
  await sharp(src)
    .rotate()
    .resize(1200, scaledH)
    .extract({ left: 0, top: Math.round((scaledH - 630) * SHARE.top), width: 1200, height: 630 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, SHARE.to));

  console.log(`images: ${count} web images + share image → public/images/`);
}

await stat(SRC).catch(() => { throw new Error('photos/ folder not found'); });
await build();
