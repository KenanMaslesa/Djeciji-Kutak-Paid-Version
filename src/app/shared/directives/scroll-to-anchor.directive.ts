import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[scrollToAnchor]',
})
export class ScrollToAnchorDirective {
  @Input() anchor: HTMLElement;

  @HostListener('click') onClick() {
    if (this.anchor) {
      this.scrollToAnchor(this.anchor);
    }
  }

  scrollToAnchor(anchor): void {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
  }
}
