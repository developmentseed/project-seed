import React, { useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function MapComponent() {
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1
  });

  const sampleData = [
    { id: 1, latitude: 0, longitude: 0, title: 'Null Island' }
  ];

  if (!MAPBOX_TOKEN) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p>Please set VITE_MAPBOX_ACCESS_TOKEN in your .env file</p>
          <p>
            Get your token at{' '}
            <a
              href='https://account.mapbox.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Mapbox
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Map
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={MAPBOX_TOKEN}
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
