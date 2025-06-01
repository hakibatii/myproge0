
import { Location } from '@/types/map';

export interface MapInstance extends mapboxgl.Map {}

export interface MapMarker extends mapboxgl.Marker {}

export interface UseMapboxOptions {
  mapboxToken?: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface MapRefs {
  mapRef: React.RefObject<HTMLDivElement>;
  mapInstanceRef: React.MutableRefObject<mapboxgl.Map | null>;
  markersRef: React.MutableRefObject<mapboxgl.Marker[]>;
  mapInitializedRef: React.MutableRefObject<boolean>;
}

