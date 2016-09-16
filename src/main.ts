import "./polyfills.ts";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import { TRANSLATION_DE } from './i18n/messages.de';
import { TRANSLATION_EN } from './i18n/messages.en';
import { TRANSLATION_FR } from './i18n/messages.fr';

const translation_map = {
  'de': TRANSLATION_DE,
  'en': TRANSLATION_EN,
  'fr': TRANSLATION_FR
};
const langCode = window.localStorage.getItem('lang');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule,
  {
    providers: [
      {
        provide: TRANSLATIONS,
        useValue: langCode in translation_map ? translation_map[langCode] : 'en'
      },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: langCode }
    ]
  });
