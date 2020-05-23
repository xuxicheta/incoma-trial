import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  public queryControl = new FormControl();
  public movies$ = this.moviesState.selectAll();
  public loading$ = this.moviesState.selectLoading();
  public error$ = this.moviesState.selectError();


  constructor(
    private movieListPageService: MovieListPageService,
    private moviesState: MoviesState,
  ) { }

  ngOnInit() {
    this.sub.add(this.querySubscription());

    // of('all').pipe(
    //   this.movieListPageService.onQueryOperator(),
    // ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private querySubscription(): Subscription {
    return this.queryControl.valueChanges.pipe(
      this.movieListPageService.onQueryOperator(),
    )
      .subscribe();
  }
}
