import { Route } from '@angular/router';
import { oidcRoutes } from 'imng-oidc-client';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [{
  path: 'artists',
  loadChildren: () =>
    import('./modules/artists-module/artists.module').then(
      (m) => m.ArtistsModule,
    ),
  //canActivateChild: [AuthGuard],
}, {
  path: 'songs',
  loadChildren: () =>
    import('./modules/songs-module/songs.module').then(
      (m) => m.SongsModule,
    ),
  //canActivateChild: [AuthGuard],
},
...oidcRoutes,
{ path: '**', component: HomeComponent },];
