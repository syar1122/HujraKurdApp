import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { SidemenuComponent } from "./components/sidemenu/sidemenu.component";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { FCM } from "@ionic-native/fcm/ngx";
import { NgPipesModule } from "ngx-pipes";
import { Network } from "@ionic-native/network/ngx";
import { Dialogs } from "@ionic-native/dialogs/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { AppAvailability } from "@ionic-native/app-availability/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ZSidemenuComponent } from "./components/z-sidemenu/z-sidemenu.component";

const firebaseConfig = {
  apiKey: "AIzaSyBLBWmxsa-P2hlLdLlQfHXMJaPybKpTiz4",
  authDomain: "hujrakurdstan.firebaseapp.com",
  databaseURL: "https://hujrakurdstan.firebaseio.com",
  projectId: "hujrakurdstan",
  storageBucket: "hujrakurdstan.appspot.com",
  messagingSenderId: "194323244336",
  appId: "1:194323244336:web:b109cafe8db175c3bb54f5",
  measurementId: "G-XLT7YRXC78",
};

@NgModule({
  declarations: [AppComponent, SidemenuComponent, ZSidemenuComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgPipesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    AppAvailability,
    InAppBrowser,
    Network,
    Dialogs,
    AppVersion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
