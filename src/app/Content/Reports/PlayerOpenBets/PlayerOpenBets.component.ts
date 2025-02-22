import { OpenBetWagerDetails } from './../../../Models/models';
import { formatDate } from '@angular/common';
import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestPlayerActivity } from 'src/app/Models/RpModels';
import {AgentDto,
        WeekRangeDto,
        AgentSessionDto,
        GetReportAgentHistoryDto,
        OpenWagerTypes,
        OpenWagerCurrencies,
        OpenWagerSports,
        OpenWagerPlayers,
        OpenBetsRequest,
        OpenBetsResult,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';
import { transformDate } from 'src/app/Utils/date';

@Component({
  selector: 'app-PlayerOpenBets',
  templateUrl: './PlayerOpenBets.component.html',
  styleUrls: ['./PlayerOpenBets.component.scss']
})
export class PlayerOpenBetsComponent implements OnInit, OnDestroy {
  public _unsubscribeAll: Subject<any>;
  public ListOfWagers: OpenWagerTypes[] = [];
  public WagerSelected: number = -1;
  public CurrencyList: OpenWagerCurrencies[] = [];
  public _CurrencySelected : string= '1';
  public _SportList : OpenWagerSports[] = [];
  public _SportSelected: string = "All";
  public _PlayerList: OpenWagerPlayers[] = [];
  public _PlayerSelected: number = -1;


  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();


  public reportData: OpenBetsResult[] = [];

  public _loadingReport: boolean = false;
  public i : number = 0;

  public _TransactionSelected :string = '0';
  public _dateRange: WeekRangeDto = new WeekRangeDto();

  public columns: IResponsiveTableColumn[] = [
    {
      title: "Placed",
      frozen: true,
      template: (item) => `
        <div>
          <span>${transformDate(item.Placed)}</span>
          <br>
          <span class="ticket">Ticket: ${item.Ticket}</span>
        </div>
      `
    },
    {
      key: "UserPhone",
      title: "User/Phone"
    },
    {
      title: "Details",
      cellClasses: "wagers-list",
      template: (item) => `
        <div class="wager-type">${this.GetWagerType(item.TicketDetails)?.Description}</div>
        <ul>
          ${this.GetWagerDetails(item.TicketDetails).map((wager) => `
            <li>
              <span class="wager-details">
                ${wager.GameDate != null && wager.GameDate != undefined && wager.GameDate != '0001-01-01T00:00:00' ? `${transformDate(wager.GameDate)} - ` : ''}${wager.Sport}
              </span> 
              <span class="wager-divider">|</span>
              <span class="wager-description">${wager.Description}}</span>
            </li>
          `).join("")}
        </ul>
      `,
    },
    {
      key: "RiskWin",
      title: "Risk/Win"
    },
  ]

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
        responsive: true,
        paging: false,
        ordering: true,
        dom: 'Bfrtip',
        buttons: [
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent History'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent History'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent History',filename: 'Agent History '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      this.GetTypeOfWagers();
      //this.GetCurrency();
      this.GetSports();
      this.GetPlayers();
      this.GetReport();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call
  }


  hideFilters()
  {
    this._DataService.methodShowFilters(false);
  }

  GetTypeOfWagers() {
    this._reportService
      .GetOpenBetsWagertypes(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.ListOfWagers = data;
        },
        (error) => { }
      );
  } //end submit form

  GetCurrency() {
    this._reportService
      .GetOpenWagerCurrencies(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.CurrencyList = data;
         // this.GetReport();
        },
        (error) => { }
      );
  } //end submit form

  GetSports() {
    this._reportService
      .GetOpenBetsIdSports(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._SportList = data;
         // this.GetReport();
        },
        (error) => { }
      );
  } //end submit form

  
  GetPlayers() {
    this._reportService
      .GetOpenWagerPlayers(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._PlayerList = data;
         // this.GetReport();
        },
        (error) => { }
      );
  } //end submit form

  GetWagerType(wagers: OpenBetWagerDetails[]) {
    return wagers.find(wager => wager.Sport === null)
  }

  GetWagerDetails(wagers: OpenBetWagerDetails[]) {
    return wagers.filter(wager => wager.Sport !== null)
  }


  GetReport() {


    this._loadingReport = true;


    var t: OpenBetsRequest = new OpenBetsRequest();

    t.IdAgent = this._currentUser.IdAgentSelected;
    t.IdPlayer = this._PlayerSelected;
    t.IdSport = this._SportSelected;



    this._reportService.GetOpenWagers(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        console.log("OpenBets", data);
        this.reportData = data;
      },
      error: (err) => {
        this._loadingReport = false;
      },
      complete: () => {
        this._loadingReport = false;
      }

    });


  }

}








