
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface HomeActionButtonsProps {
  currentUser?: {
    id: string;
    isVerified: boolean;
  };
}

const HomeActionButtons = ({ currentUser }: HomeActionButtonsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Provide fallback if currentUser is undefined
  const isVerified = currentUser?.isVerified || false;

  const handleCreateTrip = () => {
    if (!isVerified) {
      toast({
        title: t("upgrade_needed"),
        description: t("upgrade_to_post_trips"),
        duration: 3000, // Auto-dismiss after 3 seconds
      });
      navigate('/upgrade-form');
      return;
    }
    navigate('/create-trip');
  };

  return (
    <>
      {/* Action Buttons (for all users) */}
      <div className="fixed bottom-16 inset-x-0 flex justify-center gap-3 z-10">
        {/* Post Button - for all users */}
        <Button 
          variant="default" 
          className="bg-morocco-turquoise hover:bg-morocco-turquoise/90 text-white py-2 px-4 rounded-full shadow-lg flex items-center"
          onClick={() => navigate('/create-post')}
        >
          <span className="rtl ml-1">{t("create_post")}</span>
        </Button>
        
        {/* Trip Button - always orange but disabled for non-verified users */}
        <Button 
          variant="default" 
          className="bg-morocco-gold hover:bg-morocco-gold/90 text-white py-2 px-4 rounded-full shadow-lg flex items-center"
          onClick={handleCreateTrip}
        >
          <span className="rtl ml-1">{t("create_trip")}</span>
        </Button>
      </div>

      {/* Smaller Upgrade Button - only for non-verified users */}
      {!isVerified && (
        <div className="fixed top-4 right-4 z-20">
          <Link to="/upgrade-form">
            <Button 
              variant="default" 
              size="sm"
              className="bg-morocco-gold hover:bg-morocco-gold/90 text-white py-1 px-3 rounded-full shadow-lg"
            >
              <span className="rtl text-sm">{t("upgrade")}</span>
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default HomeActionButtons;
