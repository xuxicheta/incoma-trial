import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY } from '../api-key.provider';
import { ApiResponse } from './api-response.interface';
import { Movie } from './Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(
    private http: HttpClient,
    @Inject(API_KEY) private apiKey: string,
  ) {
  }

  search(query: string, page = '1'): Observable<any> {
    return this.http.get<ApiResponse<Movie>>('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: this.apiKey,
        query,
        page,
      }
    });
  }

  movie(id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: this.apiKey,
      }
    });
  }

  credits(id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      params: {
        api_key: this.apiKey,
      }
    });
  }

}
