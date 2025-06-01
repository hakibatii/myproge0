
import { Heart, MapPin } from "lucide-react";
import { Location } from "@/types/map";

interface FavoriteLocationsProps {
  favoriteLocations: Location[];
  onSelectLocation: (location: Location) => void;
  removeFromFavorites: (locationId: string) => void;
  show: boolean;
  onClose: () => void;
}

const FavoriteLocations = ({
  favoriteLocations,
  onSelectLocation,
  removeFromFavorites,
  show,
  onClose
}: FavoriteLocationsProps) => {
  if (!show) return null;

  return (
    <div className="absolute top-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 z-30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold rtl flex items-center">
          <Heart size={16} className="fill-red-500 text-red-500 ml-1" />
          المواقع المفضلة
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {favoriteLocations.length === 0 ? (
        <div className="text-center py-8 text-gray-500 rtl">
          لم تقم بإضافة أي مواقع إلى المفضلة بعد
        </div>
      ) : (
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {favoriteLocations.map((location) => (
            <div 
              key={location.id} 
              className="flex items-start p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
              onClick={() => onSelectLocation(location)}
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
                  removeFromFavorites(location.id);
                }}
                className="ml-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <Heart 
                  size={18} 
                  className="fill-red-500 text-red-500"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteLocations;
