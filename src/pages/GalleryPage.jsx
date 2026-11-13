// Photo gallery (/gallery) of project photos with a lightbox.
import { useState } from 'react';
import Lightbox from '../components/Lightbox';

const TABS = ['Building Exterior', 'Construction', 'Neighbourhood', 'Events'];

const BUILDING_PHOTOS = [
  { src: '/images/buildings/justin-night-view.jpg', caption: 'Justin — Ongoing', tag: 'Ongoing' },
  { src: '/images/buildings/christina-night-view.jpg', caption: 'Christina — Ongoing', tag: 'Ongoing' },
  { src: '/images/buildings/silver-coin.jpg', caption: 'Silver Coin — 2024', tag: 'Completed' },
  { src: '/images/buildings/la-serena.jpg', caption: 'La Serena — 2022', tag: 'Completed' },
  { src: '/images/buildings/aurola-muriel-villa.jpg', caption: 'Aurola-Muriel Villa — 2016', tag: 'Completed' },
  { src: '/images/buildings/cinderella.jpg', caption: 'Cinderella — 2013', tag: 'Completed' },
  { src: '/images/buildings/little-sunflower.jpg', caption: 'Little Sunflower — 2010', tag: 'Completed' },
];

function PhotoCard({ photo, onClick }) {
  return (
    <div
      className="group relative overflow-hidden cursor-zoom-in border border-border-light bg-surface-light"
      onClick={() => onClick(photo)}
    >
      <img loading="lazy" decoding="async"
        src={photo.src}
        alt={photo.caption}
        className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white text-white text-xs uppercase tracking-[3px] px-4 py-2">
          View
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs uppercase tracking-[2px]">{photo.caption}</p>
      </div>
    </div>
  );
}

function ComingSoon({ label }) {
  return (
    <div className="py-32 text-center border border-dashed border-border-light bg-surface-light">
      <div className="w-16 h-16 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-6">
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-gold/50" aria-hidden="true">
          <path d="M4 16l4-4 4 4 4-8 4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <p className="text-text-muted text-sm uppercase tracking-[3px] mb-2">{label} Photos</p>
      <p className="text-text-muted text-xs">Coming soon — check back for updates.</p>
    </div>
  );
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
        <h1 className="text-center text-3xl md:text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
          Gallery
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h1>
        <p className="text-text-tertiary max-w-[600px] mx-auto">
          Five decades of landmark residences — captured across Orlem, Malad West and beyond.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-light bg-white sticky top-[72px] z-30">
        <div className="max-w-[1200px] mx-auto flex overflow-x-auto">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`shrink-0 px-8 py-5 text-[0.75rem] uppercase tracking-[2px] border-b-2 transition-all duration-300 bg-transparent cursor-pointer ${
                activeTab === i
                  ? 'border-gold text-gold font-bold'
                  : 'border-transparent text-text-muted hover:text-navy hover:border-navy/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="py-12 md:py-16 px-5">
        <div className="max-w-[1200px] mx-auto">
          {activeTab === 0 && (
            <>
              <p className="text-text-muted text-xs uppercase tracking-[2px] mb-8">
                {BUILDING_PHOTOS.length} photos
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BUILDING_PHOTOS.map((photo) => (
                  <PhotoCard key={photo.src} photo={photo} onClick={setLightbox} />
                ))}
              </div>
            </>
          )}
          {activeTab === 1 && <ComingSoon label="Construction" />}
          {activeTab === 2 && <ComingSoon label="Neighbourhood" />}
          {activeTab === 3 && <ComingSoon label="Events" />}
        </div>
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.caption} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
