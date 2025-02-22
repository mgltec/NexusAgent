import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {WeekRangeDto,
        AgentListModel,
        AgentSessionDto,
        RequestPlayerListModel,
        CasinoGameHandsRequest,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-CasinoGameHands',
  templateUrl: './CasinoGameHands.component.html',
  styleUrls: ['./CasinoGameHands.component.css']
})
export class CasinoGameHandsComponent implements OnInit,OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportData: any[] = [];
  public CurrencyList: any[] = [];
  public agentList: any[] = [];
  public playerList: any[] = [];
  public playerSelected: string = '0';
  public _loadingReport: boolean = false;
  public i : number = 0;

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
        ordering: true,
        dom: 'Bfrtip',
        buttons: [
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Casino Game Hands'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Casino Game Hands'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Casino Game Hands',filename: 'Casino Game Hands '+  this._currentUser.AgentSelected} ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      this.GetWeekRange();
       this.GetAgentList();
    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call
  }

  hideFilters()
  {
    this._DataService.methodShowFilters(false);
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
      this.playerSelected='0'
  }

  GetWeekRange() {
    this._reportService
      .GetWeekRange()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._dateRange = data;
         this.GetReport();
         },
        (error) => { }
      );
  } //end submit form

  GetReport(){
    this._loadingReport = true;
    let info: CasinoGameHandsRequest = new CasinoGameHandsRequest();

    info.Player = this.playerSelected;
    info.Date = this._dateRange.Start;

    this._reportService.GetCasinoGameDetails(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.reportData = data;
        this._loadingReport = false;
      }, error => {this._loadingReport = false;

      });
  }

}
