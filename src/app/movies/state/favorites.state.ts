import { Injectable } from '@angular/core';
import { EntityState, EntityStore } from 'src/app/store/entity-store';
import { Movie } from '../Movie';
import { map } from 'rxjs/operators';

export interface FavoritesStateContent extends EntityState<Movie> {
}

const initialState = (): Partial<FavoritesStateContent> => ({
});

@Injectable({
  providedIn: 'root'
})
export class FavoritesState extends EntityStore<Movie, FavoritesStateContent> {

  constructor() {
    super(
      initialState(),
      {
        idKey: 'id',
      },
    );
  }

  selectIds() {
    return this.select().pipe(
      map(() => this.ids),
    );
  }
}
