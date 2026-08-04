/**
 * Derives the site's logo assets from the master VRAZEAL_logo.png.
 * Run with: node scripts/crop-logo.mjs
 *
 * Outputs are transparent-background with pure black glyphs, so they can be
 * inverted with CSS `filter: invert(1)` on the dark sections.
 *   public/logo-lockup.png   - wordmark + "creative & technology agency" tagline
 *   public/logo-wordmark.png - wordmark only (navigation, footer)
 *   public/logo-mark.png     - the "V" monogram
 *   src/app/icon.png         - Next.js file-based favicon
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'VRAZEAL_logo.png';

/** White-paper scan -> black glyphs on a transparent background. */
async function toTransparent(buffer) {
  const { data, info } = await sharp(buffer)
    .flatten({ background: '#ffffff' })
    .greyscale()
    .negate() // ink -> opaque, paper -> transparent
    .raw()
    .toBuffer({ resolveWithObject: true });

  return sharp({
    create: {
      width: info.width,
      height: info.height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 },
    },
  })
    .joinChannel(data, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();
}

async function main() {
  await mkdir('public', { recursive: true });

  const { data: lockup, info } = await sharp(SRC)
    .flatten({ background: '#ffffff' })
    .trim({ threshold: 12 })
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  // The tagline sits in the bottom ~30% of the trimmed lockup.
  const wordmark = await sharp(lockup)
    .extract({ left: 0, top: 0, width, height: Math.round(height * 0.7) })
    .trim({ threshold: 12 })
    .toBuffer();

  const wordmarkMeta = await sharp(wordmark).metadata();
  // The "V" occupies roughly the first 14% of the wordmark's width.
  const monogram = await sharp(wordmark)
    .extract({
      left: 0,
      top: 0,
      width: Math.round(wordmarkMeta.width * 0.14),
      height: wordmarkMeta.height,
    })
    .trim({ threshold: 12 })
    .toBuffer();

  await sharp(await toTransparent(lockup)).resize({ width: 1600 }).png().toFile('public/logo-lockup.png');
  await sharp(await toTransparent(wordmark)).resize({ width: 1200 }).png().toFile('public/logo-wordmark.png');

  const markInk = await toTransparent(monogram);
  const markMeta = await sharp(markInk).metadata();
  const square = Math.round(Math.max(markMeta.width, markMeta.height) * 1.44);

  const mark = await sharp({
    create: { width: square, height: square, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: markInk, gravity: 'center' }])
    .png()
    .toBuffer();

  await sharp(mark).resize(512, 512).png().toFile('public/logo-mark.png');

  // Favicon: white monogram on a black rounded square.
  const size = 256;
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(
      size * 0.22,
    )}" fill="#000"/></svg>`,
  );
  const glyph = await sharp(markInk)
    .resize(Math.round(size * 0.5), Math.round(size * 0.5), {
      fit: 'inside',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .negate({ alpha: false }) // black ink -> white ink, alpha preserved
    .png()
    .toBuffer();

  await mkdir('src/app', { recursive: true });
  const icon = sharp(bg).composite([{ input: glyph, gravity: 'center' }]).png();
  await icon.clone().resize(256, 256).toFile('src/app/icon.png');
  await icon.clone().resize(180, 180).toFile('src/app/apple-icon.png');

  console.log('logo assets written');
}

main();
