import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { MenuItem } from './prime-shim';

Chart.register(...registerables);

/**
 * Replacement for PrimeNG `<p-chart>` backed directly by Chart.js.
 * Supports [type], [data], [options].
 */
@Component({
  standalone: false,
  selector: 'p-chart',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<div class="ui-chart"><canvas #canvas></canvas></div>`,
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() type = 'bar';
  @Input() data: any;
  @Input() options: any;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.build();
  }

  ngOnChanges(): void {
    if (this.viewReady) {
      this.build();
    }
  }

  private build(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (!this.canvas?.nativeElement || !this.data) {
      return;
    }
    this.chart = new Chart(this.canvas.nativeElement, {
      type: this.type as any,
      data: this.data,
      options: this.options,
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}

/**
 * Replacement for PrimeNG `<p-autocomplete>` for the single usage in the
 * dashboard. Supports [(ngModel)], [suggestions], (completeMethod), field,
 * [dropdown], (onSelect), placeholder.
 */
@Component({
  standalone: false,
  selector: 'p-autocomplete',
  template: `
    <div class="ui-autocomplete">
      <input
        type="text"
        class="form-control form-control-sm"
        [placeholder]="placeholder"
        [value]="displayValue"
        (input)="onInput($event)"
        (focus)="onFocus()"
      />
      <ul class="ui-autocomplete-panel" *ngIf="open && suggestions?.length">
        <li
          *ngFor="let s of suggestions"
          class="ui-autocomplete-item"
          (click)="pick(s)"
        >
          {{ labelOf(s) }}
        </li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true,
    },
  ],
})
export class AutoCompleteComponent implements ControlValueAccessor {
  @Input() suggestions: any[] = [];
  @Input() field: string | undefined;
  @Input() dropdown = false;
  @Input() placeholder = '';
  @Output() completeMethod = new EventEmitter<{ query: string }>();
  @Output() onSelect = new EventEmitter<any>();

  value: any = null;
  open = false;

  private onChangeFn: (v: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(private host: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    if (this.open && !this.host.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }

  get displayValue(): string {
    return this.labelOf(this.value);
  }

  labelOf(item: any): string {
    if (item == null) {
      return '';
    }
    if (this.field && typeof item === 'object') {
      return item[this.field];
    }
    return item;
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

  onInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.value = query;
    this.onChangeFn(query);
    this.open = true;
    this.completeMethod.emit({ query });
  }

  onFocus(): void {
    if (this.dropdown) {
      this.open = true;
      this.completeMethod.emit({ query: '' });
    }
  }

  pick(item: any): void {
    this.value = item;
    this.onChangeFn(item);
    this.onTouchedFn();
    this.onSelect.emit(item);
    this.open = false;
  }
}

/**
 * Replacement for PrimeNG `<p-menubar>` (used only by the deactivated
 * ClassicView). Renders a simple horizontal menu from [model].
 */
@Component({
  standalone: false,
  selector: 'p-menubar',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <nav class="ui-menubar navbar navbar-expand">
      <ul class="navbar-nav">
        <li class="nav-item" *ngFor="let item of model">
          <a
            class="nav-link"
            [routerLink]="item.routerLink || null"
            (click)="item.command ? item.command() : null"
          >
            <i *ngIf="item.icon" [class]="item.icon"></i>
            {{ item.label }}
          </a>
        </li>
      </ul>
      <ng-content></ng-content>
    </nav>
  `,
})
export class MenubarComponent {
  @Input() model: MenuItem[] = [];
}
