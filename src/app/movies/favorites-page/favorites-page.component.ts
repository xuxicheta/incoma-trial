import { Component } from '@angular/core';
import { FavoriteElementChange } from '../movie-list/favorite-element-change.type';
import { FavoritesState } from '../state/favorites.state';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesComponent {
  public favorites$ = this.favoritesState.selectAll();

  constructor(
    private favoritesState: FavoritesState,
  ) { }

  public onFavoriteElementChange({ movie, isFavorite }: FavoriteElementChange): void {
    this.favoritesState.changeFavorite(movie, isFavorite);
  }
}
