import { Pipe, PipeTransform } from '@angular/core';
import { FavoritesState } from '../state/favorites.state';
import { Observable } from 'rxjs';
import { ID } from 'src/app/store/entity-store';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'inFavorites'
})
export class InFavoritesPipe implements PipeTransform {

  constructor(
    private favoritesState: FavoritesState,
  ) { }

  transform(movieId: ID): Observable<boolean> {
    return this.favoritesState.selectIds().pipe(
      map(ids => ids.includes(movieId))
    );
  }

}
