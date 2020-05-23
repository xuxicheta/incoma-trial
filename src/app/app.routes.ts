import { Routes } from '@angular/router';
import { FavoritesPageComponent } from './movies/favorites-page/favorites-page.component';
import { MovieCreditsResolver } from './movies/movie-details-page/movie-credits.resolver';
import { MovieDetailsPageComponent } from './movies/movie-details-page/movie-details-page.component';
import { MovieDetailsResolver } from './movies/movie-details-page/movie-details.resolver';
import { MovieListPageComponent } from './movies/movie-list-page/movie-list-page.component';


export const appRoutes: Routes = [
  { path: 'list', component: MovieListPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  {
    path: 'details/:id',
    component: MovieDetailsPageComponent,
    resolve: {
      movie: MovieDetailsResolver,
      credits: MovieCreditsResolver,
    },
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/list', pathMatch: 'full' },
];
