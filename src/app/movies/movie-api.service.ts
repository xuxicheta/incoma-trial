import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_KEY } from '../api-key.provider';
import { ApiResponse } from './api-response.interface';
import { Movie } from './Movie';
import { MovieCredits } from './MovieCredits';
import { MovieDetails } from './MovieDetails';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(
    private http: HttpClient,
    @Inject(API_KEY) private apiKey: string,
  ) {
  }

  search(query: string, page = '1'): Observable<ApiResponse<Movie>> {
    return this.http.get<ApiResponse<Movie>>('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: this.apiKey,
        query,
        page,
      }
    });
  }

  movie(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: this.apiKey,
      }
    });
  }

  credits(id: number): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      params: {
        api_key: this.apiKey,
      }
    });
  }

}
