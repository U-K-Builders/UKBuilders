// Full-screen photo viewer (click or Escape to close). Used by
// ProjectDetailPage, CompletedProjectsPage and GalleryPage.
import { useEffect } from 'react';

export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl leading-none transition-colors duration-200"
        aria-label="Close"
      >
        &times;
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain shadow-[0_0_60px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      />
      {alt && (
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-[2px]">
          {alt}
        </p>
      )}
    </div>
  );
}
