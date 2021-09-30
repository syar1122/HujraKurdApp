import { Component, OnInit } from '@angular/core';
import { YTService } from 'src/app/Services/yt.service';

@Component({
  selector: 'app-z-sidemenu',
  templateUrl: './z-sidemenu.component.html',
  styleUrls: ['./z-sidemenu.component.scss'],
})
export class ZSidemenuComponent implements OnInit {
  labels = [];


  constructor(private yt: YTService) { }

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

}
