import { Component, OnInit, ViewChild } from "@angular/core";

import { Platform, ToastController, IonRouterOutlet } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { YTService } from "./Services/yt.service";
import { Network } from "@ionic-native/network/ngx";
import { Dialogs } from "@ionic-native/dialogs/ngx";
import { FcmService } from "./Services/fcm.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private yt: YTService,
    public toastController: ToastController,
    private network: Network,
    private dialog: Dialogs,
    private fcm: FcmService,
    private router: Router
  ) {
    console.log("network type", network.type);
    if (network.type == "none" || !network.type) {
      // dialog
      //   .alert("تکایە دڵنیا بەرەوە لە هەبوونی ئینتەرنێت.", "! ئینتەرنێت نییە")
      //   .then((val) => {
      //     navigator["app"].exitApp();
      //   });
      window.alert("تکایە دڵنیا بەرەوە لە هەبوونی ئینتەرنێت.");
      navigator["app"].exitApp();
    } else {
      console.log("app initialization... ");
      this.initializeApp();
    }
  }

  initializeApp() {
    this.network.onDisconnect().subscribe((val) => {
      this.dialog
        .alert("تکایە دڵنیا بەرەوە لە هەبوونی ئینتەرنێت.", "! ئینتەرنێت نەما")
        .then((val) => {
          navigator["app"].exitApp();
        });
    });

    // if (!this.network.type || this.network.type === 'none') {

    //   this.dialog.confirm("no internet connection", 'internet', ['Ok', 'Retry']).then(v => {
    //     if (v === 1) {
    //       navigator['app'].exitApp();
    //     } else if (v === 2) {
    //       this.initializeApp();
    //     }
    //   });
    // } else {
    //   this.dialog.alert(this.network.type);

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.splashScreen.hide();
      this.notificationSetup();

      this.platform.backButton.subscribeWithPriority(6666, async () => {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          console.log(this.router.url);
          this.routerOutlet.pop();
        } else if (
          this.router.url === "/home" ||
          !this.routerOutlet.canGoBack()
        ) {
          console.log(this.router.url);
          if (window.confirm("دڵنیایت دەتەوێت لە بەرنامەکە دەرچیت ؟")) {
            navigator["app"].exitApp();
          }
        }
      });
    });
  }

  ngOnInit() {}

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications();
  }
}
