import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { PrimeTemplate } from './prime-template.directive';

/**
 * Replacement for PrimeNG `<p-dialog>` using Bootstrap-style modal markup.
 * Supports the subset the app uses: [(visible)], header, [modal], [style],
 * (onHide) and a `<ng-template pTemplate="footer">`.
 */
@Component({
  standalone: false,
  selector: 'p-dialog',
  template: `
    <div
      class="ui-dialog-mask"
      *ngIf="visible"
      [class.ui-dialog-modal]="modal"
      (click)="onMaskClick($event)"
    >
      <div class="ui-dialog" role="dialog" [ngStyle]="style" (click)="$event.stopPropagation()">
        <div class="ui-dialog-header" *ngIf="header || showHeader">
          <span class="ui-dialog-title">{{ header }}</span>
          <button type="button" class="ui-dialog-close" (click)="close()" aria-label="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="ui-dialog-content">
          <ng-content></ng-content>
        </div>
        <div class="ui-dialog-footer" *ngIf="footerTemplate">
          <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
      </div>
    </div>
  `,
})
export class DialogComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() header: string | undefined;
  @Input() modal = false;
  @Input() showHeader = true;
  @Input() style: { [k: string]: any } | undefined;
  @Input() resizable = true;
  @Input() draggable = true;
  @Input() baseZIndex = 0;
  @Input() closable = true;
  @Output() onHide = new EventEmitter<any>();

  @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

  get footerTemplate(): TemplateRef<any> | null {
    const t = this.templates?.find((tpl) => tpl.getType() === 'footer');
    return t ? t.template : null;
  }

  onMaskClick(_event: MouseEvent): void {
    // Clicking the mask does not auto-close (matches app usage which controls
    // visibility explicitly); kept as a hook for future dismissOnMask support.
  }

  close(): void {
    if (!this.closable) {
      return;
    }
    this.visible = false;
    this.visibleChange.emit(false);
    this.onHide.emit({});
  }
}

/**
 * Replacement for PrimeNG `<p-drawer>` (ex `<p-sidebar>`) using an offcanvas
 * panel. Supports [(visible)], styleClass, (onHide).
 */
@Component({
  standalone: false,
  selector: 'p-drawer',
  template: `
    <div class="ui-drawer-mask" *ngIf="visible" (click)="close()"></div>
    <div class="ui-drawer" [class]="'ui-drawer-' + position" [class.ui-drawer-visible]="visible" [ngClass]="styleClass">
      <div class="ui-drawer-header">
        <button type="button" class="ui-drawer-close" (click)="close()" aria-label="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="ui-drawer-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class DrawerComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() position: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() styleClass: string | undefined;
  @Output() onHide = new EventEmitter<any>();

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onHide.emit({});
  }
}

/**
 * Replacement for PrimeNG `<p-toast>`. Toasts are rendered by the
 * MessageService (SweetAlert2), so this is just an inert placeholder that
 * keeps existing templates valid.
 */
@Component({
  standalone: false,
  selector: 'p-toast',
  template: '',
})
export class ToastComponent {
  @Input() key: string | undefined;
  @Input() position: string | undefined;
  @Input() life: number | undefined;
}
