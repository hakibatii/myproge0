
import { Star } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface UserRatingProps {
  userId: string;
  userName: string;
  currentRating?: number;
  isVerified: boolean;
  currentUserVerified: boolean;
  hasInteracted: boolean;
}

const UserRating = ({ 
  userId, 
  userName, 
  currentRating = 0, 
  isVerified,
  currentUserVerified,
  hasInteracted
}: UserRatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const { toast } = useToast();
  
  const canRate = !currentUserVerified && isVerified && hasInteracted;
  
  const handleRatingSubmit = () => {
    if (rating === 0) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار تقييم",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would make an API call to submit the rating
    toast({
      title: "تم",
      description: `تم إرسال تقييمك (${rating} نجوم) بنجاح`,
    });
    
    // Reset form
    setRating(0);
    setFeedback("");
  };
  
  const handleStarClick = (value: number) => {
    if (!canRate) {
      if (!hasInteracted) {
        toast({
          title: "تنبيه",
          description: "يمكنك تقييم هذا المستخدم فقط بعد التعامل معه",
        });
      } else if (currentUserVerified) {
        toast({
          title: "تنبيه",
          description: "لا يمكن للحسابات المرقاة تقييم مستخدمين آخرين",
        });
      } else {
        toast({
          title: "تنبيه",
          description: "يمكنك تقييم الحسابات المرقاة فقط",
        });
      }
      return;
    }
    
    setRating(value);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md flex items-center">
            <Star size={14} className="text-morocco-gold" />
            <span className="ml-1">{currentRating}</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="rtl">
        <DialogHeader>
          <DialogTitle>تقييم {userName}</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center space-x-1 space-x-reverse my-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              size={32}
              onClick={() => handleStarClick(value)}
              onMouseEnter={() => canRate && setHoveredRating(value)}
              onMouseLeave={() => canRate && setHoveredRating(0)}
              className={`cursor-pointer ${
                value <= (hoveredRating || rating)
                  ? "text-morocco-gold fill-morocco-gold"
                  : "text-gray-300"
              } ${!canRate ? "opacity-50 cursor-not-allowed" : ""}`}
            />
          ))}
        </div>
        
        <Textarea
          placeholder="اكتب تعليقك هنا (اختياري)"
          className="rtl"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={!canRate}
        />
        
        {!canRate && (
          <p className="text-sm text-center text-gray-500 my-2">
            {!hasInteracted 
              ? "يمكنك تقييم هذا المستخدم فقط بعد التعامل معه" 
              : currentUserVerified 
                ? "لا يمكن للحسابات المرقاة تقييم مستخدمين آخرين" 
                : "يمكنك تقييم الحسابات المرقاة فقط"
            }
          </p>
        )}
        
        <Button 
          className="w-full" 
          onClick={handleRatingSubmit}
          disabled={!canRate || rating === 0}
        >
          إرسال التقييم
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserRating;
