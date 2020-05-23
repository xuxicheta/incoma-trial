import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Movie } from '../Movie';
import { FavoriteElementChange } from './favorite-element-change.type';
import { movieListAnimations } from './movie-list.animations';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: movieListAnimations,
})
export class MovieListComponent implements OnChanges {
  public firstTime = true;
  @Input() movies: Movie[] = [];
  @Input() loading: boolean;
  @Input() error: Error;
  @Input() total = 0;

  @Output() loadMore = new EventEmitter();
  @Output() favoriteElementChange = new EventEmitter<FavoriteElementChange>();

  ngOnChanges() {
    this.checkFirst();
  }

  // dont show 'not found' if first time
  private checkFirst() {
    if (this.firstTime) {
      this.firstTime = !this.loading;
    }
  }

  public trackBy(index: number, item: Movie): number {
    return item.id;
  }

  onFavoriteChange(movie: Movie, isFavorite: boolean) {
    this.favoriteElementChange.emit({
      movie,
      isFavorite,
    });
  }
}
