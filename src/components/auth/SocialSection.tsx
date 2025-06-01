
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SocialLogin from "./SocialLogin";

interface SocialSectionProps {
  isLoading: boolean;
  onLoginSuccess: (userData: { name: string; email: string; provider: string; providerId: string }) => void;
}

const SocialSection = ({ isLoading, onLoginSuccess }: SocialSectionProps) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-600"></div>
        <div className="mx-4 text-gray-400 text-sm">
          {t("or_continue_with") || "أو المتابعة باستخدام"}
        </div>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>

      {/* Social Login Buttons */}
      <SocialLogin 
        onLoginSuccess={onLoginSuccess} 
        isLoading={isLoading} 
      />
    </>
  );
};

export default SocialSection;
