'use client';

import dynamic from 'next/dynamic';
import { Postcode } from '@/lib/types';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-gray-600">Loading map...</div>
    </div>
  ),
});

interface MapViewWrapperProps {
  postcodes: Postcode[];
  postcodeData: Record<string, number>;
  selectedPostcodes: string[];
  onPostcodeClick: (postcode: string) => void;
}

export default function MapViewWrapper(props: MapViewWrapperProps) {
  return <MapView {...props} />;
}

