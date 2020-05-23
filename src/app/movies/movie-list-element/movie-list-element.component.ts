import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../Movie';
import { ID } from 'src/app/store/entity-store';

@Component({
  selector: 'app-movie-list-element',
  templateUrl: './movie-list-element.component.html',
  styleUrls: ['./movie-list-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListElementComponent implements OnInit {
  public checked: boolean;
  @Input() movie: Movie;

  @Input() set favoritesIds(favoritesIds: ID[]) {
    this.checked = favoritesIds.indexOf(this.movie.id) !== -1;
  }

  @Output() favoriteChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
