import { Injectable } from '@angular/core';
import { EntityStore, EntityState } from 'src/app/store/entity-store';
import { Movie } from '../Movie';
import { ApiResponse } from '../api-response.interface';

export interface MoviesStateContent extends EntityState<Movie> {
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesState extends EntityStore<Movie, MoviesStateContent> {

  constructor() {
    super({
      total: 0,
    }, {
      idKey: 'id',
    });
  }

  setResponse(response: ApiResponse<Movie>) {
    this.setEntities(response.results);
    this.update({ total: response.total_results });
  }
}
