import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IResponsiveTableColumn } from './responsive-table.types';

@Component({
  selector: 'app-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsiveTableComponent implements OnInit {
  @Input() loading: boolean = false
  @Input() data: any[] = []
  @Input() totalsData: any = {}
  @Input() columns: IResponsiveTableColumn[] = []

  public totalParlay: number = 0;
  public totalAmountPcPlayed: number = 0;
  public totalPcHits: number = 0;
  public totalPcHitsAmount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  hasLink(column: IResponsiveTableColumn) {
    return column.route !== undefined
  }

  hasTotal(column: IResponsiveTableColumn) {
    return column.totalsValue || column.totalsKey || column.totalsLabel
  }

  getValue(item: any, column: IResponsiveTableColumn) {
    if (column.label) return column.label
    if (column.value) return column.value(item)
    if (!column.key) return ""
    return item[column.key]
  }

  getValuePipe(item: any, column: IResponsiveTableColumn) {
    const value = this.getValue(item, column)
    return column.pipe ? column.pipe(value) : value
  }

  getClasses(item: any, column: IResponsiveTableColumn) {
    const value = this.getValue(item, column);
    return column.classes && column.key === 'PcHitsAmount' && value > 0 ? 'NumNegative' : column.classes ? column.classes(value, item) : null
  }

  getTotals(column: IResponsiveTableColumn) {
    if (column.totalsLabel) return column.totalsLabel
    if (column.totalsValue) return column.totalsValue(this.totalsData)
    if (!column.totalsKey) return ""

    return this.totalsData[column.totalsKey]
  }

  getTotalsPipe(column: IResponsiveTableColumn) {
    const value = this.getTotals(column)
    const pipe = column.totalsPipe ?? column.pipe
    return pipe ? pipe(value) : value
  }

  getTotalsClasses(column: IResponsiveTableColumn) {
    const value = this.getTotals(column)
    return column.classes ? column.classes(value, this.totalsData) : null
  }

  get hasTotals() {
    return this.columns.some(column => column.totalsKey || column.totalsLabel)
  }

}
