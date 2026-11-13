// Map of schools, hospitals, places of worship and landmarks around a
// project. Used by ProjectDetailPage (Neighbourhood Guide).
import { useState, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const CATEGORIES = [
  { key: 'schools',   fill: '#3B82F6', label: 'School'    },
  { key: 'hospitals', fill: '#EF4444', label: 'Hospital'  },
  { key: 'religious', fill: '#8B5CF6', label: 'Religious' },
  { key: 'landmarks', fill: '#F59E0B', label: 'Landmark'  },
];

export default function NeighbourhoodMap({ name, lat, lng, neighbourhood }) {
  const [popupInfo, setPopupInfo] = useState(null);

  const handleLoad = useCallback(({ target: map }) => {
    const allPoints = [
      [lng, lat],
      ...CATEGORIES.flatMap(({ key }) => (neighbourhood[key] || []).map((p) => [p.lng, p.lat])),
    ];
    if (allPoints.length < 2) return;
    const lngs = allPoints.map((p) => p[0]);
    const lats = allPoints.map((p) => p[1]);
    map.fitBounds(
      [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
      { padding: 50, duration: 0 },
    );
  }, [lat, lng, neighbourhood]);

  return (
    <Map
      initialViewState={{ longitude: lng, latitude: lat, zoom: 14 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={STYLE}
      scrollZoom={false}
      onLoad={handleLoad}
      onClick={() => setPopupInfo(null)}
    >
      <NavigationControl position="top-right" />
      {/* Project marker */}
      <Marker
        longitude={lng}
        latitude={lat}
        anchor="center"
        onClick={(e) => { e.originalEvent.stopPropagation(); setPopupInfo({ name, lat, lng, isProject: true }); }}
      >
        <div
          style={{
            width: 24, height: 24, borderRadius: '50%',
            backgroundColor: '#C5A059', border: '2px solid #0B1D3A',
            cursor: 'pointer',
            boxShadow: '0 0 0 5px rgba(197,160,89,0.2)',
          }}
        />
      </Marker>

      {/* POI markers */}
      {CATEGORIES.map(({ key, fill, label }) =>
        (neighbourhood[key] || []).map((poi) => (
          <Marker
            key={poi.name}
            longitude={poi.lng}
            latitude={poi.lat}
            anchor="center"
            onClick={(e) => { e.originalEvent.stopPropagation(); setPopupInfo({ ...poi, label, isProject: false }); }}
          >
            <div
              style={{
                width: 16, height: 16, borderRadius: '50%',
                backgroundColor: fill, border: '1.5px solid rgba(255,255,255,0.9)',
                cursor: 'pointer', opacity: 0.9,
              }}
            />
          </Marker>
        ))
      )}

      {popupInfo && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
          closeOnClick={false}
          offset={14}
        >
          <div style={{ fontFamily: 'Georgia, serif' }}>
            <p style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '12px', color: '#0B1D3A', letterSpacing: '0.5px', margin: '0 0 2px' }}>
              {popupInfo.name}
            </p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', color: '#666', margin: 0 }}>
              {popupInfo.isProject
                ? <span style={{ color: '#C5A059' }}>U.K. Builders</span>
                : `${popupInfo.label} · ${popupInfo.distance} from project`}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
