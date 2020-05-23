import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MovieApiService } from '../movie-api.service';
import { Observable } from 'rxjs';
import { MovieCredits } from '../MovieCredits';

@Injectable({
  providedIn: 'root',
})
export class MovieCreditsResolver implements Resolve<MovieCredits> {
  constructor(
    private movieApiService: MovieApiService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieCredits> {
    const id = +route.paramMap.get('id');

    return this.movieApiService.credits(id);
  }
}
