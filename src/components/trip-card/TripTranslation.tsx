
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TripTranslationProps {
  originalContent: {
    title: string;
    location: string;
    description?: string;
  };
}

const TripTranslation = ({ originalContent }: TripTranslationProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isTranslated, setIsTranslated] = useState(false);
  const [translationLanguage, setTranslationLanguage] = useState<"en" | "fr">("en");
  const [showTranslationOption, setShowTranslationOption] = useState(language !== "ar");

  // Update showTranslationOption when language changes
  useEffect(() => {
    setShowTranslationOption(language !== "ar");
    // Reset to original content when switching to Arabic
    if (language === "ar") {
      setIsTranslated(false);
    }
  }, [language]);

  // Get translated content based on the selected translation language
  const getTranslatedTitle = () => {
    if (!isTranslated) return originalContent.title;
    
    // Translation logic (simulated for now)
    switch (translationLanguage) {
      case 'en':
        return `[English] ${originalContent.title}`;
      case 'fr':
        return `[Français] ${originalContent.title}`;
      default:
        return originalContent.title;
    }
  };
  
  const getTranslatedLocation = () => {
    if (!isTranslated) return originalContent.location;
    
    switch (translationLanguage) {
      case 'en':
        return `[English] ${originalContent.location}`;
      case 'fr':
        return `[Français] ${originalContent.location}`;
      default:
        return originalContent.location;
    }
  };
  
  const getTranslatedDescription = () => {
    if (!originalContent.description || !isTranslated) return originalContent.description;
    
    switch (translationLanguage) {
      case 'en':
        return `[English] ${originalContent.description}`;
      case 'fr':
        return `[Français] ${originalContent.description}`;
      default:
        return originalContent.description;
    }
  };
  
  const toggleTranslation = () => {
    setIsTranslated(!isTranslated);
    
    // Show toast notification when toggling translation
    if (!isTranslated) {
      toast({
        description: translationLanguage === 'en' ? "Translated to English" : "Traduit en français",
      });
    } else {
      toast({
        description: t("showing_original_content"),
      });
    }
  };
  
  const changeTranslationLanguage = (lang: "en" | "fr") => {
    setTranslationLanguage(lang);
    
    // Always translate when changing language
    if (!isTranslated) {
      setIsTranslated(true);
      toast({
        description: lang === 'en' ? "Translated to English" : "Traduit en français",
      });
    } else if (lang !== translationLanguage) {
      // If already translated but changing language
      toast({
        description: lang === 'en' ? "Translated to English" : "Traduit en français",
      });
    }
  };
  
  const translationButton = showTranslationOption ? (
    <div className="flex items-center gap-1">
      <Button 
        variant="ghost" 
        size="sm" 
        className={`h-8 px-2 text-gray-500 ${isTranslated && translationLanguage === 'en' ? 'bg-blue-50' : ''}`}
        onClick={() => changeTranslationLanguage("en")}
      >
        <span className="text-xs">EN</span>
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`h-8 px-2 text-gray-500 ${isTranslated && translationLanguage === 'fr' ? 'bg-blue-50' : ''}`}
        onClick={() => changeTranslationLanguage("fr")}
      >
        <span className="text-xs">FR</span>
      </Button>
      {isTranslated && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 text-gray-500"
          onClick={toggleTranslation}
        >
          <Globe className="h-4 w-4 mr-1" />
          <span className="text-xs">{t("original")}</span>
        </Button>
      )}
    </div>
  ) : null;
  
  return {
    isTranslated,
    currentContent: {
      title: getTranslatedTitle(),
      location: getTranslatedLocation(),
      description: getTranslatedDescription()
    },
    translationButton
  };
};

export default TripTranslation;
