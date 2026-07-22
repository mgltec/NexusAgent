import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Replacement for PrimeNG `<p-select>` (ex `<p-dropdown>`).
 * A Bootstrap-styled custom dropdown that binds the whole option object as its
 * value (PrimeNG's behaviour when no optionValue is set) and supports the
 * inputs the app uses: [options], optionLabel, [filter], filterBy, [showClear],
 * placeholder, styleClass, plus the (onChange) output and [(ngModel)].
 */
@Component({
  standalone: false,
  selector: 'p-select',
  template: `
    <div class="ui-select" [class.ui-select-open]="open" [ngClass]="styleClass">
      <button type="button" class="ui-select-label" (click)="toggle()">
        <span *ngIf="hasValue()" class="ui-select-value">{{ labelOf(value) }}</span>
        <span *ngIf="!hasValue()" class="ui-select-placeholder">{{ placeholder }}</span>
        <i *ngIf="showClear && hasValue()" class="fa-solid fa-xmark ui-select-clear" (click)="clear($event)"></i>
        <i class="fa-solid fa-chevron-down ui-select-arrow"></i>
      </button>
      <div class="ui-select-panel" *ngIf="open">
        <div class="ui-select-filter" *ngIf="filter">
          <input
            type="text"
            [(ngModel)]="filterText"
            (click)="$event.stopPropagation()"
            placeholder="Search..."
            class="form-control form-control-sm"
          />
        </div>
        <ul class="ui-select-items">
          <li
            *ngFor="let opt of filteredOptions()"
            class="ui-select-item"
            [class.ui-select-item-selected]="opt === value"
            (click)="select(opt)"
          >
            {{ labelOf(opt) }}
          </li>
          <li *ngIf="filteredOptions().length === 0" class="ui-select-empty">No results</li>
        </ul>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() optionLabel: string | undefined;
  @Input() optionValue: string | undefined;
  @Input() placeholder = 'Select';
  @Input() filter = false;
  @Input() filterBy: string | undefined;
  @Input() showClear = false;
  @Input() styleClass: string | undefined;
  @Input() disabled = false;
  @Output() onChange = new EventEmitter<{ originalEvent?: any; value: any }>();

  value: any = null;
  open = false;
  filterText = '';

  private onChangeFn: (v: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(private host: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    if (this.open && !this.host.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }

  writeValue(value: any): void {
    this.value = value ?? null;
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }
    this.open = !this.open;
    if (this.open) {
      this.filterText = '';
    }
  }

  hasValue(): boolean {
    return this.value !== null && this.value !== undefined && this.value !== '';
  }

  labelOf(opt: any): string {
    if (opt === null || opt === undefined) {
      return '';
    }
    if (this.optionLabel && typeof opt === 'object') {
      return opt[this.optionLabel];
    }
    return opt;
  }

  filteredOptions(): any[] {
    const opts = this.options || [];
    if (!this.filter || !this.filterText) {
      return opts;
    }
    const needle = this.filterText.toLowerCase();
    return opts.filter((o) => this.labelOf(o)?.toString().toLowerCase().includes(needle));
  }

  select(opt: any): void {
    this.value = opt;
    this.onChangeFn(opt);
    this.onTouchedFn();
    this.onChange.emit({ value: opt });
    this.open = false;
  }

  clear(event: MouseEvent): void {
    event.stopPropagation();
    this.value = null;
    this.onChangeFn(null);
    this.onChange.emit({ value: null });
  }
}
