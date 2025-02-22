import { formatDate } from '@angular/common';
import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {AgentDto,
        WeekRangeDto,
        AgentListModel,
        DaySheetClassicRequest,
        DaySheetClassicForHeadersRequest,
        AgentSessionDto,
        AgentAllowTransferRequest,
        AgentAllowSettleFigureColumn,
        InsertPlayerTransactionRequest ,
        PlayerLatestTransactionRequest,
        PlayerBalanceInformationRequest,
        AgentLatestTransactionRequest,
        InsertAgentTransactionRequest,
        AgentInformationRequest,
        EditAgentInformationRequest,
        PlayerHistoryRequest,
        PlayerInformationRequest,
        EditPlayerInformationRequest
      } from 'src/app/Models/models';
import { PlayerInfoForEditDto } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';


@Component({
  selector: 'app-DaySheetClassic',
  templateUrl: './DaySheetClassic.component.html',
  styleUrls: ['./DaySheetClassic.component.css']
})
export class DaySheetClassicComponent implements OnInit,OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public allPlayers: boolean = false;
  public actionTypeSelected: string = 'AP';
  public breadkown: boolean = false;
  public orderBySelected: string = 'player';
  public orderSelected: string = 'A';
  public  hidePlayers : boolean = false;
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportAgentAllowTransfer: any[] = [];
  public reportAgentAllowSettleFigure: any[] = [];
  public reportHeaders: any[] = [];
  public reportData: any[] = [];
  public reportDataBreadkown: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;
  public displayModalPlayerTransfer: boolean = false;
  public displayModalAgentTransfer: boolean = false;
  public displayModalPlayerInformation: boolean= false;
  public displayModalAgentInformation: boolean= false;
  public displayModalPlayerHistory: boolean= false;
  public displayModalPlayerPending: boolean= false;

  public allowTransfer : boolean = false;
  public allowSettleFigure : boolean = false;

  public PlayerTransfer: any;
  public _PlayerTransferType :string = 'R';
  public _PlayerTransferAmount : number=0;
  public _PlayerTransferDetail: string='';
  public PlayerLatestTransactionReturn: any[] = [];
  public PlayerTransferReturn:number= 2;
  public PlayerBalanceInformationReturn: any[] = [];
  public PlayerInformationReturn: any;
  public PlayerBalanceInformation:any;
  public PlayerHistoryInfo:any;
  public reportPlayerHistory: any[] = [];
  public reportPlayerPending: any;
  public EditPlayerInfomationReturn: number = 2;

  public AgentTransfer: any;
  public _AgentTransferType :string = 'R';
  public _AgentTransferAmount : number=0;
  public _AgentTransferDate : string= formatDate(new Date(),'yyyy-MM-dd','en-US');
  public _AgentTransferDetail: string='';
  public AgentLatestTransactionReturn: any[] = [];
  public AgentTransferReturn: number = 2;
  public AgentInformationReturn: any; //any[]=[];
  public EditAgentInfomationReturn: number = 2;

  public AgentInformation:any;



  dtOptions: any = {};

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
    this.currentDate  = new Date().toString();
    this._dateRange.Start= formatDate(this.currentDate,'yyyy-MM-dd','en-US');
    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
        }
      }
