import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MovieApiService } from '../movie-api.service';
import { Observable } from 'rxjs';
import { MovieDetails } from '../MovieDetails';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsResolver implements Resolve<MovieDetails> {
  constructor(
    private movieApiService: MovieApiService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDetails> {
    const id =  +route.paramMap.get('id');

    return this.movieApiService.movie(id);
  }
}
