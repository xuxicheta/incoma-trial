import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { Movie } from '../Movie';
import { debounceTime, switchMap, filter, pluck } from 'rxjs/operators';
import { MovieApiService } from '../movie-api.service';
import { MoviesState } from '../state/movies.state';
import { handleSetApi, handleUpsertApi } from 'src/app/store/store-api-handlers';

@Injectable()
export class MovieListPageService {

  constructor(
    private movieApiService: MovieApiService,
    private moviesState: MoviesState,
  ) { }

  onQuerySetOperator(): OperatorFunction<string, Movie[]> {
    return input$ => input$.pipe(
      debounceTime(500),
      filter((value) => !!value),
      switchMap((query: string) => this.movieApiService.search(query).pipe(
        this.moviesState.updatePaging(),
        pluck('results'),
        handleSetApi(this.moviesState),
      )),
    );
  }

  onQueryUpdateOperator(): OperatorFunction<string, Movie[]> {
    return input$ => input$.pipe(
      switchMap((query: string) => {
        const page = this.moviesState.getValue().page;

        return this.movieApiService.search(query, `${page + 1}`).pipe(
          this.moviesState.updatePaging(),
          pluck('results'),
          handleUpsertApi(this.moviesState),
        );
      }),
    );
  }
}
