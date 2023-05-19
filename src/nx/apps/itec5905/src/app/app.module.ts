import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes'; 
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ImngOidcClientModule } from 'imng-oidc-client';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionSerializability: environment.runtimeChecks.strictActionSerializability,
          strictActionTypeUniqueness: environment.runtimeChecks.strictActionTypeUniqueness,
          strictStateSerializability: environment.runtimeChecks.strictStateSerializability,
          strictActionImmutability: environment.runtimeChecks.strictActionImmutability,
          strictStateImmutability: environment.runtimeChecks.strictStateImmutability,
        },
      }
    ),
    EffectsModule.forRoot([]),    
    StoreDevtoolsModule.instrument({ name: 'ITEC5905' }),
    StoreRouterConnectingModule.forRoot(),
    ImngOidcClientModule.forRoot(environment.oidc_options),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
