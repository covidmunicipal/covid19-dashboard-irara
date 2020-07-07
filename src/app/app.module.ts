import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService,
  CONFIG, APP_NAME, APP_VERSION, COLLECTION_ENABLED } from '@angular/fire/analytics';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenTrackingService,
    UserTrackingService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: CONFIG, useValue: {
        allow_ad_personalization_signals: false
      }
    },
    { provide: COLLECTION_ENABLED, useValue: environment.production},
    // caso queira testar o Google Analytics em debug mode, comente a linha acima,
    // descomente a linha abaixo e adicione DEBUG_MODE aos imports do AngularFireAuth.
    // { provide: DEBUG_MODE, useValue: !environment.production},
    { provide: APP_NAME, useValue: environment.appName},
    { provide: APP_VERSION, useValue: environment.buildVersion}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
