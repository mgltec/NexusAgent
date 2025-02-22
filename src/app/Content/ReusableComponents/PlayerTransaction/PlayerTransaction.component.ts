import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentSessionDto } from 'src/app/Models/models';
import { CreatePlayerTransactionDto } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-PlayerTransaction',
  templateUrl: './PlayerTransaction.component.html',
  styleUrls: ['./PlayerTransaction.component.css']
})
export class PlayerTransactionComponent implements OnInit, OnDestroy {

  @Input() idplayer?: string;
  public _unsubscribeAll: Subject<any>;
  public _loadingPlayerInfo: boolean = false;
  public _PlayerInfo: any;
  public _transactionType: string = "R";
  public _amount: number = 0;
  public _bonus: number = 0;
  public _fees: number = 0;
  public _notes: string = "";
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _CreatePlayerTransaction: CreatePlayerTransactionDto = new CreatePlayerTransactionDto();
  public _LoadingCreateTransaction: boolean = false;

  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  ngOnInit() {

    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
        }
      }
      this.GetPlayerInformation();
    }); //end dataservice call


  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }

  GetPlayerInformation() {
    this._loadingPlayerInfo = true;
    this._reportService.GetPlayerInformation(Number(this.idplayer))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this._PlayerInfo = data;
        console.log(this._PlayerInfo);
        this._loadingPlayerInfo = false;
      }, error => {
        this._loadingPlayerInfo = false;
      });
  }

  CreateTransaction() {

    this._LoadingCreateTransaction = true;
    this._CreatePlayerTransaction.IdPlayer = Number(this.idplayer);
    this._CreatePlayerTransaction.TransactionType = this._transactionType;

    this._reportService.CreateTransaction(this._currentUser, this._CreatePlayerTransaction)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {

        if (data == -1){
          this.showMessage("success", "Transaction Status", "Transaction created successfully");
          this.GetPlayerInformation();
          this._CreatePlayerTransaction = new CreatePlayerTransactionDto;
        }
        else if( data == -500)
        {
          this.showMessage("error", "Transaction Status", "Max value exceeded");
        }
        else
          this.showMessage("error", "Transaction Status", "Transaction error");


        this._LoadingCreateTransaction = false;
      }, error => {
        this._LoadingCreateTransaction = false;
      });
  }




}
