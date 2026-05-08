import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const popupStyle = { fontFamily: 'Georgia, serif', fontSize: '12px', color: '#0B1D3A', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' };
const subStyle = { fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', color: '#666', fontWeight: 'normal', textTransform: 'none', letterSpacing: 0, marginTop: '2px' };

function FitBounds({ lat, lng, schools, hospitals }) {
  const map = useMap();
  useEffect(() => {
    const all = [[lat, lng], ...schools.map((s) => [s.lat, s.lng]), ...hospitals.map((h) => [h.lat, h.lng])];
    map.fitBounds(all, { padding: [40, 40] });
  }, [map, lat, lng, schools, hospitals]);
  return null;
}

export default function NeighbourhoodMap({ name, lat, lng, neighbourhood }) {
  const { schools, hospitals } = neighbourhood;

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
      <FitBounds lat={lat} lng={lng} schools={schools} hospitals={hospitals} />

      {/* Project */}
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

      {/* Schools */}
      {schools.map((s) => (
        <CircleMarker
          key={s.name}
          center={[s.lat, s.lng]}
          radius={8}
          pathOptions={{ fillColor: '#3B82F6', fillOpacity: 0.9, color: '#1D4ED8', weight: 2 }}
        >
          <Popup>
            <span style={popupStyle}>{s.name}</span>
            <div style={subStyle}>{s.distance} from project</div>
          </Popup>
        </CircleMarker>
      ))}

      {/* Hospitals */}
      {hospitals.map((h) => (
        <CircleMarker
          key={h.name}
          center={[h.lat, h.lng]}
          radius={8}
          pathOptions={{ fillColor: '#EF4444', fillOpacity: 0.9, color: '#B91C1C', weight: 2 }}
        >
          <Popup>
            <span style={popupStyle}>{h.name}</span>
            <div style={subStyle}>{h.distance} from project</div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
