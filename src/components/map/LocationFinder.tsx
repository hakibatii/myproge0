
import { Compass, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationFinderProps {
  isLocating: boolean;
  onLocate: () => void;
}

const LocationFinder = ({ isLocating, onLocate }: LocationFinderProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="text-center text-gray-500 px-4 max-w-md">
        <Compass size={48} className="mx-auto mb-2" />
        <p className="rtl mb-4">لعرض المزيد من التفاصيل، يرجى تحديد موقعك</p>
        
        <Button 
          onClick={onLocate} 
          disabled={isLocating}
          className="bg-morocco-turquoise hover:bg-morocco-turquoise/90"
        >
          {isLocating ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <MapPin className="mr-2" size={16} />
          )}
          <span className="rtl">{t("locate_me")}</span>
        </Button>
      </div>
    </div>
  );
};

export default LocationFinder;
