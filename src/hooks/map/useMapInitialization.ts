
import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapRefs } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface UseMapInitializationProps {
  mapboxToken: string;
  mapRefs: MapRefs;
}

export const useMapInitialization = ({ mapboxToken, mapRefs }: UseMapInitializationProps) => {
  const [loadingMap, setLoadingMap] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useLanguage();
  
  const { mapRef, mapInstanceRef, mapInitializedRef } = mapRefs;

  // Initialize map
  useEffect(() => {
    // Add error handling for missing mapboxgl
    if (!mapboxgl) {
      console.error("Mapbox GL JS is not loaded");
      setErrorMessage(t("offline"));
      setLoadingMap(false);
      return;
    }

    if (mapRef.current && !mapInitializedRef.current) {
      mapInitializedRef.current = true;
      
      try {
        // Set the Mapbox token
        mapboxgl.accessToken = mapboxToken;
        
        // Optimize initial map loading
        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-7.9811, 31.6295], // Default center (Marrakech)
          zoom: 12,
          attributionControl: false,
          antialias: false, // Improves performance
          preserveDrawingBuffer: false, // Improves performance
          renderWorldCopies: false, // Improves performance for single region focus
          maxPitch: 60, // Limit pitch to improve performance
          maxZoom: 16 // Limit max zoom to improve performance
        });
        
        // Reduce the number of workers for tile loading
        // @ts-ignore: workerCount is not in the official type definitions
        map.setMaxTileCacheSize(50); // Limit tile cache size
        
        // Add controls - but only after the map has loaded to prioritize map rendering
        map.once('load', () => {
          map.addControl(new mapboxgl.NavigationControl({
            showCompass: false, // Hide compass to simplify the UI
            showZoom: true
          }), 'top-right');
          
          map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showAccuracyCircle: false // Hide accuracy circle to improve performance
          }));
          
          setLoadingMap(false);
          console.log("Map loaded successfully");
        });
        
        mapInstanceRef.current = map;
        
        // Use a timeout to make sure the map loads even if the load event never fires
        setTimeout(() => {
          if (loadingMap) {
            setLoadingMap(false);
          }
        }, 5000);
        
        // Set up error handler
        map.on('error', (e) => {
          console.error("Map error:", e);
          setErrorMessage(t("offline"));
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        setErrorMessage(t("offline"));
        setLoadingMap(false);
      }
    }
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapboxToken, mapRefs, t]);

  return { loadingMap, errorMessage };
};
