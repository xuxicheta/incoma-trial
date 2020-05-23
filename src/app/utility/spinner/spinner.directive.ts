import { Directive, Input, ElementRef } from '@angular/core';
import { SpinnerOverlayService } from './spinner-overlay.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'label[spinner]',
  providers: [SpinnerOverlayService]
})
export class SpinnerDirective {

  @Input()
  set spinner(loading: boolean) {
    loading
      ? this.spinnerOverlayService.reveal(this.el.nativeElement, this.overlay)
      : this.spinnerOverlayService.hide(this.el.nativeElement, this.overlay);
  }

  private overlayRef: HTMLDivElement;

  get overlay(): HTMLDivElement {
    return this.overlayRef = this.overlayRef || this.spinnerOverlayService.createOverlay(this.el.nativeElement);
  }

  constructor(
    private spinnerOverlayService: SpinnerOverlayService,
    private el: ElementRef<HTMLElement>,
  ) { }

}
