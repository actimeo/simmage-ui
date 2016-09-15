import "./polyfills.ts";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import { TRANSLATION_EN } from './i18n/messages.en';
import { TRANSLATION_FR } from './i18n/messages.fr';

const translation_map = {
  'fr': TRANSLATION_FR,
  'en': TRANSLATION_EN
};
const langCode = window.localStorage.getItem('lang');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule,
  {
    providers: [
      { provide: TRANSLATIONS, useValue: translation_map[langCode] },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: langCode }
    ]
  });
