import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CATEGORIES = [
  { key: 'schools',   fill: '#3B82F6', stroke: '#1D4ED8', label: 'School'    },
  { key: 'hospitals', fill: '#EF4444', stroke: '#B91C1C', label: 'Hospital'  },
  { key: 'religious', fill: '#8B5CF6', stroke: '#6D28D9', label: 'Religious' },
  { key: 'landmarks', fill: '#F59E0B', stroke: '#B45309', label: 'Landmark'  },
];

const popupStyle = { fontFamily: 'Georgia, serif', fontSize: '12px', color: '#0B1D3A', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' };
const subStyle   = { fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', color: '#666', fontWeight: 'normal', textTransform: 'none', letterSpacing: 0, marginTop: '2px' };

function FitBounds({ lat, lng, neighbourhood }) {
  const map = useMap();
  useEffect(() => {
    const all = [[lat, lng], ...CATEGORIES.flatMap(({ key }) => (neighbourhood[key] || []).map((p) => [p.lat, p.lng]))];
    map.fitBounds(all, { padding: [40, 40] });
  }, [map, lat, lng, neighbourhood]);
  return null;
}

export default function NeighbourhoodMap({ name, lat, lng, neighbourhood }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      <FitBounds lat={lat} lng={lng} neighbourhood={neighbourhood} />

      {/* Project pin */}
      <CircleMarker
        center={[lat, lng]}
        radius={12}
        pathOptions={{ fillColor: '#C5A059', fillOpacity: 1, color: '#0B1D3A', weight: 2 }}
      >
        <Popup>
          <span style={popupStyle}>{name}</span>
          <div style={{ ...subStyle, color: '#C5A059' }}>U.K. Builders</div>
        </Popup>
      </CircleMarker>

      {/* POI pins */}
      {CATEGORIES.map(({ key, fill, stroke, label }) =>
        (neighbourhood[key] || []).map((poi) => (
          <CircleMarker
            key={poi.name}
            center={[poi.lat, poi.lng]}
            radius={8}
            pathOptions={{ fillColor: fill, fillOpacity: 0.9, color: stroke, weight: 2 }}
          >
            <Popup>
              <span style={popupStyle}>{poi.name}</span>
              <div style={subStyle}>{label} · {poi.distance} from project</div>
            </Popup>
          </CircleMarker>
        ))
      )}
    </MapContainer>
  );
}
