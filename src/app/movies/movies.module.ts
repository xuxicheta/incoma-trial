import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListPageComponent } from './movie-list-page/movie-list-page.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieListElementComponent } from './movie-list-element/movie-list-element.component';
import { FavoriteStarModule } from '../utility/favorite-star/favorite-star.module';



@NgModule({
  declarations: [HeaderComponent, MovieDetailsComponent, MovieListPageComponent, FavoritesComponent, MovieListComponent, MovieListElementComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FavoriteStarModule,
  ],
  exports: [HeaderComponent, MovieDetailsComponent, MovieListPageComponent, FavoritesComponent]
})
export class MoviesModule { }
