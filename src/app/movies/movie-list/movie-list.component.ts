import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Movie } from '../Movie';
import { ID } from 'src/app/store/entity-store';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit, OnChanges {
  public firstTime = true;
  @Input() movies: Movie[] = [];
  @Input() loading: boolean;
  @Input() error: Error;
  @Input() total = 0;
  @Input() favoritesIds: ID[];

  @Output() loadMore = new EventEmitter();
  @Output() favoriteElementChange = new EventEmitter<{ movie: Movie, isFavorite: boolean }>();

  constructor() { }

  ngOnInit(): void {
  }

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
