import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { Movie } from '../Movie';
import { debounceTime, switchMap, filter, pluck } from 'rxjs/operators';
import { MovieApiService } from '../movie-api.service';
import { MoviesState } from '../state/movies.state';
import { handleSetApi } from 'src/app/store/store-api-handlers';

@Injectable()
export class MovieListPageService {

  constructor(
    private movieApiService: MovieApiService,
    private moviesState: MoviesState,
  ) { }

  onQueryOperator(): OperatorFunction<string, Movie[]> {
    return input$ => input$.pipe(
      debounceTime(500),
      filter((value) => !!value),
      switchMap((query: string) => this.movieApiService.search(query).pipe(
        this.moviesState.updateTotal(),
        pluck('results'),
        handleSetApi(this.moviesState),
      )),
    )
  }
}
