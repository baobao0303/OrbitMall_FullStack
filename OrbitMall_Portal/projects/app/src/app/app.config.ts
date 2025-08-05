import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, Routes } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ORBITMAIL_PORTALContext } from '@infrastructure/base';
import { AuthorizationTokenInterceptor } from '@infrastructure/authorization';
import {
  VIEW_ACTIVE_REGISTRY,
  VIEW_COMMAND_MAPPER_REGISTRY,
  VIEW_REF_MAPPER_REGISTRY,
  ViewActive,
} from '@view/base';
import { environment } from '../environments/environment';
import { ViewCommandMapper } from './view.command.mapper';
import { ViewRefMapper } from './view.ref.mapper';

const routes: Routes = []; // Empty routes array, same as in app-routing.module.ts

console.log('🔧 App Config - Loading providers...');
console.log('📍 Environment URI:', environment.URI);
console.log('🔗 Routes configured:', routes);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationTokenInterceptor,
      multi: true,
    },
    { provide: VIEW_COMMAND_MAPPER_REGISTRY, useExisting: ViewCommandMapper },
    { provide: VIEW_REF_MAPPER_REGISTRY, useExisting: ViewRefMapper },
    { provide: VIEW_ACTIVE_REGISTRY, useExisting: ViewActive },
    {
      provide: ORBITMAIL_PORTALContext,
      useFactory: () => {
        const uri = environment.URI;
        console.log('🏭 ORBITMAIL_PORTALContext factory - URI:', uri);
        var xfwContext = new ORBITMAIL_PORTALContext();
        xfwContext.endPoint = uri;
        console.log('✅ ORBITMAIL_PORTALContext created:', xfwContext);
        return xfwContext;
      },
    },
  ],
};

console.log('✅ App Config - All providers configured:', appConfig.providers.length, 'providers');
