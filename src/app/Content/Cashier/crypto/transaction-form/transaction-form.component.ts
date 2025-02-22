import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CryptoMethodDTO, PlayerDetailsDTO } from 'src/app/Models/cashier-models';
import { AgentSessionDto, AuthenticationDto, PlayerDto, PlayerTransactionDTO } from 'src/app/Models/models';
import { CashierService } from 'src/app/Services/Cashier.service';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  @Input() type: string = '';
  @Input() methods!: CryptoMethodDTO[];
  @Output() depositCreated = new EventEmitter<PlayerTransactionDTO>();
  @Output() payoutCreated = new EventEmitter<PlayerTransactionDTO>();

  public user: AgentSessionDto = new AgentSessionDto();
  public auth: AuthenticationDto = new AuthenticationDto();

  public loading: boolean = true;
  public createLoading: boolean = false;

  public amount: number = 0;
  public address: string = '';
  public method: CryptoMethodDTO = new CryptoMethodDTO();

  public error: string = '';
  @Input() PlayerDetails!: PlayerDetailsDTO;

  constructor(
    private dataService: DataService,
    private cashier: CashierService
  ) {}

  get createDisabled() {
    return isNaN(this.amount) || this.amount <= 0 || !this.method || (this.type === 'pa' && this.address === '');
  }

  ngOnInit(): void {
    this.dataService.UserSession.subscribe({
      next: user => {
        this.user = user;

        if (this.user === null && localStorage.getItem('agentInfo') !== null) {
          this.user = JSON.parse(localStorage.getItem('agentInfo')!);
        }
      },
      error: err => {},
      complete: () => {},
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['methods']) {
      this.method = this.methods?.[0];
    } else if (changes['type']) {
      this.clear();
    }
  }

  selectedMethod(method: any) {
    this.method = method;
  }

  create() {
    this.error = '';
    const min = 10000000;
    const max = 99999999;
    const key = Math.floor(Math.random() * (max - min + 1)) + min;
    this.createLoading = true;
    debugger;
    if (this.type === 'de') {
      this.createDeposit(key);
    } else {
      this.createPayout(key);
    }
  }

  createDeposit(key: number) {
    this.cashier.CryptoPayment(this.PlayerDetails, this.amount, this.method.Name).subscribe({
      next: transaction => {
        this.clear();
        if (transaction.Result === 'ok') {
          this.depositCreated.emit(transaction);
          this.dataService.openInvoice(transaction.Invoice_Url);
        } else {
          this.error = 'Failed to create deposit.';
        }
      },
      error: _ => {
        this.error = 'Failed to create deposit.';
        this.clear();
      },
      complete: () => {},
    });
  }

  createPayout(key: number) {
    //REVISAR ESTE METODO
    this.cashier.GetPlayerAvailableBalance(this.PlayerDetails).subscribe({
      next: available => {
        if (this.amount <= available) {
          this.cashier.CryptoPayout(this.PlayerDetails, this.amount, this.method.Name, this.address).subscribe({
            next: transaction => {
              this.clear();
              if (transaction.Result === 'ok') {
                this.depositCreated.emit(transaction);
                this.dataService.openInvoice(transaction.Invoice_Url);
              } else {
                this.error = 'Failed to create deposit.';
              }
            },
            error: _ => {
              this.error = 'Failed to create deposit.';
              this.clear();
            },
            complete: () => {},
          });
        } else {
          this.error = 'Not enough balance.';
          this.clear();
        }
      },
      error: _ => {
        this.error = 'Failed to create deposit.';
        this.clear();
      },
      complete: () => {},
    });
  }

  clear() {
    this.amount = 0;
    this.address = '';
    this.createLoading = false;
  }
}
