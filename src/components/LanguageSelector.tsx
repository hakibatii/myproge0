
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "ar", name: "العربية", flag: "🇲🇦" },
  { code: "en", name: "English (US)", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

const LanguageSelector = () => {
  const { language: currentLanguage, setLanguage, t } = useLanguage();

  const handleLanguageSelect = (languageCode: "ar" | "en" | "fr") => {
    if (languageCode === currentLanguage) return;
    
    setLanguage(languageCode);
    
    // Change document direction based on language
    if (languageCode === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      // Toast removed
    } else if (languageCode === "en") {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      // Toast removed
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "fr";
      // Toast removed
    }
    
    // Store user's language preference
    localStorage.setItem("userLanguage", languageCode);
  };

  const getCurrentLanguageDisplay = () => {
    const language = languages.find(lang => lang.code === currentLanguage);
    return language ? `${language.flag} ${language.name}` : "العربية";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <Globe className="mr-2 h-4 w-4" />
          {getCurrentLanguageDisplay()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full bg-white dark:bg-gray-800">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageSelect(language.code as "ar" | "en" | "fr")}
            className={`flex items-center ${currentLanguage === language.code ? 'bg-accent' : ''}`}
          >
            <span className="mr-2">{language.flag}</span>
            <span>{language.name}</span>
            {currentLanguage === language.code && <Check className="ml-auto" size={16} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
