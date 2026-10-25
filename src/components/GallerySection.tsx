import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, ExternalLink } from 'lucide-react';

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (photos.length === 0) return;
    setActiveIndex((current) => {
      if (current === null) return 0;
      return (current - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  const handleNext = useCallback(() => {
    if (photos.length === 0) return;
    setActiveIndex((current) => {
      if (current === null) return 0;
      return (current + 1) % photos.length;
    });
  }, [photos.length]);

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while lightbox is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, handleClose, handlePrev, handleNext]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handlePrev(); // Swipe right -> Previous
      } else {
        handleNext(); // Swipe left -> Next
      }
    }
    setTouchStartX(null);
  };

  const activePhoto = activeIndex !== null && photos[activeIndex] ? photos[activeIndex] : null;
  const activePhotoUrl = activePhoto
    ? `${import.meta.env.BASE_URL}gallery/${encodeRelativePath(activePhoto.src)}`
    : '';

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#F4F0E6] text-[#142A21] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-sm uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">Moments</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-4">Photo Gallery</h2>
          <p className="text-base sm:text-base text-[#142A21]/80 font-light leading-relaxed">
            Photographs from the Katin-awan sanctuary. Click any photo to view in full resolution.
          </p>
        </div>

        {loadError ? (
          <p className="text-center text-base text-[#7a8c6f]" role="status">The photo gallery could not be loaded.</p>
        ) : photos.length === 0 ? (
          <p className="text-center text-base text-[#7a8c6f]" role="status">Loading gallery…</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {photos.map((photo, index) => {
              const photoUrl = `${import.meta.env.BASE_URL}gallery/${encodeRelativePath(photo.src)}`;
              return (
                <button
                  type="button"
                  key={photo.src}
                  onClick={() => setActiveIndex(index)}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#B8C7AE]/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C4A46A] cursor-pointer text-left"
                  aria-label={`Open photo ${index + 1}: ${photo.alt || 'Katin-awan ceremony photo'}`}
                >
                  <img
                    src={photoUrl}
                    alt={photo.alt || `Katin-awan gallery photograph ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay with expand icon */}
                  <div className="absolute inset-0 bg-[#142A21]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-[#142A21]/80 text-[#C4A46A] border border-[#C4A46A]/40 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {activePhoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full size photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1c16]/95 backdrop-blur-md p-2 sm:p-6"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Counter, Full Res Link, Close Button */}
          <div
            className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-10 bg-gradient-to-b from-[#0d1c16]/90 to-transparent pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#142A21]/80 border border-[#C4A46A]/30 text-xs sm:text-sm font-mono text-[#C4A46A]">
              <span>{activeIndex + 1}</span>
              <span className="text-[#B8C7AE]/60">/</span>
              <span>{photos.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activePhotoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#142A21]/80 hover:bg-[#1b382c] text-[#F4F0E6] hover:text-[#C4A46A] border border-[#C4A46A]/20 transition-colors"
                title="Open original image in new tab"
                aria-label="Open original image in new tab"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="p-2.5 rounded-full bg-[#142A21]/80 hover:bg-[#1b382c] text-[#F4F0E6] hover:text-[#C4A46A] border border-[#C4A46A]/20 transition-colors cursor-pointer"
                aria-label="Close photo viewer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Prev Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-[#142A21]/80 hover:bg-[#1b382c] text-[#F4F0E6] hover:text-[#C4A46A] border border-[#C4A46A]/30 transition-all z-10 shadow-lg cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-full max-h-[85vh] flex items-center justify-center p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhotoUrl}
              alt={activePhoto.alt || `Katin-awan photograph ${activeIndex + 1}`}
              className="max-h-[80vh] sm:max-h-[85vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-lg shadow-2xl border border-[#C4A46A]/20 select-none animate-fadeIn"
            />
          </div>

          {/* Navigation Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-[#142A21]/80 hover:bg-[#1b382c] text-[#F4F0E6] hover:text-[#C4A46A] border border-[#C4A46A]/30 transition-all z-10 shadow-lg cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Bottom Caption */}
          {activePhoto.alt && (
            <div
              className="absolute bottom-4 left-0 right-0 text-center px-4 z-10 pointer-events-none"
            >
              <span className="inline-block px-4 py-2 rounded-lg bg-[#0d1c16]/80 text-[#F4F0E6]/90 text-sm sm:text-base border border-[#C4A46A]/20 backdrop-blur-sm max-w-xl truncate">
                {activePhoto.alt}
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
