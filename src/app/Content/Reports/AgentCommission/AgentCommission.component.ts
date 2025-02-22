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
        AgentCommissionDto,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { transformNumber } from 'src/app/Utils/number';
import { NUMERIC_COLUMN, calculateClasses } from '../../ReusableComponents/responsive-table/responsive-table.utils';

@Component({
  selector: 'app-AgentCommission',
  templateUrl: './AgentCommission.component.html',
  styleUrls: ['./AgentCommission.component.scss']
})
export class AgentCommissionComponent implements OnInit,OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportData: AgentCommissionDto = new AgentCommissionDto();
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;

  public columns: IResponsiveTableColumn[] = [
    {
      value: (item) => `${item.Player} (${item.Password})`,
      title: "Player",
      frozen: true,
      totalsLabel: "Totals",
      route: (_) => ['/mainbk/playerdetails'],
      params: (item) => ({ player: item.Player, idplayer: item.IdPlayer })
    },
    {
      key: "Pmts",
      title: "Pmts",
      ...NUMERIC_COLUMN
    },
    {
      key: "Balance",
      title: "Balance",
      ...NUMERIC_COLUMN
    },
    {
      key: "BalFwd",
      title: "BalFwd",
      pipe: (value) => transformNumber(value, '1.2-2')
    },
    {
      key: "Day1",
      title: "Mon",
      totalsKey: "TDay1",
      ...NUMERIC_COLUMN,
    },
    {
      key: "Day2",
      title: "Tue",
      totalsKey: "TDay2",
      ...NUMERIC_COLUMN,
    },
    {
      key: "Day3",
      title: "Wed",
      totalsKey: "TDay3",
      ...NUMERIC_COLUMN,
    },
    {
      key: "Day4",
      title: "Thu",
      totalsKey: "TDay4",
      ...NUMERIC_COLUMN,
    },
    {
      key: "Day5",
      title: "Fri",
      totalsKey: "TDay5",
      ...NUMERIC_COLUMN,
    },
    {
      key: "Day6",
      title: "Sat",
      totalsKey: "TDay6",
      ...NUMERIC_COLUMN,
    },
    {
      key: "Day7",
      title: "Sun",
      totalsKey: "TDay7",
      ...NUMERIC_COLUMN,
    },
    {
      key: "Week",
      title: "Week",
      totalsKey: "TWeek",
      ...NUMERIC_COLUMN,
    },
    {
      key: "Settled",
      title: "Settled",
      ...NUMERIC_COLUMN,
    },
  ]

  public _CurrencySelected : string= '1';

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
        responsive: true,
        buttons: [
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Commission'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Commission'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Commission',filename: 'Agent Commission '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      this.GetWeekRange();
      this.GetCurrency();
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

  calculateClasses(value: number): string {
    if (Number(value) > 0) return 'NumPositive';
    else if (Number(value) < 0) return 'NumNegative';
    else return 'NumZero';
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

  GetCurrency() {
    this._reportService
      .GetCurrency()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.CurrencyList = data;
          this.GetReport();
        },
        (error) => { }
      );
  } //end submit form

  GetReport() {

    this._loadingReport = true;
    let t: RequestPlayerActivity = new RequestPlayerActivity();

    t.Agent = this._currentUser.AgentSelected;
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.SubAgent = this._currentUser.AgentSelected;
    t.IdSubAgent = this._currentUser.IdAgentSelected;
    t.StartDate = this._dateRange.Start;

    this._reportService.GetAgentCommission(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
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

  }//end getReport()


}






