import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { Movie } from '../Movie';
import { FavoritesState } from '../state/favorites.state';
import { MoviesState } from '../state/movies.state';
import { MovieListPageService } from './movie-list-page.service';

@Component({
  selector: 'app-movie-list-page',
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.css'],
  providers: [MovieListPageService]
})
export class MovieListPageComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  public queryControl = new FormControl('all');
  public movies$ = this.moviesState.selectAll();
  public loading$ = this.moviesState.selectLoading();
  public error$ = this.moviesState.selectError();
  public total$ = this.moviesState.select(s => s.total);
  public favoritesIds$ = this.favoritesState.selectIds();


  constructor(
    private movieListPageService: MovieListPageService,
    private moviesState: MoviesState,
    private favoritesState: FavoritesState,
  ) { }

  ngOnInit() {
    this.sub.add(this.querySubscription());

    of('all').pipe(
      this.movieListPageService.onQuerySetOperator(),
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onLoadMore(): void {
    this.sub.add(this.loadMore());
  }

  private querySubscription(): Subscription {
    return this.queryControl.valueChanges.pipe(
      this.movieListPageService.onQuerySetOperator(),
    )
      .subscribe();
  }

  private loadMore(): Subscription {
    return of(this.queryControl.value).pipe(
      this.movieListPageService.onQueryUpdateOperator()
    )
      .subscribe();
  }

  public onFavoriteElementChange(evt: { movie: Movie; isFavorite: boolean }) {
    if (evt.isFavorite) {
      this.favoritesState.upsertEntity(evt.movie.id, evt.movie);
    } else {
      this.favoritesState.removeEntity(evt.movie.id);
    }
  }
}
