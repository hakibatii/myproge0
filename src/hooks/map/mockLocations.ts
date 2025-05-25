
import { Location } from '@/types/map';

// Mock locations data for demonstration
export const mockLocations: Location[] = [
  { id: "1", name: "مراكش", lat: 31.6295, lng: -7.9811, type: 'city' as const, distanceKm: 2.5 },
  { id: "2", name: "متحف مراكش", lat: 31.6325, lng: -7.9854, type: 'attraction' as const, distanceKm: 3.1 },
  { id: "3", name: "حديقة ماجوريل", lat: 31.6417, lng: -8.0035, type: 'attraction' as const, distanceKm: 4.2 },
  { id: "4", name: "جولة في المدينة القديمة", lat: 31.6295, lng: -7.9811, type: 'tour' as const, distanceKm: 1.5 },
  { id: "5", name: "سوق المدينة", lat: 31.6315, lng: -7.9841, type: 'attraction' as const, distanceKm: 2.8 },
  { id: "6", name: "قصر الباهية", lat: 31.6220, lng: -7.9813, type: 'attraction' as const, distanceKm: 3.5 },
];
