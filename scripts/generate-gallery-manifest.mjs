import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const galleryDirectory = path.resolve(scriptDirectory, '../public/gallery');
const manifestPath = path.join(galleryDirectory, 'manifest.json');
const supportedImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

<<<<<<< HEAD
const entries = await readdir(galleryDirectory, { withFileTypes: true });
const imageFiles = entries
  .filter((entry) => entry.isFile() && supportedImageExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

const manifest = imageFiles.map((src, index) => ({
=======
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
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
  src,
  alt: `Katin-awan gallery photograph ${index + 1}`
}));

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated gallery manifest for ${manifest.length} photos.`);
