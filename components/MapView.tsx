'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Postcode } from '@/lib/types';

// Component to handle map resize
function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

interface MapViewProps {
  postcodes: Postcode[];
  postcodeData: Record<string, number>;
  selectedPostcodes: string[];
  onPostcodeClick: (postcode: string) => void;
}

export default function MapView({
  postcodes,
  postcodeData,
  selectedPostcodes,
  onPostcodeClick,
}: MapViewProps) {
  // Filter postcodes to only show those with data
  const postcodesWithData = postcodes.filter((postcode) => {
    return postcodeData[postcode.code] && postcodeData[postcode.code] > 0;
  });

  // Calculate max count for radius scaling
  const postcodeDataValues = Object.values(postcodeData);
  const maxCount = postcodeDataValues.length > 0 ? Math.max(...postcodeDataValues) : 1;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden absolute inset-0">
      <MapContainer
        center={[-25.2744, 133.7751]}
        zoom={4}
        minZoom={3}   
        maxZoom={10}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <MapResizeHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {postcodesWithData.map((postcode) => {
          const count = postcodeData[postcode.code] || 0;
          const isSelected = selectedPostcodes.includes(postcode.code);
          const radius = Math.max(5, (count / maxCount) * 50);

          return (
            <div key={postcode.code}>
              <Circle
                center={[postcode.lat, postcode.lng]}
                radius={radius * 1000} // Convert to meters
                pathOptions={{
                  color: isSelected ? '#2563eb' : '#3b82f6',
                  fillColor: isSelected ? '#2563eb' : '#3b82f6',
                  fillOpacity: 0.4,
                  weight: isSelected ? 3 : 2,
                }}
                eventHandlers={{
                  click: () => onPostcodeClick(postcode.code),
                }}
              />
              <Marker
                position={[postcode.lat, postcode.lng]}
                eventHandlers={{
                  click: () => onPostcodeClick(postcode.code),
                }}
              >
                <Popup>
                  <div className="p-2 dark:bg-gray-800 dark:text-white">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{postcode.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Postcode: {postcode.code}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">State: {postcode.state}</p>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                      Vehicles: {count.toLocaleString()}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}

