import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  favs: number[] = [];

  constructor(
  ) { }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  element(id: number) {
  }

}
