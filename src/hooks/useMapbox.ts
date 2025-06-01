
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Location } from "@/types/map";

// Set your Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || "";

interface UseMapboxProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  markers?: Array<{
    id: string;
    coordinates: [number, number];
    title?: string;
    description?: string;
  }>;
  onMarkerClick?: (markerId: string) => void;
  interactive?: boolean;
  style?: string;
  mapboxToken?: string;
}

export const useMapbox = ({
  initialCenter = [-7.5898, 33.5731], // Default to Casablanca
  initialZoom = 9,
  markers = [],
  onMarkerClick,
  interactive = true,
  style = "mapbox://styles/mapbox/streets-v11",
  mapboxToken
}: UseMapboxProps) => {
  // References
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markerRefs = useRef<mapboxgl.Marker[]>([]);
  
  // States
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadingMap, setLoadingMap] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Map styles
  const mapStyles = {
    streets: "mapbox://styles/mapbox/streets-v11",
    outdoors: "mapbox://styles/mapbox/outdoors-v11",
    light: "mapbox://styles/mapbox/light-v10",
    dark: "mapbox://styles/mapbox/dark-v10",
    satellite: "mapbox://styles/mapbox/satellite-v9",
    satelliteStreets: "mapbox://styles/mapbox/satellite-streets-v11",
    navigationDay: "mapbox://styles/mapbox/navigation-day-v1",
    navigationNight: "mapbox://styles/mapbox/navigation-night-v1"
  };

  // Set the token if provided
  useEffect(() => {
    if (mapboxToken) {
      mapboxgl.accessToken = mapboxToken;
    }
  }, [mapboxToken]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapRef.current,
      style,
      center: initialCenter,
      zoom: initialZoom,
      interactive
    });

    mapInstanceRef.current.on("load", () => {
      setMapLoaded(true);
      setLoadingMap(false); // Set loading to false when map is loaded
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initialCenter, initialZoom, interactive, style]);

  // Handle markers
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;

    // Clear existing markers
    markerRefs.current.forEach(marker => marker.remove());
    markerRefs.current = [];

    // Add new markers
    markers.forEach(marker => {
      const el = document.createElement("div");
      el.className = "mapbox-marker";
      el.style.width = "25px";
      el.style.height = "25px";
      el.style.backgroundImage = "url('/marker-icon.png')";
      el.style.backgroundSize = "cover";
      el.style.cursor = "pointer";

      const mapMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .addTo(mapInstanceRef.current!);

      if (marker.title || marker.description) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${marker.title || ""}</h3><p>${marker.description || ""}</p>`
        );
        mapMarker.setPopup(popup);
      }

      if (onMarkerClick) {
        el.addEventListener("click", () => {
          onMarkerClick(marker.id);
        });
      }

      markerRefs.current.push(mapMarker);
    });
  }, [markers, mapLoaded, onMarkerClick]);

  // Methods to control the map
  const flyTo = (center: [number, number], zoom = initialZoom) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({ center, zoom, essential: true });
    }
  };

  const setMapStyle = (styleName: keyof typeof mapStyles) => {
    if (mapInstanceRef.current && mapStyles[styleName]) {
      mapInstanceRef.current.setStyle(mapStyles[styleName]);
    }
  };

  const addGeoJSONSource = (id: string, data: GeoJSON.FeatureCollection) => {
    if (!mapInstanceRef.current || !mapLoaded) return;

    if (mapInstanceRef.current.getSource(id)) {
      (mapInstanceRef.current.getSource(id) as mapboxgl.GeoJSONSource).setData(data);
    } else {
      mapInstanceRef.current.addSource(id, {
        type: "geojson",
        data
      });
    }
  };

  const addLayer = (
    id: string,
    type: string,
    source: string,
    paint: Record<string, unknown>,
    layout?: Record<string, unknown>
  ) => {
    if (!mapInstanceRef.current || !mapLoaded) return;

    if (mapInstanceRef.current.getLayer(id)) {
      mapInstanceRef.current.removeLayer(id);
    }

    mapInstanceRef.current.addLayer({
      id,
      type: type as any,
      source,
      paint,
      layout
    });
  };

  // Mock data for nearby locations based on user location
  const fetchNearbyLocations = (lat: number, lng: number) => {
    // In a real app, this would be an API call
    const mockLocations = [
      {
        id: "loc1",
        name: "فندق المامونية",
        lat: lat + 0.01,
        lng: lng + 0.01,
        type: "attraction" as const,
        distanceKm: 1.2
      },
      {
        id: "loc2",
        name: "حديقة ماجوريل",
        lat: lat - 0.01,
        lng: lng - 0.008,
        type: "attraction" as const,
        distanceKm: 0.8
      },
      {
        id: "loc3",
        name: "جولة في المدينة القديمة",
        lat: lat + 0.005,
        lng: lng - 0.02,
        type: "tour" as const,
        distanceKm: 1.5
      },
      {
        id: "loc4",
        name: "مراكش",
        lat: lat + 0.02,
        lng: lng + 0.02,
        type: "city" as const,
        distanceKm: 2.7
      }
    ];

    setNearbyLocations(mockLocations);
  };

  // Location methods that are expected in Map.tsx
  const locateUser = () => {
    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setIsLocating(false);
        
        // Fetch nearby locations based on user location
        fetchNearbyLocations(latitude, longitude);
        setErrorMessage(null);
        
        // Add user marker and zoom to location
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            essential: true
          });
          
          // Add a marker for user location
          new mapboxgl.Marker({
            color: "#4668F2"
          })
            .setLngLat([longitude, latitude])
            .addTo(mapInstanceRef.current);
            
          // Add markers for nearby locations
          fetchNearbyLocations(latitude, longitude);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLocating(false);
        setErrorMessage("تعذر الوصول إلى موقعك. يرجى التحقق من إذونات المتصفح.");
      }
    );
  };

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [location.lng, location.lat],
        zoom: 15,
        essential: true
      });
    }
  };

  return {
    mapRef,
    map: mapInstanceRef.current,
    mapLoaded,
    flyTo,
    setMapStyle,
    addGeoJSONSource,
    addLayer,
    isLocating,
    userLocation,
    loadingMap,
    errorMessage,
    nearbyLocations,
    selectedLocation,
    locateUser,
    handleSelectLocation
  };
};
