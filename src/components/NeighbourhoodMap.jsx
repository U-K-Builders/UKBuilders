import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CATEGORIES = [
  { key: 'schools',   label: 'School'    },
  { key: 'hospitals', label: 'Hospital'  },
  { key: 'religious', label: 'Religious' },
  { key: 'landmarks', label: 'Landmark'  },
];

const popupStyle = { fontFamily: 'Georgia, serif', fontSize: '12px', color: '#0B1D3A', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' };
const subStyle   = { fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', color: '#666', fontWeight: 'normal', textTransform: 'none', letterSpacing: 0, marginTop: '2px' };

function makeIcon(emoji, size = 22) {
  return L.divIcon({
    html: `<div style="font-size:${size}px;line-height:1;text-align:center;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.4));">${emoji}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
}

const PROJECT_ICON = L.divIcon({
  html: `<div style="width:28px;height:28px;background:#C5A059;border:2.5px solid #0B1D3A;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 6px rgba(0,0,0,0.35);">🏠</div>`,
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -18],
});

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
      <Marker position={[lat, lng]} icon={PROJECT_ICON}>
        <Popup>
          <span style={popupStyle}>{name}</span>
          <div style={{ ...subStyle, color: '#C5A059' }}>U.K. Builders</div>
        </Popup>
      </Marker>

      {/* POI pins */}
      {CATEGORIES.map(({ key, label }) =>
        (neighbourhood[key] || []).map((poi) => (
          <Marker
            key={poi.name}
            position={[poi.lat, poi.lng]}
            icon={makeIcon(poi.icon)}
          >
            <Popup>
              <span style={popupStyle}>{poi.name}</span>
              <div style={subStyle}>{label} · {poi.distance} from project</div>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
}
