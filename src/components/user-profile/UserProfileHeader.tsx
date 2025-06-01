
import { ArrowRight, MessageCircle, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserRating from "./UserRating";
import { useLanguage } from "@/contexts/LanguageContext";

interface UserProfileHeaderProps {
  user?: {
    id: string;
    name: string;
    rating: number;
    isVerified: boolean;
  };
  currentUser?: {
    id: string;
    isVerified: boolean;
  };
  hasInteracted?: boolean;
}

const UserProfileHeader = ({ 
  user, 
  currentUser = { 
    id: "current-user", 
    isVerified: false 
  },
  hasInteracted = false
}: UserProfileHeaderProps = {}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const goBack = () => {
    navigate(-1);
  };

  const handleMessageUser = () => {
    if (user) {
      navigate(`/chat/${user.name}`);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-morocco-navy shadow-sm sticky top-0 z-10">
      <button onClick={goBack} className="flex items-center gap-1">
        <ArrowRight className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-bold rtl">{t("profile")}</h1>
      <div className="flex items-center gap-2">
        {user && user.isVerified && (
          <UserRating 
            userId={user.id}
            userName={user.name}
            currentRating={user.rating}
            isVerified={user.isVerified}
            currentUserVerified={currentUser.isVerified}
            hasInteracted={hasInteracted}
          />
        )}
        {user && (
          <button 
            onClick={handleMessageUser}
            className="bg-morocco-turquoise text-white p-1.5 rounded-full"
          >
            <MessageCircle size={18} />
          </button>
        )}
        {!user && <div className="w-6"></div>} {/* Placeholder for alignment */}
      </div>
    </div>
  );
};

export default UserProfileHeader;
