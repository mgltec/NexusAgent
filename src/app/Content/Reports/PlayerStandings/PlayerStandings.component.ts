import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestPlayerActivity } from 'src/app/Models/RpModels';
import {
  WeekRangeDto,
  AgentSessionDto,
  PlayerStandingDto,
} from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { transformNumber } from 'src/app/Utils/number';
import { NUMERIC_COLUMN, calculateClasses } from '../../ReusableComponents/responsive-table/responsive-table.utils';


@Component({
  selector: 'app-PlayerStandings',
  templateUrl: './PlayerStandings.component.html',
  styleUrls: ['./PlayerStandings.component.scss']
})
export class PlayerStandingsComponent implements OnInit, OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: string = '';
  public currentDate: string = '';
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public i: number = 0;
  public reportData: PlayerStandingDto[] = [];
  public MasterTotalAtRisk: number = 0;
  public MasterTotalThisWeek: number = 0;
  public MasterTotalACurrentBal: number = 0;
  public MasterTotalThisWeekSports: number = 0;
  public MasterTotalThisWeekHorses: number = 0;
  public MasterTotalThisWeekCasino: number = 0;

  public _CurrencySelected: string = '1';

  public totalsColumns: IResponsiveTableColumn[] = [
    {
      label: "Totals",
      title: "Totals",
      frozen: true,
    },
    {
      value: (_) => this.MasterTotalThisWeekSports + this.MasterTotalThisWeekHorses + this.MasterTotalThisWeekCasino,
      title: "This Week",
      classes: (value: any) => calculateClasses(value),
    },
    {
      value: (_) => this.MasterTotalAtRisk,
      title: "At Risk",
      classes: (value: any) => calculateClasses(value),
    },
    {
      value: (_) => this.MasterTotalACurrentBal,
      title: "Current Balance",
      classes: (value: any) => calculateClasses(value),
    },
    {
      value: (_) => this.MasterTotalThisWeekSports,
      title: "This Week Sports",
      classes: (value: any) => calculateClasses(value),
    },
    {
      value: (_) => this.MasterTotalThisWeekHorses,
      title: "This Week Horses",
      classes: (value: any) => calculateClasses(value),
    },
    {
      value: (_) => this.MasterTotalThisWeekCasino,
      title: "This Week Casino",
      classes: (value: any) => calculateClasses(value),
    },
  ]

  public columns: IResponsiveTableColumn[] = [
    {
      key: "Player",
      title: "Player",
      frozen: true,
      totalsLabel: "Totals"
    },
    {
      key: "Password",
      title: "Password"
    },
    {
      key: "CreditLimit",
      title: "Credit Limit",
      pipe: (value) => transformNumber(value, '1.2-2')
    },
    {
      key: "ThisWeekSports",
      totalsKey: "TotalThisWeek",
      title: "This Week",
      ...NUMERIC_COLUMN
    },
    {
      key: "AmountAtRisk",
      totalsKey: "TotalAtRisk",
      title: "At Risk",
      ...NUMERIC_COLUMN
    },
    {
      key: "CurrentBalance",
      totalsKey: "TotalCurrentBalance",
      title: "Current Balance",
      ...NUMERIC_COLUMN
    },
    {
      key: "ThisWeekSports",
      totalsKey: "TotalSport",
      title: "This Week Sports",
      ...NUMERIC_COLUMN
    },
    {
      key: "ThisWeekHorses",
      totalsKey: "TotalHorses",
      title: "This Week Horses",
      ...NUMERIC_COLUMN
    },
    {
      key: "ThisWeekCasino",
      totalsKey: "TotalCasino",
      title: "This Week Casino",
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
          { extend: 'copy', footer: true, className: 'pi pi-copy', text: '', title: 'Player Standing' },
          { extend: 'print', footer: true, className: 'pi pi-print', text: '', title: 'Player Standing' },
          { extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '', title: 'Player Standing', filename: 'Player Standing ' + this._currentUser.AgentSelected },
          { extend: 'pdf' },
          { extend: 'pdfHtml5' },
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

  hideFilters() {
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
          //  this.GetReport();
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



    this._reportService.GetPlayerStanding(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        this.reportData = data;
        this.MasterTotalAtRisk = this.reportData.reduce((acc, obj) => acc + obj.TotalAtRisk, 0);
        this.MasterTotalThisWeek = this.reportData.reduce((acc, obj) => acc + obj.TotalThisWeek, 0);
        this.MasterTotalACurrentBal = this.reportData.reduce((acc, obj) => acc + obj.TotalCurrentBalance, 0);
        this.MasterTotalThisWeekSports = this.reportData.reduce((acc, obj) => acc + obj.TotalSport, 0);
        this.MasterTotalThisWeekHorses = this.reportData.reduce((acc, obj) => acc + obj.TotalHorses, 0);
        this.MasterTotalThisWeekCasino = this.reportData.reduce((acc, obj) => acc + obj.TotalCasino, 0);
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
