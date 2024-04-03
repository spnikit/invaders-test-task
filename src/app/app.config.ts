import {APP_INITIALIZER, ApplicationConfig, inject} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {CurrencyExchangeStore} from "./store/currency-exchange.store";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const store = inject(CurrencyExchangeStore);

        return () => {
          store.getRates()
        }
      },
      multi: true,
      deps: [CurrencyExchangeStore],
    },
    provideAnimationsAsync()
  ]
};
