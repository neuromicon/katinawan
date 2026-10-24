import React, { useEffect, useState } from 'react';

interface GalleryPhoto {
  src: string;
  alt: string;
}

function encodeRelativePath(path: string): string {
  return path.split('/').map((part) => encodeURIComponent(part)).join('/');
}

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}gallery/manifest.json`, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error(`Gallery manifest request failed (${response.status}).`);
        return response.json() as Promise<GalleryPhoto[]>;
      })
      .then((manifest) => {
        if (!Array.isArray(manifest)) throw new Error('Gallery manifest is invalid.');
        if (!cancelled) setPhotos(manifest.filter((item) => typeof item?.src === 'string' && typeof item?.alt === 'string'));
      })
      .catch((error) => {
        console.error('Unable to load gallery manifest.', error);
        if (!cancelled) setLoadError(true);
      });

    return () => { cancelled = true; };
  }, []);

  return (
<<<<<<< HEAD
    <section id="gallery" className="py-16 sm:py-20 bg-[#F4F0E6] text-[#142A21] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-sm uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">Moments</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-4">Photo Gallery</h2>
          <p className="text-base sm:text-base text-[#142A21]/80 font-light leading-relaxed">Photographs from the Katin-awan community gallery.</p>
        </div>

        {loadError ? (
          <p className="text-center text-base text-[#7a8c6f]" role="status">The photo gallery could not be loaded.</p>
        ) : photos.length === 0 ? (
          <p className="text-center text-base text-[#7a8c6f]" role="status">Loading gallery…</p>
=======
    <section id="gallery" className="py-16 sm:py-20 bg-[#F4F0E6] text-[#142A21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">Moments</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-4">Photo Gallery</h2>
          <p className="text-sm text-[#142A21]/75 font-light leading-relaxed">Photographs from the Katin-awan community gallery.</p>
        </div>

        {loadError ? (
          <p className="text-center text-sm text-[#7a8c6f]" role="status">The photo gallery could not be loaded.</p>
        ) : photos.length === 0 ? (
          <p className="text-center text-sm text-[#7a8c6f]" role="status">Loading gallery…</p>
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {photos.map((photo, index) => (
              <figure key={photo.src} className="aspect-[4/3] overflow-hidden rounded-xl bg-[#B8C7AE]/30 shadow-sm">
                <img
                  src={`${import.meta.env.BASE_URL}gallery/${encodeRelativePath(photo.src)}`}
                  alt={photo.alt || `Katin-awan gallery photograph ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
