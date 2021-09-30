import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { YTService } from 'src/app/Services/yt.service';
import { YoutubeS, YoutubeP } from 'src/app/Youtube.modul';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss'],
})
export class SectionsPage implements OnInit {
  section: any;
  playlist: any[] = [];

  public showSpinner: boolean = true;



  constructor(private route: ActivatedRoute, private yt: YTService, private router: Router) { }

  async ngOnInit() {
    if (this.route.snapshot.data['section']) {
      console.log(this.route.snapshot.data['section'].items[0])
      this.section = this.route.snapshot.data['section'].items[0];

      console.log(this.section.contentDetails.playlists)

      for (let index = 0; index < this.section.contentDetails.playlists.length; index++) {


        this.yt.getPlaylist(this.section.contentDetails.playlists[index]).subscribe(async res => {
          console.log(res);

          this.playlist[index] = res;



          if (this.playlist.indexOf(this.playlist.length - 1)) { this.showSpinner = false; }
        });



      }


      // for (let play of this.section.contentDetails.playlists) {

      //   this.yt.getPlaylist(play).subscribe(async res => {
      //     console.log(res);

      //      this.playlist.push(res);
      //     this.showSpinner = false;
      //   });

      // }


      console.log("تهە پلایلحس", this.playlist)
    }
  }

  onPlaylistOpen(id) {
    this.router.navigateByUrl('/sections/playlists/' + id);

  }

}
