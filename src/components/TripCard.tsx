
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu } from "./ui/dropdown-menu";
import TripCardImage from "./trip-card/TripCardImage";
import TripCardInfo from "./trip-card/TripCardInfo";
import TripCardFooter from "./trip-card/TripCardFooter";
import TripCardDropdown from "./trip-card/TripCardDropdown";
import TripTranslation from "./trip-card/TripTranslation";

interface TripCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  date: string;
  rating: number;
  originalPrice?: number;
  discountedPrice: number;
  currency: string;
  user?: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  description?: string;
}

const TripCard = ({
  id,
  image,
  title,
  location,
  date,
  rating,
  originalPrice,
  discountedPrice,
  currency,
  user,
  description
}: TripCardProps) => {
  const [saved, setSaved] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { toast } = useToast();
  
  // Mock current user
  const currentUser = {
    isVerified: true
  };

  const handleSave = () => {
    if (!currentUser.isVerified) {
      toast({
        description: "يرجى ترقية حسابك لحفظ الرحلات",
        open: true
      });
      return;
    }
    
    setSaved(!saved);
    toast({
      description: saved ? "تم إلغاء حفظ الرحلة" : "تم حفظ الرحلة",
      open: true
    });
  };

  const handleMessage = () => {
    if (!user) return;
    
    if (!currentUser.isVerified) {
      toast({
        description: "يرجى ترقية حسابك لإرسال رسائل",
        open: true
      });
      return;
    }
    
    toast({
      description: `تم فتح محادثة مع ${user.name}`,
      open: true
    });
  };

  const handleInterested = () => {
    if (!currentUser.isVerified) {
      toast({
        description: "يرجى ترقية حسابك لإبداء الاهتمام",
        open: true
      });
      return;
    }
    
    toast({
      description: "تم تسجيل اهتمامك بهذه الرحلة",
      open: true
    });
  };

  const handleNotInterested = () => {
    if (!currentUser.isVerified) {
      toast({
        description: "يرجى ترقية حسابك لإخفاء المحتوى",
        open: true
      });
      return;
    }
    
    toast({
      description: "لن نعرض لك رحلات مشابهة",
      open: true
    });
  };
  
  const handleReport = () => {
    toast({
      description: "شكراً على إبلاغك، سنراجع هذا المحتوى",
      open: true
    });
  };
  
  const handleShare = () => {
    toast({
      description: "تم نسخ رابط الرحلة، يمكنك مشاركته الآن",
      open: true
    });
  };

  const openDropdownMenu = () => {
    setDropdownOpen(true);
  };

  // Integrate translation functionality
  const { isTranslated, currentContent, translationButton } = TripTranslation({
    originalContent: {
      title,
      location,
      description: description || `${title} - ${location}`
    }
  });

  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-morocco-navy shadow-sm">
      <TripCardImage 
        id={id} 
        image={image} 
        user={user} 
        openDropdownMenu={openDropdownMenu} 
      />
      
      <div className="p-3">
        <div className="flex justify-between items-center">
          {translationButton}
        </div>
        
        <TripCardInfo
          id={id}
          title={currentContent.title}
          location={currentContent.location}
          date={date}
          rating={rating}
          originalPrice={originalPrice}
          discountedPrice={discountedPrice}
          currency={currency}
        />
        
        <TripCardFooter 
          id={id}
          title={currentContent.title}
          image={image}
          description={currentContent.description || `${currentContent.title} - ${currentContent.location}`}
          user={user}
          onMessage={handleMessage}
          onShare={handleShare}
        />
      </div>

      {/* Dropdown menu content rendered conditionally to avoid duplicating the component */}
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        {dropdownOpen && (
          <TripCardDropdown 
            saved={saved}
            user={user}
            onSave={handleSave}
            onMessage={handleMessage}
            onInterested={handleInterested}
            onNotInterested={handleNotInterested}
            onReport={handleReport}
            onShare={handleShare}
          />
        )}
      </DropdownMenu>
    </div>
  );
};

export default TripCard;
