class LanguageContext {
   private language: string = 'en';

   setLanguage(language: string) {
      this.language = language;
   }

   getLanguage(): string {
      return this.language;
   }
}

export const languageContext = new LanguageContext();
