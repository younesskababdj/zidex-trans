import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  title?: string;
}

export function GoogleMap({ lat = 33.9716, lng = -6.8498, zoom = 13, title = 'ZIDEX Trans' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = new google.maps.Map(mapRef.current, {
      zoom: zoom,
      center: { lat, lng },
      styles: [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [{ saturation: -100 }, { lightness: 50 }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#e0e0e0' }],
        },
      ],
    });

    // Add marker
    new google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: title,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#FFC107',
        fillOpacity: 1,
        strokeColor: '#1A1A1A',
        strokeWeight: 2,
      },
    });
  }, [lat, lng, zoom, title]);

  return <div ref={mapRef} className="w-full h-96 rounded-lg" />;
}
