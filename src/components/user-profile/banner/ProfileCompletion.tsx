
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileCompletionProps {
  completionPercentage: number;
}

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ completionPercentage }) => {
  const { t } = useLanguage();

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-white rtl">{t("profile_completion")}</span>
        <span className="text-xs text-white">{completionPercentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-300/30 rounded-full">
        <div 
          className="h-full bg-morocco-gold rounded-full" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};
