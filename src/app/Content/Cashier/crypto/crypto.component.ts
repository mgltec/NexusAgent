import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CryptoMethodDTO, PlayerDetailsDTO } from 'src/app/Models/cashier-models';
import { AgentSessionDto, AuthenticationDto, PlayerDto, PlayerTransactionDTO } from 'src/app/Models/models';
import { CashierService } from 'src/app/Services/Cashier.service';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css'],
})
export class CryptoComponent implements OnInit, OnChanges  {
  @ViewChild('confirmation') confirmation!: ElementRef;
  @Input() PlayerDetails!: PlayerDetailsDTO;

  public user: AgentSessionDto = new AgentSessionDto();
  public auth: AuthenticationDto = new AuthenticationDto();

  public type: string = 'de';
  public methods!: CryptoMethodDTO[];
  public transactions: PlayerTransactionDTO[] = [];

  public invoiceUrl: string = '';

  constructor(
    private dataService: DataService,
    private cashier: CashierService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dataService.UserSession.subscribe({
      next: user => {
        this.user = user;

        if (this.user === null && localStorage.getItem('agentInfo') !== null) {
          this.user = JSON.parse(localStorage.getItem('agentInfo')!);
        }
        if (this.PlayerDetails && this.PlayerDetails.IdPlayer > 0) {
          // console.log(this.PlayerDetails)
          // this.GetTransactions();
        }
      },
      error: err => {},
      complete: () => {},
    });

    this.cashier.GetAllActiveMethods().subscribe({
      next: methods => {
        this.methods = methods;
      },
      error: err => {},
      complete: () => {},
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['PlayerDetails'] && this.PlayerDetails && this.PlayerDetails.IdPlayer > 0) {
      console.log("AQUI ENTRO: ",this.PlayerDetails);
      // Llama al método una vez que IdPlayer es mayor que 0
      this.GetTransactions();
    }
  }

  ToggleChart(type: string) {
    if (this.type === type) return;
    if (this.type === 'de') this.type = 'pa';
    else this.type = 'de';

    this.GetTransactions();
  }
  IdPlayer: number = 0;
  GetTransactions() {
    this.cashier.GetAllPlayerTransactions(this.PlayerDetails, this.PlayerDetails.IdPlayer, this.type).subscribe({
      next: transactions => {
        this.transactions = transactions;
      },
      error: err => {},
      complete: () => {},
    });
  }

  depositCreated({ Invoice }: PlayerTransactionDTO) {
    this.GetTransactions();
    if (Invoice) {
      this.dataService.openInvoice(Invoice);
    }
  }

  payoutCreated(_: PlayerTransactionDTO) {
    this.GetTransactions();
  }

  cancelTransaction(transaction: PlayerTransactionDTO) {
    this.modalService
      .open(this.confirmation, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
      })
      .result.then(
        _ => {
          if (transaction.Id !== undefined) {
            this.cashier.CancelPlayerTransaction(this.PlayerDetails, transaction.Id).subscribe({
              next: user => this.GetTransactions(),
              error: err => {},
              complete: () => {},
            });
          }
        },
        _ => {}
      );
  }
}
