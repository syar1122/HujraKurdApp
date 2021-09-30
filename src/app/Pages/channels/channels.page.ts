import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { YTService } from "src/app/Services/yt.service";
import { HttpClient } from "@angular/common/http";
import {
  InAppBrowser,
  InAppBrowserObject,
} from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.page.html",
  styleUrls: ["./channels.page.scss"],
})
export class ChannelsPage implements OnInit {
  channelId1 = "UCtl99ZlC0VHb6-voQJqhpDg";
  channelId2 = "UCMXEF8afYk7QOQonGzge37w";
  channelId3 = "UCJkuMmquy3763MjrMUIW82Q";
  channel1: any;
  channel2: any;
  channel3: any;

  channels: any = [];

  constructor(
    private http: HttpClient,
    private ytService: YTService,
    private router: Router,
    private inAppBrowser: InAppBrowser
  ) {}

  ngOnInit(): void {
    this.ytService.getChannels(this.channelId1).subscribe((data) => {
      this.channel1 = data;
      this.channels.push(this.channel1);
    });
    this.ytService.getChannels(this.channelId2).subscribe((data) => {
      this.channel2 = data;
      this.channels.push(this.channel2);
    });
    this.ytService.getChannels(this.channelId3).subscribe((data) => {
      this.channel3 = data;
      this.channels.push(this.channel3);
    });
  }

  openChannel(channelId) {
    const browser: InAppBrowserObject = this.inAppBrowser.create(
      "https://www.youtube.com/channel/" + channelId,
      "_system"
    );
  }
}
