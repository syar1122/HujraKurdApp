import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  Renderer2,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { YTService } from "../../Services/yt.service";

import { Observable } from "rxjs";
import { YoutubeS } from "src/app/Youtube.modul";
import { Url } from "url";
import { Platform, ToastController, IonSlides, IonImg } from "@ionic/angular";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";
import { FcmService } from "src/app/Services/fcm.service";
import {
  InAppBrowserObject,
  InAppBrowser,
} from "@ionic-native/in-app-browser/ngx";
import { Dialogs } from "@ionic-native/dialogs/ngx";

@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public sectionsAll = [];
  public newestVideo = [];
  public showSpinner: boolean = true;
  public backBtnSub: any;
  public imgExist = true;

  newVSlideOpt = {
    slidesPerView: 1.3,
    speed: 800,
    initialSlide: 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: false,
    centeredSlides: true,
    pagination: false,
    autoHeight: true,
    spaceBetween: 10,
  };

  @ViewChild("slide", { static: false, read: ElementRef }) slide: ElementRef;
  // @ViewChild("slides", { static: false, read: ElementRef }) slides: IonSlides;

  constructor(
    private yt: YTService,
    private router: Router,
    private platform: Platform,
    private dialogs: Dialogs,
    public toastController: ToastController,
    private renderer2: Renderer2,
    private inAppBrowser: InAppBrowser
  ) {
    // this.backBtnSub = platform.backButton.subscribeWithPriority(666666, () => {
    //   if (this.constructor.name == 'FolderPage') {
    //     if (window.confirm("Are you sureyou want exite")) {
    //       navigator["app"].exitApp();
    //     }
    //   }
    // })
  }

  slidesInit(event) {
    this.renderer2.setStyle(this.slide.nativeElement, "height", "100%");
  }

  ngOnInit() {
    this.yt.getSections("UCtl99ZlC0VHb6-voQJqhpDg").subscribe((res) => {
      for (let el of res["items"]) {
        this.sectionsAll.push(
          new YoutubeS(
            el.kind,
            el.etag,
            el.id,
            el.snippet,
            el.contentDetails,
            "../../../assets/img/" + el.snippet.title + ".png"
          )
        );
      }
    });

    console.log("sections", this.sectionsAll);

    // get Newest Video
    this.getNewestVid();
  }

  async getNewestVid() {
    this.yt.getChannels("UCtl99ZlC0VHb6-voQJqhpDg").subscribe((res) => {
      this.yt
        .getNewPlaylistItems(res.contentDetails.relatedPlaylists.uploads)
        .subscribe((res) => {
          this.newestVideo.push(...res.items);
          this.showSpinner = false;
        });
    });
  }

  openSection(id) {
    this.router.navigateByUrl("/sections/" + id);
  }

  playVideo(videoId) {
    const browser: InAppBrowserObject = this.inAppBrowser.create(
      "https://www.youtube.com/watch?v=" + videoId,
      "_system"
    );
  }

  imgError(event) {
    console.log(event);
    event.srcElement.style.display = "none";
    let parent = event.path[4];
    parent.style.backgroundColor = "#248E94";
    parent.style.borderRadius = "10px";

    // section = "../../../assets/img/default.jpg";
  }
}
