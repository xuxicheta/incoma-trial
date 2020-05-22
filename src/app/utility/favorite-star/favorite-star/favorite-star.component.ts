import { Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-favorite-star',
  templateUrl: './favorite-star.component.html',
  styleUrls: ['./favorite-star.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FavoriteStarComponent {
  @Input() checked: boolean;
  @Output() checkedChange = new EventEmitter<boolean>();

  @HostListener('click')
  onClick() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
