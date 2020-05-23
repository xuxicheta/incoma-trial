import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { EntityState, EntityStore } from 'src/app/store/entity-store';
import { persistState } from 'src/app/store/persist-state';
import { LocalstorageKeys, StorageService } from 'src/app/utility/storage/storage.service';
import { Movie } from '../Movie';

export interface FavoritesStateContent extends EntityState<Movie> {
}

const initialState = (): Partial<FavoritesStateContent> => ({
});

@Injectable({
  providedIn: 'root'
})
export class FavoritesState extends EntityStore<Movie, FavoritesStateContent> {

  constructor(
    private storageService: StorageService,
  ) {
    super(
      initialState(),
      {
        idKey: 'id',
      },
    );

    persistState(this, LocalstorageKeys.Favorites, this.storageService);
  }

  selectIds() {
    return this.select().pipe(
      pluck('ids'),
    );
  }

  changeFavorite(movie: Movie, isFavorite: boolean) {
    if (isFavorite) {
      this.upsertEntity(movie.id, movie);
    } else {
      this.removeEntity(movie.id);
    }
  }
}
