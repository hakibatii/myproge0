
import { MapPinOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LocationErrorProps {
  message: string | null;
}

const LocationError = ({ message }: LocationErrorProps) => {
  if (!message) return null;
  
  return (
    <div className="absolute top-4 left-4 right-4 z-30">
      <Alert variant="destructive">
        <MapPinOff className="h-4 w-4" />
        <AlertTitle className="rtl">خطأ في تحديد الموقع</AlertTitle>
        <AlertDescription className="rtl">
          {message}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default LocationError;
