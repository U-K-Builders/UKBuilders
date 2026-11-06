import { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const FILTERS = ['All', 'Ongoing', 'Upcoming', 'Completed'];

const STYLE = {
  ongoing:   { bg: '#D4A84E', size: 16, glow: true,  opacity: 1    },
  upcoming:  { bg: '#3B82F6', size: 12, glow: false, opacity: 0.85 },
  completed: { bg: '#22C55E', size: 9,  glow: false, opacity: 0.75 },
};

const LEGEND = [
  { type: 'ongoing',   label: 'Ongoing'   },
  { type: 'upcoming',  label: 'Upcoming'  },
  { type: 'completed', label: 'Completed' },
];

export default function CityProjectsMap({ ongoing, upcoming, completed }) {
  const [filter, setFilter]     = useState('All');
  const [popupInfo, setPopupInfo] = useState(null);

  const all = [
    ...ongoing.map(p => ({ ...p, type: 'ongoing',   status: 'Ongoing'   })),
    ...upcoming.map(p => ({ ...p, type: 'upcoming',  status: 'Upcoming'  })),
    ...completed.map(p => ({ ...p, type: 'completed', status: `${p.year} · Completed` })),
  ].filter(p => p.lat && p.lng);

  const visible = filter === 'All' ? all : all.filter(p => p.type === filter.toLowerCase());

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs tracking-[2px] uppercase border transition-all duration-200 bg-transparent cursor-pointer ${
              filter === f
                ? 'border-gold text-gold bg-gold/10'
                : 'border-white/20 text-white/50 hover:border-gold/40 hover:text-white/80'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="h-[520px] w-full overflow-hidden">
        <Map
          initialViewState={{ longitude: 72.848, latitude: 19.182, zoom: 13 }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          scrollZoom={false}
          onClick={() => setPopupInfo(null)}
        >
          <NavigationControl position="top-right" />

          {visible.map((p, i) => {
            const s = STYLE[p.type];
            return (
              <Marker
                key={`${p.name}-${p.type}-${i}`}
                longitude={p.lng}
                latitude={p.lat}
                anchor="center"
                onClick={e => { e.originalEvent.stopPropagation(); setPopupInfo(p); }}
              >
                <div
                  style={{
                    width:           s.size,
                    height:          s.size,
                    borderRadius:    '50%',
                    backgroundColor: s.bg,
                    opacity:         s.opacity,
                    border:          '1.5px solid rgba(255,255,255,0.5)',
                    cursor:          'pointer',
                    boxShadow:       s.glow ? '0 0 8px 3px rgba(212,168,78,0.5)' : 'none',
                  }}
                />
              </Marker>
            );
          })}

          {popupInfo && (
            <Popup
              longitude={popupInfo.lng}
              latitude={popupInfo.lat}
              anchor="bottom"
              onClose={() => setPopupInfo(null)}
              closeOnClick={false}
              offset={12}
            >
              <div style={{ fontFamily: 'Georgia, serif', minWidth: '180px', padding: '4px 2px' }}>
                <p style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13px', color: '#0A1828', letterSpacing: '1.5px', margin: '0 0 4px' }}>
                  {popupInfo.name}
                </p>
                <p style={{ color: '#D4A84E', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 6px' }}>
                  {popupInfo.status}
                </p>
                {popupInfo.location && (
                  <p style={{ fontSize: '11px', color: '#666', lineHeight: '1.5', margin: 0 }}>
                    {popupInfo.location}
                  </p>
                )}
                {popupInfo.description && (
                  <p style={{ fontSize: '11px', color: '#777', lineHeight: '1.6', margin: '6px 0 0' }}>
                    {popupInfo.description.slice(0, 90)}…
                  </p>
                )}
              </div>
            </Popup>
          )}
        </Map>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-5">
        {LEGEND.map(({ type, label }) => (
          <span key={type} className="flex items-center gap-2 text-xs tracking-[1.5px] uppercase text-white/50">
            <span
              className="block w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: STYLE[type].bg, opacity: STYLE[type].opacity }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
