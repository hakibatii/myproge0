
import { useNavigate } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const LanguagePage = () => {
  const navigate = useNavigate();
  const { language: currentLanguage, setLanguage, t } = useLanguage();

  const languages = [
    { code: "ar", name: "العربية", flag: "🇲🇦", nativeName: "العربية" },
    { code: "en", name: "English (US)", flag: "🇺🇸", nativeName: "English" },
    { code: "fr", name: "Français", flag: "🇫🇷", nativeName: "Français" },
  ];

  const handleLanguageSelect = (languageCode: "ar" | "en" | "fr") => {
    setLanguage(languageCode);
    
    // Store user's language preference
    localStorage.setItem("userLanguage", languageCode);
    
    // Navigate back to account page
    setTimeout(() => {
      navigate("/account");
    }, 500);
  };

  return (
    <div className="page-container bg-gray-50 dark:bg-morocco-navy/90 pb-20">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate("/account")} className="mr-4">
          <ChevronRight className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 rtl">{t("language")}</h1>
      </div>

      <div className="p-6">
        <p className="text-gray-500 mb-6 rtl">
          {currentLanguage === 'ar' ? 'اختر لغة التطبيق' : 
           currentLanguage === 'fr' ? 'Choisissez la langue de l\'application' : 
           'Choose application language'}
        </p>
        
        <div className="space-y-4">
          {languages.map((language) => (
            <motion.div 
              key={language.code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLanguageSelect(language.code as "ar" | "en" | "fr")}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all
                ${currentLanguage === language.code 
                  ? 'bg-morocco-turquoise/10 border-morocco-turquoise border' 
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{language.flag}</span>
                <div>
                  <span className={`font-medium block ${language.code === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language.nativeName}
                  </span>
                  <span className="text-sm text-gray-500">
                    {language.code !== 'ar' && language.name !== language.nativeName ? language.name : ''}
                  </span>
                </div>
              </div>
              {currentLanguage === language.code && (
                <Check className="h-5 w-5 text-morocco-turquoise" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagePage;
