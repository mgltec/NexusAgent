import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Lightweight, modern loading state for reports: an indeterminate emerald
 * progress bar plus a shimmering skeleton table. Pure CSS (styles live in
 * styles.scss under .report-loading), theme-aware via the DGS tokens.
 *
 * Usage: <app-report-loading *ngIf="_loadingReport"></app-report-loading>
 */
@Component({
  standalone: false,
  selector: 'app-report-loading',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="report-loading" role="status" [attr.aria-label]="label">
      <div class="report-loading-bar"><span></span></div>
      <div class="report-loading-card">
        <div class="sk-line sk-w-35"></div>
        <div class="sk-row" *ngFor="let r of rows">
          <span class="sk-cell sk-w-25"></span>
          <span class="sk-cell"></span>
          <span class="sk-cell"></span>
          <span class="sk-cell sk-w-15"></span>
        </div>
      </div>
    </div>
  `,
})
export class ReportLoadingComponent {
  @Input() label = 'Loading report';
  /** Number of skeleton rows to render. */
  @Input() set lines(value: number) {
    this.rows = Array.from({ length: Math.max(1, value) });
  }
  rows = Array.from({ length: 4 });
}
