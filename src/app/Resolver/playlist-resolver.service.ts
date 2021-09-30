import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { YTService } from '../Services/yt.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistResolverService implements Resolve<any>{

  constructor(private yt: YTService) { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {

    let id = route.paramMap.get('id');
    return this.yt.getPlaylistItems(id, '');


  }
}
