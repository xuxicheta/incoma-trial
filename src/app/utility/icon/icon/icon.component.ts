import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { IconList } from '../icon-set';
import { IconService } from '../icon.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
  @HostBinding('style.fill')
  @Input() color = 'black';

  @Input()
  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  size = 24;

  @HostBinding('innerHTML') innerHTML: string;

  @Input()
  set icon(icon: IconList) {
    this.innerHTML = this.iconService.IconSet[icon];
  }

  constructor(
    private iconService: IconService,
  ) { }
}
