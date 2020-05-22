import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteStarComponent } from './favorite-star/favorite-star.component';
import { IconModule } from '../icon/icon.module';



@NgModule({
  declarations: [FavoriteStarComponent],
  imports: [
    CommonModule,
    IconModule,
  ],
  exports: [
    FavoriteStarComponent
  ]
})
export class FavoriteStarModule { }
