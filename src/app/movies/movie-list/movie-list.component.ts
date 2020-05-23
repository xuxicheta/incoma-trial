import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Movie } from '../Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit, OnChanges {
  public firstTime = true;
  @Input() movies: Movie[];
  @Input() loading: boolean;
  @Input() error: Error;
  @Input() total: number;

  @Output() loadMore = new EventEmitter();

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
}
