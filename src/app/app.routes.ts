import { Routes } from '@angular/router';
import { MovieListPageComponent } from './movies/movie-list-page/movie-list-page.component';
import { FavoritesComponent } from './movies/favorites/favorites.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';

export const appRoutes: Routes = [
  { path: 'list', component: MovieListPageComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'details/:id', component: MovieDetailsComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/list', pathMatch: 'full' },
];
