import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  HostListener,
  Input,
  Optional,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { PrimeTemplate } from './prime-template.directive';

/**
 * Replacement for PrimeNG `<p-table>` supporting the subset the app uses:
 * [value], dataKey, the pTemplate slots (caption/header/body/footer/
 * rowexpansion/emptymessage), row expansion via [pRowToggler], and basic
 * client-side sorting via pSortableColumn + <p-sortIcon>.
 */
@Component({
  standalone: false,
  selector: 'p-table',
  template: `
    <div class="ui-table" [ngClass]="styleClass">
      <div class="ui-table-caption" *ngIf="captionTpl">
        <ng-container *ngTemplateOutlet="captionTpl"></ng-container>
      </div>
      <div class="ui-table-scroll">
        <table class="table table-sm table-hover ui-datatable">
          <thead *ngIf="headerTpl">
            <ng-container *ngTemplateOutlet="headerTpl"></ng-container>
          </thead>
          <tbody>
            <ng-container *ngFor="let row of value; let i = index">
              <ng-container
                *ngTemplateOutlet="bodyTpl; context: { $implicit: row, rowIndex: i, expanded: isExpanded(row) }"
              ></ng-container>
              <ng-container *ngIf="rowexpansionTpl && isExpanded(row)">
                <ng-container
                  *ngTemplateOutlet="rowexpansionTpl; context: { $implicit: row }"
                ></ng-container>
              </ng-container>
            </ng-container>
            <ng-container *ngIf="emptyTpl && (!value || value.length === 0)">
              <ng-container *ngTemplateOutlet="emptyTpl"></ng-container>
            </ng-container>
          </tbody>
          <tfoot *ngIf="footerTpl">
            <ng-container *ngTemplateOutlet="footerTpl"></ng-container>
          </tfoot>
        </table>
      </div>
    </div>
  `,
})
export class TableComponent implements AfterContentInit {
  @Input() value: any[] = [];
  @Input() dataKey: string | undefined;
  @Input() styleClass: string | undefined;
  @Input() expandedRowKeys: { [k: string]: boolean } = {};

  sortField: string | undefined;
  sortOrder = 1;
  private originalValue: any[] | null = null;

  captionTpl: TemplateRef<any> | null = null;
  headerTpl: TemplateRef<any> | null = null;
  bodyTpl: TemplateRef<any> | null = null;
  footerTpl: TemplateRef<any> | null = null;
  rowexpansionTpl: TemplateRef<any> | null = null;
  emptyTpl: TemplateRef<any> | null = null;

  @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

  ngAfterContentInit(): void {
    this.templates?.forEach((t) => {
      switch (t.getType()) {
        case 'caption':
          this.captionTpl = t.template;
          break;
        case 'header':
          this.headerTpl = t.template;
          break;
        case 'body':
          this.bodyTpl = t.template;
          break;
        case 'footer':
          this.footerTpl = t.template;
          break;
        case 'rowexpansion':
          this.rowexpansionTpl = t.template;
          break;
        case 'emptymessage':
          this.emptyTpl = t.template;
          break;
      }
    });
  }

  private keyOf(row: any): string {
    return this.dataKey ? row?.[this.dataKey] : row;
  }

  isExpanded(row: any): boolean {
    return !!this.expandedRowKeys[this.keyOf(row)];
  }

  toggleRow(row: any): void {
    const key = this.keyOf(row);
    if (this.expandedRowKeys[key]) {
      delete this.expandedRowKeys[key];
    } else {
      this.expandedRowKeys[key] = true;
    }
  }

  /** PrimeNG-compatible: reset sort and any global filter. */
  clear(): void {
    this.sortField = undefined;
    this.sortOrder = 1;
    if (this.originalValue) {
      this.value = [...this.originalValue];
      this.originalValue = null;
    }
  }

  /** PrimeNG-compatible: basic client-side global filter across all fields. */
  filterGlobal(value: string, _matchMode?: string): void {
    if (this.originalValue === null) {
      this.originalValue = this.value ? [...this.value] : [];
    }
    const term = (value || '').toLowerCase();
    if (!term) {
      this.value = [...this.originalValue];
      return;
    }
    this.value = this.originalValue.filter((row) =>
      Object.values(row || {}).some((v) => String(v).toLowerCase().includes(term))
    );
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = -this.sortOrder;
    } else {
      this.sortField = field;
      this.sortOrder = 1;
    }
    (this.value || []).sort((a, b) => {
      const av = a?.[field];
      const bv = b?.[field];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return -1 * this.sortOrder;
      if (av > bv) return 1 * this.sortOrder;
      return 0;
    });
  }
}

/** Replacement for PrimeNG's `pSortableColumn` directive. */
@Directive({
  standalone: false,
  selector: '[pSortableColumn]',
})
export class SortableColumnDirective {
  @Input('pSortableColumn') field!: string;

  constructor(@Optional() private table: TableComponent) {}

  @HostListener('click')
  onClick(): void {
    if (this.table && this.field) {
      this.table.sort(this.field);
    }
  }
}

/** Replacement for PrimeNG's `[pRowToggler]` directive. */
@Directive({
  standalone: false,
  selector: '[pRowToggler]',
})
export class RowTogglerDirective {
  @Input('pRowToggler') row: any;

  constructor(@Optional() private table: TableComponent) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.stopPropagation();
    if (this.table) {
      this.table.toggleRow(this.row);
    }
  }
}

/** Replacement for PrimeNG's `<p-sortIcon>`. */
@Component({
  standalone: false,
  selector: 'p-sortIcon',
  template: `
    <i
      class="fa-solid ui-sort-icon"
      [class.fa-sort]="table?.sortField !== field"
      [class.fa-sort-up]="table?.sortField === field && table?.sortOrder === 1"
      [class.fa-sort-down]="table?.sortField === field && table?.sortOrder === -1"
    ></i>
  `,
})
export class SortIconComponent {
  @Input() field!: string;
  constructor(@Optional() public table: TableComponent) {}
}
