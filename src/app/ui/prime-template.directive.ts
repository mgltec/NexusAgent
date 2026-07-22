import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * Replacement for PrimeNG's `pTemplate` directive.
 * Captures a named `<ng-template pTemplate="header">` so host components
 * (table, dialog) can project them by name.
 */
@Directive({
  standalone: false,
  selector: '[pTemplate]',
})
export class PrimeTemplate {
  @Input('pTemplate') name: string | undefined;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name || 'default';
  }
}
