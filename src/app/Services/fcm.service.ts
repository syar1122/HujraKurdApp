import { Injectable } from "@angular/core";
import { Platform, ToastController, NavController } from "@ionic/angular";
import { AngularFirestore } from "angularfire2/firestore";
import { FCM } from "@ionic-native/fcm/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Injectable({
  providedIn: "root",
})
export class FcmService {
  constructor(
    private fcm: FCM,
    private toastController: ToastController,
    private afs: AngularFirestore,
    private platform: Platform,
    private inAppBrowser: InAppBrowser,
    private navcntrl: NavController
  ) {}

  async getToken() {
    this.fcm.getToken().then((token) => {
      this.saveToken(token);
    });

    this.fcm.onTokenRefresh().subscribe((token) => {
      this.saveToken(token);
    });
  }

  private saveToken(token) {
    if (!token) {
      console.log("no-token");
      return;
    }

    const devicesRef = this.afs.collection("devices");

    const data = {
      token,
    };
    console.log("token:", token);

    return devicesRef.doc(token).set(data);
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    });
    toast.present();
  }

  onNotifications() {
    this.platform.ready().then(() => {
      this.fcm.onNotification().subscribe((data) => {
        console.log(data);
        if (data.wasTapped) {
        } else {
          if (this.platform.is("ios")) {
            this.presentToast(data.aps.alert);
          } else {
            this.presentToast(data.body);
          }
        }
      });
    });
  }
}
