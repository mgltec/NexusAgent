import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

/** Drop-in replacement for PrimeNG's Message model. */
export interface Message {
  severity?: string;
  summary?: string;
  detail?: string;
  life?: number;
  key?: string;
  sticky?: boolean;
  closable?: boolean;
  id?: any;
  data?: any;
}

/**
 * Drop-in replacement for PrimeNG's MessageService.
 * Renders toasts through SweetAlert2 so the rest of the app keeps calling
 * `this.messageService.add({ severity, summary, detail })` unchanged.
 */
@Injectable({ providedIn: 'root' })
export class MessageService {
  private toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  });

  add(message: Message): void {
    if (!message) {
      return;
    }
    this.toast.fire({
      icon: this.mapIcon(message.severity),
      title: message.summary ?? '',
      text: message.detail ?? '',
      timer: message.sticky ? undefined : message.life ?? 3000,
    });
  }

  addAll(messages: Message[]): void {
    (messages || []).forEach((m) => this.add(m));
  }

  clear(_key?: string): void {
    Swal.close();
  }

  private mapIcon(
    severity?: string
  ): 'success' | 'error' | 'warning' | 'info' | 'question' {
    switch ((severity || '').toLowerCase()) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warn':
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }
}
