import { Component, OnInit } from '@angular/core';
import { YTService } from 'src/app/Services/yt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  public playlists = [];
  public channel1;
  public channel2;
  public channel3;

  channeslId: string = "UCtl99ZlC0VHb6-voQJqhpDg";
  pageToken: string = '';
  public showSpinner1: boolean = true;




  constructor(private yt: YTService, private router: Router) { }

  ngOnInit() {
    this.yt.getChannels("UCtl99ZlC0VHb6-voQJqhpDg").subscribe(res => {
      console.log(res);
      this.channel1 = res;
    });

    this.yt.getChannels("UCMXEF8afYk7QOQonGzge37w").subscribe(res => {
      console.log(res);
      this.channel2 = res;
    });

    this.yt.getChannels("UCJkuMmquy3763MjrMUIW82Q").subscribe(res => {
      console.log(res);
      this.channel3 = res;
    });

    this.yt.getChannelPlaylist("UCtl99ZlC0VHb6-voQJqhpDg", "", 10).subscribe(res => {

      this.playlists.push(...res.items);
      this.showSpinner1 = false;
    });


    console.log("playlist", this.playlists);


  }

  onPlaylistOpen(id) {
    this.router.navigateByUrl('/sections/playlists/' + id);
  }

  segmentChanged(event) {
    this.playlists = [];
    this.showSpinner1 = true;
    this.channeslId = event.detail.value;

    if (event.detail.value == 'UCtl99ZlC0VHb6-voQJqhpDg') {

      this.yt.getChannelPlaylist(event.detail.value, "", 10).subscribe(res => {
        console.log(res)
        this.pageToken = res.nextPageToken;
        this.playlists.push(...res.items);
        this.showSpinner1 = false;
      });
    } else {
      this.yt.getChannelPlaylist(event.detail.value, "", 50).subscribe(res => {
        console.log(res)
        this.pageToken = res.nextPageToken;
        this.playlists.push(...res.items);
        this.showSpinner1 = false;
      });
    }
  }

  loadData(event) {
    if (this.pageToken != null) {
      this.yt.getChannelPlaylist(this.channeslId, this.pageToken, 10).subscribe(res => {
        console.log(res);
        this.pageToken = res.nextPageToken;
        this.playlists.push(...res.items);
      });

      event.target.complete();
    } else {
      console.log("event disabled", event)
      event.target.disabled = true;
    }

  }

}
