import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestPlayerActivity } from 'src/app/Models/RpModels';
import {AgentDto,
        WeekRangeDto,
        AgentListModel,
        AgentSessionDto,
        RequestPlayerListModel,
        PlayerTotalsDto,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';
import { transformNumber } from 'src/app/Utils/number';
import { transformDate } from 'src/app/Utils/date';

@Component({
  selector: 'app-PlayerTotals',
  templateUrl: './PlayerTotals.component.html',
  styleUrls: ['./PlayerTotals.component.scss']
})
export class PlayerTotalsComponent implements OnInit,OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public currentDate : string = '';
  public reportData: PlayerTotalsDto[] = [];
  public CurrencyList: any[] = [];


  public _loadingReport: boolean = false;
  public i : number = 0;

  public _CurrencySelected : string= '1';

  public columns: IResponsiveTableColumn[] = [
    {
      key: "Player",
      title: "Player",
      frozen: true,
      totalsLabel: "Totals"
    },
    {
      key: "LastWager",
      title: "Last Wager",
      pipe: (value) => transformDate(value)
    },
    {
      key: "TotalRiskOpen",
      title: "Open Bets",
      totalsValue: (report) => `Players: ${report.Players.length}`,
      totalsPipe: (value) => value,
      ...NUMERIC_COLUMN
    },
    {
      key: "TotalRiskGraded",
      title: "Total Bets Amount",
      totalsKey: "TRiskGraded",
      ...NUMERIC_COLUMN
    },
    {
      key: "Win",
      title: "Win",
      totalsKey: "TWin",
      ...NUMERIC_COLUMN
    },
    {
      key: "Lose",
      title: "Lose",
      totalsKey: "TLose",
      ...NUMERIC_COLUMN
    },
    {
      key: "Net",
      title: "Net",
      totalsKey: "TNet",
      ...NUMERIC_COLUMN
    },
    {
      key: "Currency",
      title: "Currency"
    },
    {
      key: "CurrentBalance",
      title: "Current Balance",
      ...NUMERIC_COLUMN
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
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Player Totals'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Player Totals'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Player Totals',filename: 'Player Totals '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      this.GetWeekRange();
      this.GetCurrency();
      this.GetReport();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call
  }

  calculateClasses(value: number): string {
    if (Number(value) > 0) return 'NumPositive';
    else if (Number(value) < 0) return 'NumNegative';
    else return 'NumZero';
  }

  hideFilters()
  {
    this._DataService.methodShowFilters(false);
  }

  GetWeekRange() {
    this._reportService
      .GetWeekRange()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._dateRange = data;
        //  this.GetReport();
        },
        (error) => { }
      );
  } //end submit form

  GetCurrency() {
    this._reportService
      .GetCurrency()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.CurrencyList = data;
         // this.GetReport();
        },
        (error) => { }
      );
  } //end submit form



  GetReport() {

    this._loadingReport = true;


    var t: RequestPlayerActivity = new RequestPlayerActivity();
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    t.EndDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;



    this._reportService.GetPlayerTotals(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        data.sort((a, b) => a.Agent.localeCompare(b.Agent));
        data.forEach(agent => {
          agent.Players.sort((a, b) => a.Player.localeCompare(b.Player));
      });
        this.reportData = data;
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
