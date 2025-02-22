
import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
        WeekRangeDto,
        AgentSessionDto,
        GetIPLoginDto,
        GetSubAgentsDto,
        GetPlayersTelegramSubcribedDto,
        GetAgentPlayerDto,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-TelegramBetAlert',
  templateUrl: './TelegramBetAlert.component.html',
  styleUrls: ['./TelegramBetAlert.component.css']
})
export class TelegramBetAlertComponent implements OnInit, OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: number = 0;
  public currentDate : string = '';
  public reportData: GetIPLoginDto[] = [];
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;
  public agents: GetSubAgentsDto[] = [];
  public TelegramChatId: number =0;
  public PlayersTelegram: GetPlayersTelegramSubcribedDto[] = [];
  public PlayerSelected: number  = 0;
  public _CurrencySelected : string= '1';
  public AgentPlayers: GetAgentPlayerDto[] = [];

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
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Gross Week'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Gross Week'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Gross Week',filename: 'Agent Gross Week '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      // this.GetWeekRange();
      // this.GetCurrency();
      this.getAgents();
    // this.GetWeeks();
    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call
  }

  hideFilters()
  {
    this._DataService.methodShowFilters(false);
  }

  getAgents() {

    this._loadingReport = true;


    this._reportService.GetAgents(this._currentUser, this._currentUser.IdAgentSelected).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        this.agents = data;

      },
      error: (err) => {
        this._loadingReport = false;
      },
      complete: () => {
        this._loadingReport = false;
      }

    });

  }//end report method


  GetTelegramInfo() {

    this._loadingReport = true;


    this._reportService.GetTelegramInfo(this._currentUser, this.agentSelected).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        console.log(data);
        this.TelegramChatId = data;
        this.GetPlayersTelegramSubcribed();
        this.GetAgentPlayers();

      },
      error: (err) => {
        this._loadingReport = false;
      },
      complete: () => {
        this._loadingReport = false;
      }

    });

  }//end report method

  GetPlayersTelegramSubcribed() {

    this._loadingReport = true;


    this._reportService.GetPlayersTelegramSubcribed(this._currentUser, this.TelegramChatId).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        console.log(data);
        this.PlayersTelegram = data;

      },
      error: (err) => {
        this._loadingReport = false;
      },
      complete: () => {
        this._loadingReport = false;
      }

    });

  }//end report method


  GetAgentPlayers() {

    this._loadingReport = true;


    this._reportService.GetAgentPlayers(this._currentUser, this.agentSelected).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        console.log(data);
        this.AgentPlayers = data;

      },
      error: (err) => {
        this._loadingReport = false;
      },
      complete: () => {
        this._loadingReport = false;
      }

    });

  }//end report method

}




