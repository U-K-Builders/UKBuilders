import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FILTERS = ['All', 'Ongoing', 'Upcoming', 'Completed'];

const MARKER = {
  ongoing:   { fillColor: '#D4A84E', color: '#fff', fillOpacity: 1,   weight: 2, radius: 11 },
  upcoming:  { fillColor: '#D4A84E', color: '#fff', fillOpacity: 0.45, weight: 1.5, radius: 8 },
  completed: { fillColor: '#8a8070', color: '#fff', fillOpacity: 0.65, weight: 1,  radius: 6 },
};

const LEGEND = [
  { type: 'ongoing',   label: 'Ongoing'   },
  { type: 'upcoming',  label: 'Upcoming'  },
  { type: 'completed', label: 'Completed' },
];

export default function CityProjectsMap({ ongoing, upcoming, completed }) {
  const [filter, setFilter] = useState('All');

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
            className={`px-4 py-2 text-[0.625rem] tracking-[2px] uppercase border transition-all duration-200 bg-transparent cursor-pointer ${
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
      <div className="h-[520px] w-full">
        <MapContainer
          center={[19.182, 72.848]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
            maxZoom={20}
          />
          {visible.map((p, i) => (
            <CircleMarker
              key={`${p.name}-${p.type}-${i}`}
              center={[p.lat, p.lng]}
              radius={MARKER[p.type].radius}
              pathOptions={MARKER[p.type]}
            >
              <Popup>
                <div style={{ fontFamily: 'Georgia, serif', minWidth: '180px', padding: '4px 2px' }}>
                  <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13px', color: '#0A1828', letterSpacing: '1.5px', marginBottom: '4px' }}>
                    {p.name}
                  </div>
                  <div style={{ color: '#D4A84E', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
                    {p.status}
                  </div>
                  {p.location && (
                    <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.5' }}>
                      {p.location}
                    </div>
                  )}
                  {p.description && (
                    <div style={{ fontSize: '11px', color: '#777', lineHeight: '1.6', marginTop: '6px' }}>
                      {p.description.slice(0, 90)}…
                    </div>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-5">
        {LEGEND.map(({ type, label }) => (
          <span key={type} className="flex items-center gap-2 text-[0.625rem] tracking-[1.5px] uppercase text-white/50">
            <span
              className="block w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: MARKER[type].fillColor, opacity: MARKER[type].fillOpacity }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
