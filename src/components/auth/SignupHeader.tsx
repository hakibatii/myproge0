
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const SignupHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-6">
        {t("createAccount") || "إنشاء حساب"}
      </h1>
    </div>
  );
};

export default SignupHeader;
