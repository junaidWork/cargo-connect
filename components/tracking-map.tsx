"use client";

import { useEffect, useRef } from 'react';

interface Location {
  city: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface TrackingMapProps {
  location: Location;
}

export function TrackingMap({ location }: TrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real application, you would use a mapping library like Leaflet or Google Maps
    // For this demo, we'll create a placeholder with styling to simulate a map
    
    if (mapRef.current) {
      const mapElement = mapRef.current;
      
      // Create a simple visual representation
      mapElement.innerHTML = `
        <div class="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="mb-2 text-muted-foreground">Map visualization would appear here</div>
              <div class="font-medium">Current Location:</div>
              <div>${location.city}, ${location.state}, ${location.country}</div>
              <div class="text-sm text-muted-foreground mt-1">
                Coordinates: ${location.coordinates.lat.toFixed(4)}, ${location.coordinates.lng.toFixed(4)}
              </div>
            </div>
          </div>
          <div class="absolute top-4 right-4 bg-background/90 p-2 rounded shadow-sm text-xs">
            <div class="font-medium">Package Location</div>
            <div>${location.city}, ${location.state}</div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
      `;
    }
  }, [location]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg overflow-hidden"></div>;
}