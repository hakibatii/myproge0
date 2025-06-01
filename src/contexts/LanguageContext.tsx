
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language } from '@/translations/types';
import translations from '@/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  setLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en' || savedLanguage === 'fr')) {
      return savedLanguage as Language;
    }
    return 'ar'; // Default language
  });

  const t = (key: string): string => {
    // Access the translations using the nested key
    // First check if the key exists in the current language
    const translationObj = translations[language];
    return translationObj[key as keyof typeof translationObj] || key;
  };

  // Set document direction and language whenever language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('userLanguage', language);
    
    // Removed the toast notification for language change
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
