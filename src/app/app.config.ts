import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideClientHydration(withEventReplay()),
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ]
};
