import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Replacements for PrimeNG's accordion pieces
 * (`<p-accordion>`, `<p-accordion-panel>`, `<p-accordion-header>`,
 * `<p-accordion-content>`). Implemented as a Bootstrap-style collapsible.
 * The app uses single-panel "Filters" accordions, so each panel manages its
 * own open/closed state and starts expanded.
 */
@Component({
  standalone: false,
  selector: 'p-accordion',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<div class="ui-accordion" [ngStyle]="style"><ng-content></ng-content></div>`,
})
export class AccordionComponent {
  @Input() style: { [k: string]: any } | undefined;
  @Input() styleClass: string | undefined;
  @Input() multiple = false;
}

@Component({
  standalone: false,
  selector: 'p-accordion-panel',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="ui-accordion-panel" [ngStyle]="style" [class.ui-accordion-open]="expanded">
      <ng-content></ng-content>
    </div>
  `,
})
export class AccordionPanelComponent {
  @Input() value: any;
  @Input() style: { [k: string]: any } | undefined;
  expanded = true;

  toggle(): void {
    this.expanded = !this.expanded;
  }
}

@Component({
  standalone: false,
  selector: 'p-accordion-header',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <button type="button" class="ui-accordion-header" (click)="panel.toggle()">
      <i class="fa-solid" [class.fa-chevron-down]="panel.expanded" [class.fa-chevron-right]="!panel.expanded"></i>
      <span><ng-content></ng-content></span>
    </button>
  `,
})
export class AccordionHeaderComponent {
  constructor(public panel: AccordionPanelComponent) {}
}

@Component({
  standalone: false,
  selector: 'p-accordion-content',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="ui-accordion-content" *ngIf="panel.expanded">
      <ng-content></ng-content>
    </div>
  `,
})
export class AccordionContentComponent {
  constructor(public panel: AccordionPanelComponent) {}
}
