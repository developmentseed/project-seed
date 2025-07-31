import React, { useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapComponent() {
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1
  });

  const sampleData = [
    { id: 1, latitude: 0, longitude: 0, title: 'Null Island' }
  ];

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Map
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        mapStyle='https://demotiles.maplibre.org/style.json'
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position='top-right' />

        {sampleData.map((point) => (
          <Marker
            key={point.id}
            latitude={point.latitude}
            longitude={point.longitude}
          >
            <div
              style={{
                background: '#3b82f6',
                borderRadius: '50%',
                width: 12,
                height: 12
              }}
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
