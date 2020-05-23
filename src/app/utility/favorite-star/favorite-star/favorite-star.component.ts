import { Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation, HostBinding } from '@angular/core';
import { favoriteStarAnimations } from './favorite-star.animations';

@Component({
  selector: 'app-favorite-star',
  templateUrl: './favorite-star.component.html',
  styleUrls: ['./favorite-star.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: favoriteStarAnimations,
})
export class FavoriteStarComponent {
  @Input() checked: boolean;
  @Output() checkedChange = new EventEmitter<boolean>();

  @HostBinding('@star')
  animation = 0;

  @HostListener('click')
  onClick() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
    this.animation++;
  }
}
