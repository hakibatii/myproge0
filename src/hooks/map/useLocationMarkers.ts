
import { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapRefs, UserLocation } from './types';
import { Location } from '@/types/map';
import { useToast } from "@/components/ui/use-toast";

interface UseLocationMarkersProps {
  mapRefs: MapRefs;
}

export const useLocationMarkers = ({ mapRefs }: UseLocationMarkersProps) => {
  const { toast } = useToast();
  const { mapInstanceRef, markersRef } = mapRefs;
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Add location markers to map
  const addLocationMarkers = (locations: Location[]) => {
    if (!mapInstanceRef.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Add new markers
    locations.forEach(location => {
      // Different colors for different types
      let color = "#3b82f6"; // Default blue
      if (location.type === 'attraction') color = "#8b5cf6"; // Purple 
      if (location.type === 'tour') color = "#f59e0b"; // Amber
      
      const marker = new mapboxgl.Marker({ color })
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div dir="rtl">
                <h3 style="font-weight: bold; margin-bottom: 5px;">${location.name}</h3>
                <p>${location.type === 'city' ? 'مدينة' : location.type === 'attraction' ? 'معلم سياحي' : 'جولة سياحية'}</p>
                <p>${location.distanceKm} كم من موقعك</p>
                <button 
                  style="background: #0ea5e9; color: white; padding: 5px 8px; border-radius: 4px; margin-top: 5px; width: 100%;"
                  onclick="window.selectLocation('${location.id}')"
                >
                  عرض التفاصيل
                </button>
              </div>
            `)
        )
        .addTo(mapInstanceRef.current);
        
      markersRef.current.push(marker);
    });
    
    // Add global function for popup buttons
    (window as any).selectLocation = (locationId: string) => {
      const location = locations.find(loc => loc.id === locationId);
      if (location) {
        setSelectedLocation(location);
        
        toast({
          title: location.name,
          description: `تم اختيار ${location.name}. على بعد ${location.distanceKm} كم من موقعك`
        });
      }
    };
  };

  // Handle location selection
  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter([location.lng, location.lat]);
      mapInstanceRef.current.setZoom(15);
    }
  };

  // Add user marker on map
  const addUserMarker = (userLocation: UserLocation) => {
    if (!mapInstanceRef.current) return;

    // Center map on user location
    mapInstanceRef.current.setCenter([userLocation.lng, userLocation.lat]);
    mapInstanceRef.current.setZoom(13);
    
    // Add user marker
    new mapboxgl.Marker({
      color: "#16a34a",
      scale: 0.8
    })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(mapInstanceRef.current);
  };

  return {
    selectedLocation,
    addLocationMarkers,
    handleSelectLocation,
    addUserMarker
  };
};
