import { formatDate } from '@angular/common';
import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestPlayerActivity } from 'src/app/Models/RpModels';
import {AgentDto,
        WeekRangeDto,
        AgentListModel,
        AgentSessionDto,
        AgentGrossWeekDto,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';
import { transformNumber } from 'src/app/Utils/number';

@Component({
  selector: 'app-AgentGrossWeek',
  templateUrl: './AgentGrossWeek.component.html',
  styleUrls: ['./AgentGrossWeek.component.css']
})
export class AgentGrossWeekComponent implements OnInit,OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportData: AgentGrossWeekDto[] = [];
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;

  public _CurrencySelected : string= '1';

  public columns: IResponsiveTableColumn[] = [
    {
      key: "Player",
      title: "Player",
      frozen: true,
      totalsValue: (report) => `Totals Players: ${report.Players.length}`,
    },
    {
      key: "BalFwd",
      title: "BalFwd",
      totalsKey: "TBalFwd",
      pipe: (value: any) => transformNumber(value, '1.2-2')
    },
    {
      key: "Pmts",
      title: "Pmts",
      totalsKey: "TPmts",
      pipe: (value: any) => transformNumber(value, '1.2-2')
    },
    {
      key: "casinoweek",
      title: "Casino Week",
      totalsKey: "TCasino",
      ...NUMERIC_COLUMN,
    },
    {
      key: "sportsweek",
      title: "Sports Week",
      totalsKey: "TSports",
      ...NUMERIC_COLUMN,
    },
    {
      key: "horsesweek",
      title: "Horses Week",
      totalsKey: "THorses",
      ...NUMERIC_COLUMN,
    },
    {
      key: "TotalWeek",
      title: "Total Week",
      totalsKey: "TTotalWeek",
      ...NUMERIC_COLUMN,
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
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Gross Week'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Gross Week'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Gross Week',filename: 'Agent Gross Week '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      this.GetWeekRange();
      this.GetCurrency();
      this.GetReport();
    // this.GetWeeks();
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



    this._reportService.GetAgentGrossWeek(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
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







