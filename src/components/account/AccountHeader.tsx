
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BadgedAvatar } from "@/components/user-profile/UserBadge";
import { getUserBadgeByTrips } from "@/components/user-profile/UserBadge";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserPlus } from "lucide-react";

interface AccountHeaderProps {
  user: {
    name: string;
    avatar: string;
    city?: string;
    points: number;
    tripCount: number;
    isVerified: boolean;
    background?: string;
    description?: string;
  };
}

const AccountHeader: React.FC<AccountHeaderProps> = ({ user }) => {
  const navigate = useNavigate();
  const badge = getUserBadgeByTrips(user.tripCount);
  const { t } = useLanguage();

  // Default background if none provided
  const backgroundStyle = user.background 
    ? { backgroundImage: `url(${user.background})` }
    : { background: 'linear-gradient(45deg, #1E3A8A, #7E22CE)' }; // Use default gradient if no background

  return (
    <div className="overflow-hidden rounded-lg">
      {/* Background - height increased to touch the info section */}
      <div className="relative">
        <div 
          className="w-full h-40 bg-center bg-cover" 
          style={backgroundStyle}
        >
          {/* Add a gradient overlay to ensure text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        
        {/* Avatar positioned to overlap background and info section */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <BadgedAvatar
            badge={badge}
            avatar={user.avatar}
            name={user.name}
            size="lg"
          />
        </div>
      </div>
      
      {/* User Info - reorganized with name at top center and description */}
      <div className="bg-white dark:bg-gray-800 p-4 pb-2 rounded-lg shadow-md relative mt-12">
        <div className="text-center"> 
          {/* Username at the top center */}
          <h2 className="text-lg font-bold rtl mb-1">{user.name}</h2>
          
          {/* Description below name - new addition */}
          {user.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 rtl mb-2 px-3 line-clamp-2">{user.description}</p>
          )}
          
          {/* City below description */}
          <p className="text-sm text-gray-500 opacity-90 rtl mb-2">{user.city || t("city_not_specified")}</p>
          
          {/* Edit profile button below city */}
          <Button 
            variant="outline" 
            size="sm" 
            className="mx-auto mb-2 border-morocco-turquoise text-morocco-turquoise hover:bg-morocco-turquoise/10 rtl"
            onClick={() => navigate("/profile-edit")}
          >
            {t("edit_profile")}
          </Button>
          
          {/* Stats at the bottom */}
          <div className="flex justify-center gap-3 mt-2">
            <div className="bg-morocco-turquoise/10 px-3 py-1 rounded-full">
              <p className="text-sm text-morocco-turquoise rtl">
                {user.points} {t("points")}
              </p>
            </div>
            <div className="bg-morocco-gold/10 px-3 py-1 rounded-full">
              <p className="text-sm text-morocco-gold rtl">
                {user.tripCount} {t("trips")}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upgrade button moved below the info section */}
      {!user.isVerified && (
        <div className="mt-2 flex justify-center">
          <Button 
            variant="default" 
            className="bg-morocco-gold hover:bg-morocco-gold/90 text-white py-2 px-4 rounded-full shadow-md flex items-center"
            onClick={() => navigate("/upgrade-form")}
          >
            <UserPlus size={18} className="mr-2" />
            <span className="font-semibold rtl">{t("upgrade_account")}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountHeader;
