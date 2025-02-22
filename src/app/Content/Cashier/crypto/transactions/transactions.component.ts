import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { PlayerTransactionDTO } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  @Output() cancelTransaction = new EventEmitter<PlayerTransactionDTO>();
  @Input() type: string = '';
  @Input() data: PlayerTransactionDTO[] = [];

  public loading: boolean = true;
  public isDesktop: boolean = false;
  public invoiceUrl: string = '';

  constructor(private dataService: DataService) {}

  @HostListener('window:resize')
  onWindowResize() {
    this.isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  }

  ngOnInit(): void {
    this.isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  }

  mapStatus(status?: string) {
    switch (status) {
      case 'pe':
        return 'Pending';
      case 'de':
        return 'Rejected';
      case 're':
        return 'Requested';
      case 'ca':
        return 'Cancelled';
      default:
        return status;
    }
  }

  mapStatusClass(status?: string) {
    switch (status) {
      case 'pe':
        return 'Pending';
      case 'de':
        return 'Rejected';
      case 're':
        return 'Requested';
      case 'ca':
        return 'Cancelled';
      default:
        return 'Requested';
    }
  }

  open(invoice?: string) {
    if (invoice) {
      this.dataService.openInvoice(invoice);
    }
  }

  cancel(transaction: PlayerTransactionDTO) {
    this.cancelTransaction.emit(transaction);
  }
}
