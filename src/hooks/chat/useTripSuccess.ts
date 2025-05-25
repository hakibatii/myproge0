
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useTripSuccess = () => {
  const { toast } = useToast();
  const [showTripSuccessDialog, setShowTripSuccessDialog] = useState(false);
  
  const handleTripSuccess = () => {
    setShowTripSuccessDialog(false);
    
    // In a real app, we would update the trip status in the database
    toast({
      title: "تم الحجز بنجاح!",
      description: "سنرسل لك تفاصيل الرحلة قريبًا.",
    });
  };

  return {
    showTripSuccessDialog,
    setShowTripSuccessDialog,
    handleTripSuccess
  };
};
