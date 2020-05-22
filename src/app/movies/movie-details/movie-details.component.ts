import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private imgPrefix = 'https://image.tmdb.org/t/p/w300/';
  cast: any[];
  error: boolean;
  loading: boolean;
  movie: any;
  posterSrc: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
