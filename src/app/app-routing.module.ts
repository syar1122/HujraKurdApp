import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SectionsResolverService } from './Resolver/sections-resolver.service';
import { PlaylistResolverService } from './Resolver/playlist-resolver.service';
import { Playlist1ResolverService } from './Resolver/playlist1-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'sections/:id',
    resolve: {
      section: SectionsResolverService
    },
    loadChildren: () => import('./Pages/sections/sections.module').then(m => m.SectionsPageModule)
  },
  {
    path: 'sections/playlists/:id',
    resolve: {
      playlist: PlaylistResolverService,
      playlistData: Playlist1ResolverService
    },
    loadChildren: () => import('./Pages/playlist-item/playlist-item.module').then(m => m.PlaylistItemPageModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./Pages/videos/videos.module').then(m => m.VideosPageModule)
  },
  {
    path: 'channels',
    loadChildren: () => import('./Pages/channels/channels.module').then(m => m.ChannelsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
