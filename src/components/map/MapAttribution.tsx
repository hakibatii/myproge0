
import { Globe, Layers, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const MapAttribution = () => {
  const { t } = useLanguage();
  
  return (
    <div className="absolute bottom-2 left-2 flex flex-col gap-2">
      <div className="text-[8px] text-gray-500">
        © OpenStreetMap contributors
      </div>
      
      {/* Interactive Map Controls */}
      <div className="flex gap-1">
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
          title={t("satellite_view")}
          onClick={() => {
            // Get the map instance from the window object
            const mapInstance = (window as any).mapboxInstance;
            if (mapInstance) {
              const currentStyle = mapInstance.getStyle().sprite;
              if (currentStyle.includes('streets')) {
                mapInstance.setStyle('mapbox://styles/mapbox/satellite-streets-v12');
              } else {
                mapInstance.setStyle('mapbox://styles/mapbox/streets-v12');
              }
            }
          }}
        >
          <Layers size={14} />
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
          title={t("reset_view")}
          onClick={() => {
            // Reset map position
            const mapInstance = (window as any).mapboxInstance;
            if (mapInstance) {
              mapInstance.flyTo({
                center: [-7.9811, 31.6295], // Marrakech
                zoom: 12,
                pitch: 0,
                bearing: 0,
                duration: 1500
              });
            }
          }}
        >
          <Globe size={14} />
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
          title={t("my_location")}
          onClick={() => {
            // Get user location and center map
            if ('geolocation' in navigator) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const mapInstance = (window as any).mapboxInstance;
                  if (mapInstance) {
                    mapInstance.flyTo({
                      center: [position.coords.longitude, position.coords.latitude],
                      zoom: 15,
                      duration: 1000
                    });
                  }
                },
                () => {
                  console.error('Unable to get location');
                }
              );
            }
          }}
        >
          <Navigation size={14} />
        </Button>
      </div>
    </div>
  );
};

export default MapAttribution;
