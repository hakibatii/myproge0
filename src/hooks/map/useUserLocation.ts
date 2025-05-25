import { useState } from 'react';
import { UserLocation } from './types';
import { useToast } from "@/hooks/use-toast";

export const useUserLocation = () => {
  const { toast } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Locate user
  const locateUser = (onSuccess?: (location: UserLocation) => void) => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      setIsLocating(false);
      setErrorMessage("متصفحك لا يدعم تحديد المواقع");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        
        setUserLocation(location);
        setIsLocating(false);
        
        toast({
          title: "تم تحديد موقعك",
          description: "يمكنك الآن استكشاف الرحلات والوجهات القريبة"
        });
        
        if (onSuccess) {
          onSuccess(location);
        }
      },
      (error) => {
        setIsLocating(false);
        setErrorMessage("تعذر الوصول إلى موقعك. يرجى التحقق من إذن الموقع والمحاولة مرة أخرى.");
        console.error("Error getting location:", error);
      }
    );
  };

  return {
    isLocating,
    userLocation,
    locateUser,
    errorMessage,
    setErrorMessage
  };
};

