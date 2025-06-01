import { useState } from "react";
import { Message } from "@/components/chat/types";
import { useToast } from "@/hooks/use-toast";

export const useRewards = (
  initialPoints: number,
  addMessage: (message: Message) => void
) => {
  const { toast } = useToast();
  const [userPoints, setUserPoints] = useState(initialPoints);

  const handleTripSuccess = (success: boolean) => {
    // Add system message
    const systemMessage: Message = {
      id: Date.now().toString(),
      text: success 
        ? "تم تأكيد نجاح الرحلة! تهانينا، لقد حصلت على 10 نقاط إضافية!"
        : "نأسف لسماع ذلك. نتمنى أن تكون تجربتك أفضل في المرة القادمة.",
      sentByMe: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    addMessage(systemMessage);
    
    // Add points if trip was successful
    if (success) {
      const newPoints = userPoints + 10;
      setUserPoints(newPoints);
      localStorage.setItem('userPoints', newPoints.toString());
      
      toast({
        title: "مبروك!",
        description: "لقد حصلت على 10 نقاط إضافية!",
      });
      
      // Schedule feedback request for one day later in production
      // Using 30 seconds for demo purposes
      setTimeout(() => {
        const feedbackRequest: Message = {
          id: Date.now().toString(),
          text: "كيف كانت تجربتك في الرحلة؟ نرجو مشاركة رأيك وتقييم منظم الرحلة.",
          sentByMe: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFeedbackRequest: true,
          requiresResponse: true
        };
        
        addMessage(feedbackRequest);
      }, 30 * 1000); // 30 seconds for demo (would be 24 hours in production)
    }
    
    return success;
  };

  return {
    userPoints,
    setUserPoints,
    handleTripSuccess
  };
};
