import {
  ApplicationConfig,
  ɵprovideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ɵprovideZonelessChangeDetection(),
    provideAngularQuery(new QueryClient()),
  ],
};