/****************************DATATABLE OPTIONS*************************************** */
      this.dtOptions = {
        paging: false,
        ordering: false,
        dom: 'Bfrtip',
        buttons: [
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Daysheet Classic'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Daysheet Classic'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Daysheet Classic',filename: 'Daysheet Classic '+ this._currentUser.AgentSelected + ' ' + this._dateRange.Start} ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
/*************************END DATATABLE OPTIONS*************************************** */

    this.GetPermits();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice
  }

  hideFilters()
  {
    this._DataService.methodShowFilters(false);
  }

  GetPermits() {
    let info: AgentAllowTransferRequest = new AgentAllowTransferRequest();

    info.IdAgent = this._currentUser.IdAgentSelected;

    this._reportService.GetAgentAllowTransfer(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.reportAgentAllowTransfer = data;
      this.allowTransfer = this.reportAgentAllowTransfer[0].DSTransaction;
    }, error => {
    });

    let infocolumn: AgentAllowSettleFigureColumn = new AgentAllowSettleFigureColumn();

    infocolumn.IdAgent = this._currentUser.IdAgentSelected;

    this._reportService.GetAgentAllowSettleFigureColumn(infocolumn)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.reportAgentAllowSettleFigure = data;
      this.allowSettleFigure = this.reportAgentAllowSettleFigure[0].cnt;
      }, error => {
    });
    this.GetReport();
  }

  GetReport() {

    if (this.breadkown == true){
      this.GetReportBreadkown();
    }
    else{
        this._loadingReport = true;
        let info: DaySheetClassicRequest = new DaySheetClassicRequest();
        let infoForHeader: DaySheetClassicForHeadersRequest = new DaySheetClassicForHeadersRequest(); // request days of week to convert the date in the name of day of week

        if (this.agentSelected == '' || this.agentSelected == undefined) {
          info.IdAgent = this._currentUser.IdAgentSelected;
          infoForHeader.IdAgent=this._currentUser.IdAgentSelected;
        }
        else {
          info.IdAgent = parseInt(this.agentSelected);
        }

        info.WeekDate = formatDate(this._dateRange.Start,'yyyy-MM-dd','en-US');
        infoForHeader.WeekDate = formatDate(this._dateRange.Start,'yyyy-MM-dd','en-US');

        if (this.actionTypeSelected == 'AP')
        {
        info.ActionType = 'A'
        }
        else{
          info.ActionType = this.actionTypeSelected;
        }
        info.OrderByColumn = this.orderBySelected;
        info.OrderByDirection= this.orderSelected;

        this._reportService.GetDatesForHeaders(infoForHeader)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(data => {
          this.reportHeaders = data;
        }, error => {
        });

        this._reportService.GetDaySheetClassic(info)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(data => {
            this.reportData = data;
            this._loadingReport = false;
          }, error => {this._loadingReport = false;

          });
        }
  }


  GetReportBreadkown() {

    if (this.breadkown == true){

        this._loadingReport = true;
        let info: DaySheetClassicRequest = new DaySheetClassicRequest();
        let infoForHeader: DaySheetClassicForHeadersRequest = new DaySheetClassicForHeadersRequest(); // request days of week to convert the date in the name of day of week


        if (this.agentSelected == '' || this.agentSelected == undefined) {
          info.IdAgent = this._currentUser.IdAgentSelected;
          infoForHeader.IdAgent=this._currentUser.IdAgentSelected;
        }
        else {
          info.IdAgent = parseInt(this.agentSelected);
        }

        info.WeekDate = formatDate(this._dateRange.Start,'yyyy-MM-dd','en-US');
        infoForHeader.WeekDate = formatDate(this._dateRange.Start,'yyyy-MM-dd','en-US');

        if (this.actionTypeSelected == 'AP')
        {
        info.ActionType = 'A'
        }
        else{
          info.ActionType = this.actionTypeSelected;
        }

        info.OrderByColumn = this.orderBySelected;
        info.OrderByDirection= this.orderSelected;

        this._reportService.GetDatesForHeaders(infoForHeader)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(data => {
          this.reportHeaders = data;
        }, error => {
        });

        this._reportService.GetDaySheetClassicBreadkown(info)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(data => {
            this.reportDataBreadkown = data;
            this._loadingReport = false;
          }, error => {this._loadingReport = false;
        });
    }
    else{
      this.GetReport();
    }
  }

  PlayerTransferModal(playerselected: any[]){
    this.PlayerTransfer=playerselected;
    this.displayModalPlayerTransfer = true;
    this.PlayerTransferReturn = 2;
    this.GetPlayerLastestTransaction();
    this.CleanPlayerModalValues();
  }

  InsertPlayerTransfer(){

    let info: InsertPlayerTransactionRequest = new InsertPlayerTransactionRequest();

    info.IDPlayer= this.PlayerTransfer.ID;
    info.Type=  this._PlayerTransferType;
    info.Amount = this._PlayerTransferAmount;
    info.Detail = this._PlayerTransferDetail;

    this._reportService.InsertPlayerTransaction(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.PlayerTransferReturn = data;
      this.GetPlayerLastestTransaction();

    }, error => {this._loadingReport = false;
    });

  }

  GetPlayerLastestTransaction(){

    let info: PlayerLatestTransactionRequest = new PlayerLatestTransactionRequest();
    info.IdPlayer= this.PlayerTransfer.ID;

    this._reportService.GetPlayerLatestTransaction(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.PlayerLatestTransactionReturn = data;
      }, error => {this._loadingReport = false;
    });
  }

  CleanPlayerModalValues(){
    /******clean modal values*****/
    this._PlayerTransferType = 'R';
    this._PlayerTransferAmount =0;
    this._PlayerTransferDetail='';
    /*****************************/
  }


  AgentTransferModal(Agentselected: any[]){
    this.AgentTransfer=Agentselected;
    this.AgentTransferReturn = 2;
    this.GetAgentLastestTransaction();
    this.CleanAgentModalValues();

    this.displayModalAgentTransfer = true;
  }

  GetAgentLastestTransaction(){
    let info: AgentLatestTransactionRequest = new AgentLatestTransactionRequest();

    info.IdAgent= this.AgentTransfer.ID;

    this._reportService.GetAgentLatestTransaction(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.AgentLatestTransactionReturn = data;
     }, error => {this._loadingReport = false;
    });

  }

  InsertAgentTransfer(){
    let info: InsertAgentTransactionRequest = new InsertAgentTransactionRequest();

    info.IDAgent= this.AgentTransfer.ID;
    info.Type=  this._AgentTransferType;
    info.Amount = this._AgentTransferAmount;
    info.Description = this._AgentTransferDetail;
    info.Date= this._AgentTransferDate;

    this._reportService.InsertAgentTransaction(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.AgentTransferReturn = data;
      this.GetAgentLastestTransaction();
    }, error => {this._loadingReport = false;
    });

  }

  CleanAgentModalValues(){
  /******clean modal values*****/
  this._AgentTransferType = 'R';
  this._AgentTransferAmount =0;
  this._AgentTransferDate = formatDate(new Date(),'yyyy-MM-dd','en-US');
  this. _AgentTransferDetail='';
  /*****************************/
  }

  PlayerInformationModal(PlayerInfoSelected: any[]){
    this.EditPlayerInfomationReturn= 2;
    this.PlayerBalanceInformation = PlayerInfoSelected;

    let info: PlayerInformationRequest = new PlayerInformationRequest();
    info.IdPlayer = this.PlayerBalanceInformation.ID;

    this._reportService.GetDaysheetPlayerInformation(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.PlayerInformationReturn = data;
      console.log(this.PlayerInformationReturn);
     }, error => {this._loadingReport = false;
    });

    this.displayModalPlayerInformation = true;
  }

  EditPlayerInformation(){
    let info: EditPlayerInformationRequest = new EditPlayerInformationRequest();

    info.IdPlayer= this.PlayerInformationReturn[0].IDPlayer;
    info.Status = this.PlayerInformationReturn[0].Status;
    info.EnableSports = this.PlayerInformationReturn[0].EnableSports;
    info.OnlineAccess= this.PlayerInformationReturn[0].OnlineAccess;
    info.EnableCasino= this.PlayerInformationReturn[0].EnableCasino;
    info.EnableHorses= this.PlayerInformationReturn[0].EnableHorses;
    info.EnableCards= this.PlayerInformationReturn[0].EnableCards;
    info.Name= this.PlayerInformationReturn[0].Name;
    info.LastName= this.PlayerInformationReturn[0].LastName;
    info.SettledFigure= this.PlayerInformationReturn[0].SettledFigure;
    info.Password= this.PlayerInformationReturn[0].Password;
    info.OnlinePassword= this.PlayerInformationReturn[0].OnlinePassword;
    info.CreditLimit= this.PlayerInformationReturn[0].CreditLimit;
    info.OnlineMaxWager= this.PlayerInformationReturn[0].OnlineMaxWager;
    info.OnlineMinWager= this.PlayerInformationReturn[0].OnlineMinWager;
    info.MaxWager= this.PlayerInformationReturn[0].MaxWager;
    info.MinWager= this.PlayerInformationReturn[0].MinWager;
    info.TempCredit= this.PlayerInformationReturn[0].Temp_Credit;
    info.TempCreditExpire= this.PlayerInformationReturn[0].Temp_Credit_Expire;

    console.log(info);


    this._reportService.EditDaySheetPlayerInfomation(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.EditPlayerInfomationReturn = data;
      console.log(this.EditPlayerInfomationReturn)
    }, error => {this._loadingReport = false;
    });

  }

  AgentInformationModal(AgentInfoselected: any[]){

    this.EditAgentInfomationReturn= 2;
    this.AgentInformation= AgentInfoselected;

    let info: AgentInformationRequest = new AgentInformationRequest();

    info.IdAgent= this.AgentInformation.ID;

    this._reportService.GetAgentInformation(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.AgentInformationReturn = data;
     }, error => {this._loadingReport = false;
    });

    this.displayModalAgentInformation = true;
  }


  EditAgentInformation(){
    let info: EditAgentInformationRequest = new EditAgentInformationRequest();
    info.IDAgent= this.AgentInformation.ID;
    info.Agent = this.AgentInformation.Name;
    info.Password = this.AgentInformationReturn[0].Password;
    info.Name= this.AgentInformationReturn[0].Name;
    info.Address1= this.AgentInformationReturn[0].Address1;
    info.Address2= this.AgentInformationReturn[0].Address2;
    info.City= this.AgentInformationReturn[0].City;
    info.State= this.AgentInformationReturn[0].State;
    info.Country= this.AgentInformationReturn[0].Country;
    info.Zip= this.AgentInformationReturn[0].Zip;
    info.Phone= this.AgentInformationReturn[0].Phone;
    info.Fax= this.AgentInformationReturn[0].Fax;
    info.Email= this.AgentInformationReturn[0].Email;
    info.OnlineMessage= this.AgentInformationReturn[0].OnlineMessage;

    this._reportService.EditAgentInformation(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.EditAgentInfomationReturn = data;
    }, error => {this._loadingReport = false;
    });

  }


  PlayerHistoryModal(PlayerHistory: any[],Day: string){

    this.PlayerHistoryInfo = PlayerHistory;
    let info : PlayerHistoryRequest = new PlayerHistoryRequest();

    info.IDAgent = this.PlayerHistoryInfo.Parent;
    info.IDPlayer =this.PlayerHistoryInfo.ID
    info.Begin = Day;
    info.End = Day;

    this._reportService.GetPlayerHistoryDaySheet(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.reportPlayerHistory = data;
    }, error => {this._loadingReport = false;
    });

    this.displayModalPlayerHistory = true;

  }

  PlayerPendingModal(idplayer : number){
  this._reportService.GetplayerOpenBets(idplayer)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(
      (data) => {
      this.reportPlayerPending = data;
      console.log(this.reportPlayerPending);
    }, error => {this._loadingReport = false;
    });

    this.displayModalPlayerPending = true;
  }
}


