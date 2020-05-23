import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MovieApiService } from '../movie-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieCreditsResolver implements Resolve<any> {
  constructor(
    private movieApiService: MovieApiService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = +route.paramMap.get('id');

    return this.movieApiService.credits(id);
  }
}
