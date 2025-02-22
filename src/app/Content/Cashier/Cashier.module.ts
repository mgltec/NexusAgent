import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashierComponent } from './Cashier.component';
import { AchComponent } from './ach/ach.component';
import { ZelleComponent } from './zelle/zelle.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { CryptoComponent } from './crypto/crypto.component';
import { InvoiceComponent } from './crypto/invoice/invoice.component';
import { TransactionFormComponent } from './crypto/transaction-form/transaction-form.component';
import { TransactionsComponent } from './crypto/transactions/transactions.component';
import { DropdownModule } from 'primeng/dropdown';
import { LandscapeNoticeModule } from '../ReusableComponents/LandscapeNotice/landscape-notice.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownModule, LandscapeNoticeModule, NgxMaskDirective, NgxMaskPipe],
  declarations: [CashierComponent, AchComponent, ZelleComponent, CreditCardComponent, CryptoComponent, InvoiceComponent, TransactionFormComponent, TransactionsComponent],
  exports: [AchComponent, ZelleComponent, CreditCardComponent, CryptoComponent, InvoiceComponent, TransactionFormComponent, TransactionsComponent, DropdownModule],
  providers: [provideNgxMask()],
})
export class CashierModule {}
