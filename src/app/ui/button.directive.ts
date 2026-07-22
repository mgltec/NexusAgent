import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

/**
 * Replacement for PrimeNG's `pButton` directive.
 * Adds Bootstrap button styling and renders an optional icon / label into the
 * host button, matching how the app uses `<button pButton icon="..." label="...">`.
 */
@Directive({
  standalone: false,
  selector: '[pButton]',
})
export class ButtonDirective implements OnInit, OnChanges {
  @Input() icon: string | undefined;
  @Input() label: string | undefined;

  private iconEl: HTMLElement | null = null;
  private labelEl: HTMLElement | null = null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'btn');
    if (!this.el.nativeElement.className.includes('btn-')) {
      this.renderer.addClass(this.el.nativeElement, 'btn-outline-secondary');
    }
    this.render();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.render();
  }

  private render(): void {
    if (this.icon) {
      if (!this.iconEl) {
        this.iconEl = this.renderer.createElement('i');
        this.renderer.insertBefore(
          this.el.nativeElement,
          this.iconEl,
          this.el.nativeElement.firstChild
        );
      }
      this.iconEl!.className = this.icon;
    }
    if (this.label) {
      if (!this.labelEl) {
        this.labelEl = this.renderer.createElement('span');
        this.renderer.addClass(this.labelEl, 'ms-1');
        this.renderer.appendChild(this.el.nativeElement, this.labelEl);
      }
      this.labelEl!.textContent = this.label;
    }
  }
}
