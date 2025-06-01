
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SocialStatsProps {
  followersCount: number;
  followingCount: number;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
}

export const SocialStats: React.FC<SocialStatsProps> = ({
  followersCount,
  followingCount,
  onFollowersClick,
  onFollowingClick
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex space-x-4 rtl-space-x-reverse">
      <div 
        className="text-center cursor-pointer" 
        onClick={onFollowersClick}
      >
        <p className="text-white font-bold">{followersCount}</p>
        <p className="text-gray-200 text-xs rtl">{t("followers")}</p>
      </div>
      <div 
        className="text-center cursor-pointer" 
        onClick={onFollowingClick}
      >
        <p className="text-white font-bold">{followingCount}</p>
        <p className="text-gray-200 text-xs rtl">{t("following")}</p>
      </div>
    </div>
  );
};
