import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { YTService } from "src/app/Services/yt.service";
import { Platform } from "@ionic/angular";

import {
  InAppBrowserObject,
  InAppBrowser,
} from "@ionic-native/in-app-browser/ngx";
import { YoutubeP, YoutubeS } from "src/app/Youtube.modul";

@Component({
  selector: "app-playlist-item",
  templateUrl: "./playlist-item.page.html",
  styleUrls: ["./playlist-item.page.scss"],
})
export class PlaylistItemPage implements OnInit {
  public title: string;
  public videos: YoutubeS[];
  public pageToken: string;
  public showSpinner: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private yt: YTService,
    private platform: Platform,
    private inAppBrowser: InAppBrowser
  ) {}

  ngOnInit() {
    if (
      this.route.snapshot.data["playlist"] &&
      this.route.snapshot.data["playlistData"]
    ) {
      this.title = this.route.snapshot.data["playlistData"].snippet.title;
      this.videos = this.route.snapshot.data["playlist"].items;
      this.pageToken = this.route.snapshot.data["playlist"].nextPageToken;
    }

    if (this.videos) {
      this.showSpinner = false;
    }
  }

  loadData(event) {
    if (this.pageToken) {
      this.yt
        .getPlaylistItems(
          this.route.snapshot.data["playlistData"].id,
          this.pageToken
        )
        .subscribe((res) => {
          this.videos = this.videos.concat(res.items);
          this.pageToken = res.nextPageToken;
        });

      event.target.complete();
    } else {
      event.target.disabled = true;
    }
  }

  playVideo(videoId) {
    const browser: InAppBrowserObject = this.inAppBrowser.create(
      "https://www.youtube.com/watch?v=" + videoId,
      "_system"
    );
  }
}
