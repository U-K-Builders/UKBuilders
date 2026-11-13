// Small map with one pin for a project's location. Used by ProjectDetailPage
// (Location).
import { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

export default function ProjectLocationMap({ name, lat, lng }) {
  const [open, setOpen] = useState(false);

  return (
    <Map
      initialViewState={{ longitude: lng, latitude: lat, zoom: 16 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={STYLE}
      scrollZoom={false}
    >
      <NavigationControl position="top-right" />
      <Marker
        longitude={lng}
        latitude={lat}
        anchor="center"
        onClick={() => setOpen(true)}
      >
        <div
          style={{
            width: 20, height: 20, borderRadius: '50%',
            backgroundColor: '#C5A059', border: '2px solid #0B1D3A',
            cursor: 'pointer',
            boxShadow: '0 0 0 4px rgba(197,160,89,0.25)',
          }}
        />
      </Marker>

      {open && (
        <Popup
          longitude={lng}
          latitude={lat}
          anchor="bottom"
          onClose={() => setOpen(false)}
          offset={14}
        >
          <span style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', color: '#0B1D3A', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>
            {name}
          </span>
        </Popup>
      )}
    </Map>
  );
}
