import { Component, OnInit } from '@angular/core';
import { YTService } from 'src/app/Services/yt.service';
import { Platform } from '@ionic/angular';

import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {

  pages = [
    {
      title: 'سەرەتا',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'وانەکان',
      url: 'videos',
      icon: 'videocam'
    },
    {
      title: 'مەنهەج',
      url: '/sections/playlists/PL3pZVP4Vy5vfwliRNsWukPo_91Bl9qmuv',
      icon: 'book'
    },
    {
      title: 'چەناڵەکان',
      url: 'channels',
      icon: 'logo-youtube'
    },
    {
      title: 'دەربارە',
      url: 'about-us',
      icon: 'information-circle'
    },
    {
      title: 'ئاگاداریەکان',
      url: 'message',
      icon: 'earth'
    }

  ]

  public isLabelOpen: boolean = false;

  labels = [];

  constructor(private yt: YTService,
    public platform: Platform,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.yt.getSections('UCtl99ZlC0VHb6-voQJqhpDg').subscribe(res => {
      for (let el of res['items']) {
        this.labels.push(
          {
            title: el.snippet.title,
            id: el.id
          });
      }
    });
  }


  openYoutubeProfile() {
    const browser: InAppBrowserObject = this.inAppBrowser
      .create('https://www.youtube.com/channel/UCtl99ZlC0VHb6-voQJqhpDg', '_system');
  }


  openFacebookProfile() {

    let app;

    if (this.platform.is('ios')) {
      app = 'fb://';
    } else if (this.platform.is('android')) {
      app = 'com.facebook.katana';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.facebook.com/' + 'حوجرەی-کوردستان-103306601323783');
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available')
          // Success
          // App exists
          const browser: InAppBrowserObject = this.inAppBrowser.create('fb://facewebmodal/f?href=' + 'https://www.facebook.com/%D8%AD%D9%88%D8%AC%D8%B1%DB%95%DB%8C-%DA%A9%D9%88%D8%B1%D8%AF%D8%B3%D8%AA%D8%A7%D9%86-103306601323783', '_system');
        },
        (no: boolean) => {
          // Error
          // App does not exist
          // Open Web URL
          console.log(app + ' is not available')
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.facebook.com/' + 'حوجرەی-کوردستان-103306601323783', '_system');
        }
      );
  }



  openTelegramProfile() {

    // let app;

    // if (this.platform.is('ios')) {
    //   app = 'tg://';
    // } else if (this.platform.is('android')) {
    //   app = 'org.telegram.messenger';
    // } else {
    //   const browser: InAppBrowserObject = this.inAppBrowser
    //     .create('https://t.me/joinchat/AAAAAEhqsPFKNiA2GE2WwQ?fbclid=IwAR1gHPuvlrsA-h1tAzR28bntr9INPrzlTBqAuGxkrZ6qScimfmaRQaNZgW8', '_system');
    //   return;
    // }


    const browser: InAppBrowserObject = this.inAppBrowser
      .create('https://t.me/joinchat/AAAAAEhqsPFKNiA2GE2WwQ?fbclid=IwAR1gHPuvlrsA-h1tAzR28bntr9INPrzlTBqAuGxkrZ6qScimfmaRQaNZgW8', '_system');

  }

}
