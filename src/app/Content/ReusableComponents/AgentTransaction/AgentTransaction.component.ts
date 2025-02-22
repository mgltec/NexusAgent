import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentSessionDto, AgentInformationRequest, InsertAgentTransactionRequest} from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-AgentTransaction',
  templateUrl: './AgentTransaction.component.html',
  styleUrls: ['./AgentTransaction.component.css']
})
export class AgentTransactionComponent implements OnInit, OnDestroy {

  @Input() idagent?: string;
  @Input() agent?: string;
  public _unsubscribeAll: Subject<any>;
  public _loadingPlayerInfo: boolean = false;
  public _PlayerInfo: any;
  public _transactionType: string = "R";
  public _amount: number = 0;
  public _bonus: number = 0;
  public _fees: number = 0;
  public _notes: string = "";
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _InsertAgentTransactionRequest: InsertAgentTransactionRequest = new InsertAgentTransactionRequest();
  public _LoadingCreateTransaction: boolean = false;


  constructor(public messageService: MessageService,
    public _reportService: ReportsService,
    private datePipe: DatePipe,
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
      this.GetAgentInformation();
    }); //end dataservice call
  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }

  GetAgentInformation() {
    this._reportService.GetAgentStatistic(Number(this.idagent))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this._PlayerInfo = data;
        console.log("AGENT INFO ======>" , this._PlayerInfo);
        this._loadingPlayerInfo = false;
      }, error => {
        this._loadingPlayerInfo = false;
      });
  }

  CreateTransaction() {

    this._LoadingCreateTransaction = true;
    let dateNow = new Date();
    this._InsertAgentTransactionRequest.IDAgent = Number(this.idagent);
    this._InsertAgentTransactionRequest.Type = this._transactionType;
    this._InsertAgentTransactionRequest.Date = this.datePipe.transform(dateNow, 'yyyy-MM-dd') ?? '';
    this._InsertAgentTransactionRequest.PreviousBalance = this._PlayerInfo.CurrentBalance;

    this._reportService.InsertAgentTransaction(this._InsertAgentTransactionRequest)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {

        if (data == 0){
          this.showMessage("success", "Transaction Status", "Transaction created successfully");
          this._InsertAgentTransactionRequest = new InsertAgentTransactionRequest;
          this.GetAgentInformation();
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
