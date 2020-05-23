import { Injectable } from '@angular/core';
import { MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EntityState, EntityStore } from 'src/app/store/entity-store';
import { ApiResponse } from '../api-response.interface';
import { Movie } from '../Movie';

export interface MoviesStateContent extends EntityState<Movie> {
  total: number;
}

const initialState = (): Partial<MoviesStateContent> => ({
  total: 0,
});

@Injectable({
  providedIn: 'root'
})
export class MoviesState extends EntityStore<Movie, MoviesStateContent> {

  constructor() {
    super(
      initialState(),
      {
        idKey: 'id',
      },
    );
  }

  public updateTotal(): MonoTypeOperatorFunction<ApiResponse<Movie>> {
    return tap((response: ApiResponse<Movie>) => this.update({ total: response.total_results }));
  }
}
