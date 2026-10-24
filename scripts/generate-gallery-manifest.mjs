import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const galleryDirectory = path.resolve(scriptDirectory, '../public/gallery');
const manifestPath = path.join(galleryDirectory, 'manifest.json');
const supportedImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const entries = await readdir(galleryDirectory, { withFileTypes: true });
const imageFiles = entries
  .filter((entry) => entry.isFile() && supportedImageExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

const manifest = imageFiles.map((src, index) => ({
  src,
  alt: `Katin-awan gallery photograph ${index + 1}`
}));

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated gallery manifest for ${manifest.length} photos.`);
