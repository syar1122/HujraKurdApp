import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistItemPageRoutingModule } from './playlist-item-routing.module';

import { PlaylistItemPage } from './playlist-item.page';
import { NgPipesModule } from 'ngx-pipes';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistItemPageRoutingModule,
    NgPipesModule,
    ComponentsModule
  ],
  providers: [YoutubeVideoPlayer],
  declarations: [PlaylistItemPage]
})
export class PlaylistItemPageModule { }
