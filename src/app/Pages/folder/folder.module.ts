import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { NgPipesModule } from 'ngx-pipes';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgPipesModule,
    FolderPageRoutingModule,
    ComponentsModule
  ],
  providers: [YoutubeVideoPlayer],
  declarations: [FolderPage]

})
export class FolderPageModule { }
