import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../Movie';

@Component({
  selector: 'app-movie-list-element',
  templateUrl: './movie-list-element.component.html',
  styleUrls: ['./movie-list-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListElementComponent {
  @Input() movie: Movie;
  @Output() favoriteChange = new EventEmitter<boolean>();
}
