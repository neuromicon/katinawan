import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const galleryDirectory = path.resolve(scriptDirectory, '../public/gallery');
const manifestPath = path.join(galleryDirectory, 'manifest.json');
const supportedImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

async function collectImages(directory, parent = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const relativePath = parent ? `${parent}/${entry.name}` : entry.name;
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) return collectImages(absolutePath, relativePath);
    if (supportedImageExtensions.has(path.extname(entry.name).toLowerCase())) return [relativePath];
    return [];
  }));
  return nested.flat();
}

const imagePaths = (await collectImages(galleryDirectory)).sort((a, b) => a.localeCompare(b));
const manifest = imagePaths.map((src, index) => ({
  src,
  alt: `Katin-awan gallery photograph ${index + 1}`
}));

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated gallery manifest for ${manifest.length} photos.`);
