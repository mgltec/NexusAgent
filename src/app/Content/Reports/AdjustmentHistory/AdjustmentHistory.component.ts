import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { AgentDto, WeekRangeDto, AgentListModel, RequestPlayerListModel,AgentSessionDto, PlayerAdjustmentHistoryRequest } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-AdjustmentHistory',
  templateUrl: './AdjustmentHistory.component.html',
  styleUrls: ['./AdjustmentHistory.component.css']
})
export class AdjustmentHistoryComponent implements OnInit,OnDestroy {
  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentSelected: string = '';
  public agentList: any[] = [];
  public playerSelected: string = '-1';
  public playerList: any[] = [];
  public week : any;
  public weekSelected : number =0;
  public weekList: any[] = [];
  public reportData: any[] = [];
  public _loadingReport: boolean = false;
  public TotalReceipts: number = 0;
  public TotalDisbursements: number = 0;
  public TotalAdjustment: number = 0;
  public TotalFreePlays: number = 0;
  public i : number = 0;

  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
  ) {

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
        this.GetAgentList();
    }); //end dataservice call

      this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
        this.display = data;
      }); //end dataservice call
   }


  GetAgentList() {

    let info: AgentListModel = new AgentListModel();

    info.idAgent = this._currentUser.IdAgentSelected;
    info.agent = this._currentUser.AgentSelected;
    this._reportService.GetAgentsList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.agentList = data['List'];
      }, error => {

      });
      this.GetWeeks();
  }

  GetPlayerList() {

    let info: RequestPlayerListModel = new RequestPlayerListModel();

    if (this.agentSelected == '' || this.agentSelected == undefined) {
      info.idAgent = this._currentUser.IdAgentSelected;
    }
    else {
      info.idAgent = parseInt(this.agentSelected);
    }

    this._reportService.GetPlayerList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.playerList = data;
      }, error => {

      });
      this.playerSelected='-1'
  }

GetWeeks() {
  this._reportService
    .GetWeeks(this._currentUser)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(
      (data) => {
         this.weekList = data;
         this.GetReport();
       },
      (error) => { }
    );
} //end submit form

GetReport(){
  this._loadingReport = true;

  let info: PlayerAdjustmentHistoryRequest = new PlayerAdjustmentHistoryRequest();

  if (this.agentSelected == '' || this.agentSelected == undefined) {
    info.idAgent = this._currentUser.IdAgentSelected
    info.idPlayer = -1
  }
  else {
    info.idAgent = parseInt(this.agentSelected);
    info.idPlayer = parseInt(this.playerSelected);
  }
  this.week = this.weekList[this.weekSelected];
  info.startDate= this.week.MonDate;
  info.endDate = this.week.SunDate;

  this._reportService.GetPlayerAdjustmentHistory(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.reportData = data;
      this.GetTotals();
      this._loadingReport = false;
    }, error => {this._loadingReport = false;

    });
}


GetTotals(){
  this.TotalReceipts = 0;
  this.TotalDisbursements  = 0;
  this.TotalAdjustment = 0;
  this.TotalFreePlays = 0;
 this.reportData.forEach(element => {
   if (this.reportData[this.i].TransactionType == 'R')
   {
    this.TotalReceipts = this.TotalReceipts + parseInt(this.reportData[this.i].Amount);
   }
   else  if (this.reportData[this.i].TransactionType == 'D')
   {
    this.TotalDisbursements = this.TotalDisbursements + parseInt(this.reportData[this.i].Amount);
   }
   else  if (this.reportData[this.i].TransactionType == 'A')
   {
    this.TotalAdjustment = this.TotalAdjustment + parseInt(this.reportData[this.i].Amount);
   }
   else  if (this.reportData[this.i].TransactionType == 'P')
   {
    this.TotalFreePlays = this.TotalFreePlays + parseInt(this.reportData[this.i].Amount);
   }
    this.i= this.i + 1;
 });

 this.i=0;
}


hideFilters(){
  this._DataService.methodShowFilters(false);
  }

}
