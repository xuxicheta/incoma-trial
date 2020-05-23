import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { MovieCredits } from '../MovieCredits';
import { MovieDetails } from '../MovieDetails';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent {
  public imgPrefix = 'https://image.tmdb.org/t/p/w300/';
  public movie$ = this.pluckMovieFromRoute();
  public credits$ = this.pluckCreditsFromRoute();

  constructor(
    private route: ActivatedRoute,
  ) { }


  private pluckMovieFromRoute() {
    return this.route.data.pipe<MovieDetails>(
      pluck('movie')
    );
  }

  private pluckCreditsFromRoute() {
    return this.route.data.pipe<MovieCredits>(
      pluck('credits')
    );
  }

}
