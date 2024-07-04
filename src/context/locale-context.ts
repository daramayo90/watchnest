class LocaleContext {
   private locale: string = 'us';

   setLocale(locale: string) {
      this.locale = locale;
   }

   getLocale(): string {
      return this.locale;
   }
}

export const localeContext = new LocaleContext();
