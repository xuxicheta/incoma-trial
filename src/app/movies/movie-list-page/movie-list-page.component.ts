import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, of } from 'rxjs';
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


  constructor(
    private movieListPageService: MovieListPageService,
    private moviesState: MoviesState,
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
}
