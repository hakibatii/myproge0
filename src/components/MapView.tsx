import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Popular locations in Morocco
const MOROCCO_LOCATIONS = [
  {
    id: 1,
    title: 'Marrakech',
    description: 'The Red City',
    position: {
      lat: 31.6295,
      lng: -7.9811,
    },
  },
  {
    id: 2,
    title: 'Casablanca',
    description: 'The White City',
    position: {
      lat: 33.5731,
      lng: -7.5898,
    },
  },
  {
    id: 3,
    title: 'Fes',
    description: 'The Cultural Capital',
    position: {
      lat: 34.0181,
      lng: -5.0078,
    },
  },
  {
    id: 4,
    title: 'Tangier',
    description: 'The Gateway to Africa',
    position: {
      lat: 35.7595,
      lng: -5.8330,
    },
  },
  {
    id: 5,
    title: 'Chefchaouen',
    description: 'The Blue City',
    position: {
      lat: 35.1714,
      lng: -5.2697,
    },
  },
];

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 31.7917,
  lng: -7.0926
};

const MoroccoMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
      >
        {MOROCCO_LOCATIONS.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            onClick={() => setSelectedLocation(location)}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h3>{selectedLocation.title}</h3>
              <p>{selectedLocation.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MoroccoMap; 