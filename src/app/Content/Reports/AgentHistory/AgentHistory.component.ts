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
        AgentDistributionRequest,
        GetReportAgentHistoryDto,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { transformDate } from 'src/app/Utils/date';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';

@Component({
  selector: 'app-AgentHistory',
  templateUrl: './AgentHistory.component.html',
  styleUrls: ['./AgentHistory.component.scss']
})

export class AgentHistoryComponent implements OnInit,OnDestroy {
  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportData: GetReportAgentHistoryDto[] = [];
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;

  public _TransactionSelected :string = '0';
  public _CurrencySelected : string= '1';

  public columns: IResponsiveTableColumn[] = [
    {
      key: "LastModification",
      title: "Date",
      pipe: (value) => transformDate(value),
      frozen: true,
    },
    {
      key: "TransactionType",
      title: "Type",
    },
    {
      key: "Description",
      title: "Description",
    },
    {
      key: "Amount",
      title: "Amount",
      ...NUMERIC_COLUMN
    },
    {
      key: "Balance",
      title: "Balance",
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

  calculateClasses(value: number): string {
    if (Number(value) > 0) return 'NumPositive';
    else if (Number(value) < 0) return 'NumNegative';
    else return 'NumZero';
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
      this.GetWeekRange();
      this.GetCurrency();
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

  GetWeekRange() {
    this._reportService
      .GetWeekRange()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._dateRange = data;
         // this.GetReport();
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

    if(this._dateRange.Start != null)
      t.StartDate = this._dateRange.Start;
    else
      t.StartDate = new Date().toISOString();

    if(this._dateRange.End != null)
      t.EndDate = this._dateRange.End;
    else
      t.EndDate = new Date().toISOString();


    t.PrmType = Number(this._TransactionSelected); //all


    this._reportService.GetAgentHistory(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        console.log("agenthis", data);
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

















