
import { TranslationsMap } from './types';
import arabicTranslations from './ar';
import englishTranslations from './en';
import frenchTranslations from './fr';

// Create partial translations maps as our translation files don't have all the keys yet
const translations: TranslationsMap = {
  ar: arabicTranslations as Partial<TranslationsMap['ar']>,
  en: englishTranslations as Partial<TranslationsMap['en']>,
  fr: frenchTranslations as Partial<TranslationsMap['fr']>
};

export default translations;
