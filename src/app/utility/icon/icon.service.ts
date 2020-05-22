import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconSet } from './icon-set';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  public readonly IconSet = this.createBypassedIconSet();

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  createBypassedIconSet(): typeof IconSet {
    return Object.keys(IconSet).reduce((acc, key) => {
      acc[key] = this.sanitizer.bypassSecurityTrustHtml(IconSet[key]);
      return acc;
    }, {} as typeof IconSet);
  }
}
