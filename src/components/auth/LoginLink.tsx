
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const LoginLink = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center mt-8">
      <p className="rtl text-gray-300">
        {t("already_have_account") || "لديك حساب بالفعل؟"}{" "}
        <Link to="/login" className="text-[#e06952] font-medium hover:underline">
          {t("login") || "تسجيل الدخول"}
        </Link>
      </p>
    </div>
  );
};

export default LoginLink;
