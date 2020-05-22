import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieApiService } from '../movie-api.service';
import { tap, switchMap, debounceTime } from 'rxjs/operators';
import { MoviesState } from '../state/movies.state';

@Component({
  selector: 'app-movie-list-page',
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.css']
})
export class MovieListPageComponent implements OnInit, OnDestroy {
  public queryControl = new FormControl();
  public movies$ = this.moviesState.selectAll();
  private sub = new Subscription();


  constructor(
    private movieApiService: MovieApiService,
    private moviesState: MoviesState,
  ) { }

  ngOnInit() {
    this.sub.add(this.querySubscription());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private querySubscription(): Subscription {
    return this.queryControl.valueChanges.pipe(
      debounceTime(300),
      switchMap((query: string) => this.movieApiService.search(query)),
      tap(response => this.moviesState.setResponse(response))
    )
      .subscribe();
  }
}
