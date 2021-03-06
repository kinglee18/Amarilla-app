import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { InformacionProvider } from "../providers/informacion/informacion";

import { Geolocation } from "@ionic-native/geolocation";
import { CallNumber } from "@ionic-native/call-number";
import { EmailComposer } from "@ionic-native/email-composer";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { HTTP } from "@ionic-native/http";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { BlogProvider } from "../providers/blog/blog";
import { ComponentsModule } from "../components/components.module";
import { TabsPage } from "../pages/tabs/tabs";

@NgModule({
  declarations: [MyApp, TabsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    InformacionProvider,
    Geolocation,
    CallNumber,
    EmailComposer,
    InAppBrowser,
    HTTP,
    BlogProvider
  ]
})
export class AppModule {}
