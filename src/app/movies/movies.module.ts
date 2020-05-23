import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FavoriteStarModule } from '../utility/favorite-star/favorite-star.module';
import { SpinnerModule } from '../utility/spinner/spinner.module';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { HeaderComponent } from './header/header.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { InFavoritesPipe } from './movie-list-element/in-favorites.pipe';
import { MovieListElementComponent } from './movie-list-element/movie-list-element.component';
import { MovieListPageComponent } from './movie-list-page/movie-list-page.component';
import { MovieListComponent } from './movie-list/movie-list.component';



@NgModule({
  declarations: [
    FavoritesPageComponent,
    HeaderComponent,
    InFavoritesPipe,
    MovieDetailsPageComponent,
    MovieListComponent,
    MovieListElementComponent,
    MovieListPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FavoriteStarModule,
    SpinnerModule,
  ],
  exports: [HeaderComponent, MovieDetailsPageComponent, MovieListPageComponent, FavoritesPageComponent]
})
export class MoviesModule { }
