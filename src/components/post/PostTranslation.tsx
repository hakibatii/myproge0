
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PostTranslationProps {
  originalContent: string;
  hashtags: string[];
}

const PostTranslation = ({ originalContent, hashtags }: PostTranslationProps) => {
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
  const getTranslatedContent = () => {
    if (!isTranslated) return originalContent;
    
    if (translationLanguage === 'en') {
      // Simulated English translation - in a real app, use a translation API
      let translation = originalContent;
      
      // Simple word replacements for demo purposes
      const arabicToEnglish: Record<string, string> = {
        'مرحبا': 'Hello',
        'شكرا': 'Thank you',
        'صباح الخير': 'Good morning',
        'مساء الخير': 'Good evening',
        'رحلة': 'Trip',
        'المغرب': 'Morocco',
        'مدينة': 'City',
        'جميل': 'Beautiful',
        'الصحراء': 'Desert',
        'الجبال': 'Mountains',
        'البحر': 'Sea',
        'رائع': 'Wonderful',
        'سفر': 'Travel',
        'تجربة': 'Experience',
        'منظر': 'View',
        'طعام': 'Food',
      };
      
      Object.entries(arabicToEnglish).forEach(([arabic, english]) => {
        translation = translation.replace(new RegExp(arabic, 'g'), english);
      });
      
      return translation;
    } else if (translationLanguage === 'fr') {
      // Simulated French translation
      let translation = originalContent;
      
      // Simple word replacements for demo purposes
      const arabicToFrench: Record<string, string> = {
        'مرحبا': 'Bonjour',
        'شكرا': 'Merci',
        'صباح الخير': 'Bon matin',
        'مساء الخير': 'Bonsoir',
        'رحلة': 'Voyage',
        'المغرب': 'Maroc',
        'مدينة': 'Ville',
        'جميل': 'Beau',
        'الصحراء': 'Désert',
        'الجبال': 'Montagnes',
        'البحر': 'Mer',
        'رائع': 'Magnifique',
        'سفر': 'Voyage',
        'تجربة': 'Expérience',
        'منظر': 'Vue',
        'طعام': 'Nourriture',
      };
      
      Object.entries(arabicToFrench).forEach(([arabic, french]) => {
        translation = translation.replace(new RegExp(arabic, 'g'), french);
      });
      
      return translation;
    }
    
    return originalContent;
  };
  
  const getTranslatedHashtags = () => {
    if (!isTranslated) return hashtags;
    
    return hashtags.map(tag => {
      const tagText = tag.replace('#', '');
      
      if (translationLanguage === 'en') {
        // Simple translation logic for English
        const arabicToEnglish: Record<string, string> = {
          'سفر': 'travel',
          'سياحة': 'tourism',
          'رحلة': 'trip',
          'مغامرة': 'adventure',
          'طبيعة': 'nature',
          'جبال': 'mountains',
          'صحراء': 'desert',
          'شاطئ': 'beach',
          'مدينة': 'city',
          'مراكش': 'Marrakech',
          'فاس': 'Fes',
          'الرباط': 'Rabat',
          'طنجة': 'Tangier',
          'المغرب': 'Morocco',
        };
        
        const translatedTag = arabicToEnglish[tagText] || tagText;
        return `#${translatedTag}`;
      } else if (translationLanguage === 'fr') {
        // Simple translation logic for French
        const arabicToFrench: Record<string, string> = {
          'سفر': 'voyage',
          'سياحة': 'tourisme',
          'رحلة': 'excursion',
          'مغامرة': 'aventure',
          'طبيعة': 'nature',
          'جبال': 'montagnes',
          'صحراء': 'désert',
          'شاطئ': 'plage',
          'مدينة': 'ville',
          'مراكش': 'Marrakech',
          'فاس': 'Fès',
          'الرباط': 'Rabat',
          'طنجة': 'Tanger',
          'المغرب': 'Maroc',
        };
        
        const translatedTag = arabicToFrench[tagText] || tagText;
        return `#${translatedTag}`;
      }
      
      return tag;
    });
  };
  
  const translatedContent = getTranslatedContent();
  const translatedHashtags = getTranslatedHashtags();
  
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
    currentContent: translatedContent,
    currentHashtags: translatedHashtags,
    translationButton
  };
};

export default PostTranslation;
