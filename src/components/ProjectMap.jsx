// Map of completed projects on the history page. Used by HistoryPage.
import { useState, useCallback } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

export default function ProjectMap({ projects }) {
  const located = projects.filter((p) => p.lat && p.lng);
  const [popupInfo, setPopupInfo] = useState(null);

  const handleLoad = useCallback(({ target: map }) => {
    if (located.length < 2) return;
    const lngs = located.map((p) => p.lng);
    const lats = located.map((p) => p.lat);
    map.fitBounds(
      [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
      { padding: 40, duration: 0 },
    );
  }, [located]);

  return (
    <Map
      initialViewState={{ longitude: 72.848, latitude: 19.18, zoom: 12 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={STYLE}
      scrollZoom={false}
      onLoad={handleLoad}
      onClick={() => setPopupInfo(null)}
    >
      {located.map((project) => (
        <Marker
          key={`${project.name}-${project.year}`}
          longitude={project.lng}
          latitude={project.lat}
          anchor="center"
          onClick={(e) => { e.originalEvent.stopPropagation(); setPopupInfo(project); }}
        >
          <div
            style={{
              width: 14, height: 14, borderRadius: '50%',
              backgroundColor: '#C5A059', border: '1.5px solid #0B1D3A',
              cursor: 'pointer', opacity: 0.9,
            }}
          />
        </Marker>
      ))}

      {popupInfo && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
          closeOnClick={false}
          offset={10}
        >
          <div style={{ fontFamily: 'Georgia, serif', minWidth: '140px' }}>
            <p style={{ color: '#0B1D3A', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13px', margin: '0 0 2px' }}>
              {popupInfo.name}
            </p>
            <p style={{ color: '#C5A059', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
              {popupInfo.year} &middot; {popupInfo.builder}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
