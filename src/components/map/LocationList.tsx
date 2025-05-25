
import { MapPin, Navigation, Heart, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Location } from "@/types/map";
import { Button } from "@/components/ui/button";

interface LocationListProps {
  userLocation: { lat: number; lng: number } | null;
  locations: Location[];
  selectedLocation: Location | null;
  onSelectLocation: (location: Location) => void;
  favoriteLocations?: Location[];
  isFavorite?: (locationId: string) => boolean;
  addToFavorites?: (location: Location) => void;
  removeFromFavorites?: (locationId: string) => void;
  isSearchResults?: boolean;
  onClearSearch?: () => void;
}

const LocationList = ({ 
  userLocation, 
  locations, 
  selectedLocation, 
  onSelectLocation,
  favoriteLocations = [],
  isFavorite = () => false,
  addToFavorites = () => {},
  removeFromFavorites = () => {},
  isSearchResults = false,
  onClearSearch = () => {}
}: LocationListProps) => {
  const { toast } = useToast();
  
  if (!userLocation || locations.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 z-30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold rtl">
          {isSearchResults ? 'نتائج البحث' : 'الوجهات والرحلات القريبة'}
        </h3>
        
        <div className="flex items-center gap-2">
          {isSearchResults && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearSearch}
              className="flex items-center gap-1 text-xs"
            >
              <X size={14} />
              مسح البحث
            </Button>
          )}
          
          {!isSearchResults && (
            <span className="text-xs text-morocco-turquoise flex items-center rtl">
              <Navigation size={12} className="mr-1" />
              موقعك الحالي
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {locations.map((location) => (
          <div 
            key={location.id} 
            className={`flex items-start p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer ${selectedLocation?.id === location.id ? 'bg-morocco-turquoise/10' : ''}`}
            onClick={() => {
              onSelectLocation(location);
              
              toast({
                title: location.name,
                description: `تم اختيار ${location.name}. على بعد ${location.distanceKm} كم من موقعك`
              });
            }}
          >
            <div className="bg-morocco-sand/20 dark:bg-morocco-sand/10 p-2 rounded-lg mr-2">
              <MapPin size={18} className="text-morocco-turquoise" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium rtl">{location.name}</h4>
                <span className="text-xs text-gray-500">{location.distanceKm} كم</span>
              </div>
              <p className="text-xs text-gray-500 rtl">
                {location.type === 'city' && 'مدينة'}
                {location.type === 'attraction' && 'معلم سياحي'}
                {location.type === 'tour' && 'جولة سياحية'}
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (isFavorite(location.id)) {
                  removeFromFavorites(location.id);
                } else {
                  addToFavorites(location);
                }
              }}
              className="ml-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Heart 
                size={18} 
                className={isFavorite(location.id) ? "fill-red-500 text-red-500" : "text-gray-400"} 
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
