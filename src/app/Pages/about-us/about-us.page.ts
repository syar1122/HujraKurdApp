import { Component, OnInit, Renderer2, Input, ElementRef } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Platform } from "@ionic/angular";
import {
  InAppBrowser,
  InAppBrowserObject,
} from "@ionic-native/in-app-browser/ngx";
import { AppAvailability } from "@ionic-native/app-availability/ngx";

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.page.html",
  styleUrls: ["./about-us.page.scss"],
})
export class AboutUsPage implements OnInit {
  @Input("header") header: any;
  lastX: any;
  public isIos: boolean;
  public version;

  constructor(
    private renderer: Renderer2,
    private appV: AppVersion,
    private platform: Platform,
    private inAppBrowser: InAppBrowser,
    private appAvailability: AppAvailability
  ) {
    appV.getVersionNumber().then(
      (appV) => {
        this.version = appV;
      },
      (err) => {
        window.alert(JSON.stringify(err));
      }
    );
  }

  ngOnInit() {}

  logScroll(event) {
    if (event.detail.scrollTop > Math.max(0, this.lastX)) {
      console.log("hide Header");
      this.renderer.setStyle(
        this.header,
        "margin-top",
        `-${this.header.clientHeight}px`
      );
      this.renderer.setStyle(this.header, "transition", "margin-top 400ms");
    } else if (
      event.detail.scrollTop < Math.max(0, this.lastX) &&
      event.detail.scrollTop === 0
    ) {
      console.log("show header");
      this.renderer.setStyle(this.header, "margin-top", "0px");
      this.renderer.setStyle(this.header, "transition", "margin-top 400ms");
    }

    this.lastX = event.detail.scrollTop;
  }

  scrollStart(header) {
    this.header = header.el;
  }

  openFB() {
    let app;

    if (this.platform.is("ios")) {
      app = "fb://";
    } else if (this.platform.is("android")) {
      app = "com.facebook.katana";
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create(
        "https://www.facebook.com/" + "حوجرەی-کوردستان-103306601323783"
      );
      return;
    }

    this.appAvailability.check(app).then(
      (yes: boolean) => {
        console.log(app + " is available");
        // Success
        // App exists
        const browser: InAppBrowserObject = this.inAppBrowser.create(
          "fb://facewebmodal/f?href=" +
            "https://www.facebook.com/%D8%AD%D9%88%D8%AC%D8%B1%DB%95%DB%8C-%DA%A9%D9%88%D8%B1%D8%AF%D8%B3%D8%AA%D8%A7%D9%86-103306601323783",
          "_system"
        );
      },
      (no: boolean) => {
        // Error
        // App does not exist
        // Open Web URL
        console.log(app + " is not available");
        const browser: InAppBrowserObject = this.inAppBrowser.create(
          "https://www.facebook.com/" + "حوجرەی-کوردستان-103306601323783",
          "_system"
        );
      }
    );
  }

  openTL() {
    const browser: InAppBrowserObject = this.inAppBrowser.create(
      "https://t.me/joinchat/AAAAAEhqsPFKNiA2GE2WwQ?fbclid=IwAR1gHPuvlrsA-h1tAzR28bntr9INPrzlTBqAuGxkrZ6qScimfmaRQaNZgW8",
      "_system"
    );
  }

  openYT() {
    const browser: InAppBrowserObject = this.inAppBrowser.create(
      "https://www.youtube.com/channel/UCtl99ZlC0VHb6-voQJqhpDg",
      "_system"
    );
  }

  // onReport() {
  //   this.eComposer.open({
  //     to: "syars66@gmail.com",
  //     subject: "Report Hujra app",
  //   });
  // }
}
