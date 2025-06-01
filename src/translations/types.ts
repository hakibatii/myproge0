
export interface TranslationKeys {
  // Add any missing keys from error messages
  [key: string]: string; // Allow any string key
}

export type LanguageCode = "ar" | "en" | "fr";
// Adding Language as an alias for LanguageCode for backward compatibility
export type Language = LanguageCode;

export interface TranslationsMap {
  ar: Partial<TranslationKeys>;
  en: Partial<TranslationKeys>;
  fr: Partial<TranslationKeys>;
}
