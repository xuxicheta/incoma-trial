import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable()
export class SpinnerOverlayService {
  private spinnerSrc = 'assets/spinner/spinner.svg';
  private renderer: Renderer2;
  private elPosition: string;

  constructor(
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public reveal(el: HTMLElement, overlay: HTMLDivElement): void {
    this.elPosition = getComputedStyle(el).position;
    if (this.elPosition !== 'absolute') {
      this.renderer.setStyle(el, 'position', 'relative');
    }
    this.renderer.setStyle(overlay, 'display', '');
  }

  public hide(el: HTMLElement, overlay: HTMLDivElement): void {
    if (this.elPosition) {
      this.renderer.setStyle(el, 'position', this.elPosition);
    }
    this.renderer.setStyle(overlay, 'display', 'none');
  }

  public createOverlay(el: HTMLElement): HTMLDivElement {
    const overlay: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(overlay, 'loading-overlay');

    const img: HTMLImageElement = this.renderer.createElement('img');
    this.renderer.addClass(img, 'loading-spinner');
    this.renderer.setAttribute(img, 'src', this.spinnerSrc);

    this.renderer.appendChild(overlay, img);
    this.renderer.appendChild(el, overlay);
    return overlay;
  }
}
