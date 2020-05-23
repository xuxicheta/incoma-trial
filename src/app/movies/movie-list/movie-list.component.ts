import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
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

}
