import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../Movie';

@Component({
  selector: 'app-movie-list-element',
  templateUrl: './movie-list-element.component.html',
  styleUrls: ['./movie-list-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListElementComponent implements OnInit {
  @Input() movie: Movie;
  @Output() activeChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
