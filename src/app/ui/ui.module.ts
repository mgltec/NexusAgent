import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PrimeTemplate } from './prime-template.directive';
import {
  DialogComponent,
  DrawerComponent,
  ToastComponent,
} from './overlay.components';
import { SelectComponent } from './select.component';
import {
  AccordionComponent,
  AccordionPanelComponent,
  AccordionHeaderComponent,
  AccordionContentComponent,
} from './accordion.components';
import {
  TableComponent,
  SortableColumnDirective,
  RowTogglerDirective,
  SortIconComponent,
} from './table.component';
import { ButtonDirective } from './button.directive';
import { ReportLoadingComponent } from './report-loading.component';
import {
  ChartComponent,
  AutoCompleteComponent,
  MenubarComponent,
} from './widgets.components';

const DECLARATIONS = [
  PrimeTemplate,
  DialogComponent,
  DrawerComponent,
  ToastComponent,
  SelectComponent,
  AccordionComponent,
  AccordionPanelComponent,
  AccordionHeaderComponent,
  AccordionContentComponent,
  TableComponent,
  SortableColumnDirective,
  RowTogglerDirective,
  SortIconComponent,
  ButtonDirective,
  ChartComponent,
  AutoCompleteComponent,
  MenubarComponent,
  ReportLoadingComponent,
];

/**
 * In-house UI kit that replaces PrimeNG. Exposes the same selectors/APIs
 * (`p-dialog`, `p-drawer`, `p-select`, `p-accordion*`, `p-table`, `p-toast`,
 * `p-chart`, `p-autocomplete`, `p-menubar`, `pButton`, `pTemplate`, ...) built
 * on Bootstrap / native markup so existing templates keep working.
 */
@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule, FormsModule, RouterModule],
  exports: DECLARATIONS,
})
export class UiModule {}
