
import { MapPin, X } from "lucide-react";
import { LocationProps } from "./types";

const LocationDisplay = ({ location, onClear }: LocationProps) => {
  if (!location) return null;
  
  return (
    <div className="flex items-center gap-2 mb-3 rtl">
      <MapPin size={16} className="text-red-500" />
      <span className="text-sm">{location}</span>
      <button 
        type="button" 
        className="text-gray-500 hover:text-gray-700 ml-auto" 
        onClick={onClear}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default LocationDisplay;
