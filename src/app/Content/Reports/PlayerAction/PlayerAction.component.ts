import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestPlayerActivity } from 'src/app/Models/RpModels';
import {AgentDto,
        WeekRangeDto,
        AgentListModel,
        AgentSessionDto,
        PlayerActionDto,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';


@Component({
  selector: 'app-PlayerAction',
  templateUrl: './PlayerAction.component.html',
  styleUrls: ['./PlayerAction.component.scss']
})
export class PlayerActionComponent implements OnInit,OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportData: PlayerActionDto[] = [];
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;

  public MasterTPlayers : number = 0;
  public MasterTStraightbet : number = 0;
  public MasterTParlay : number = 0;
  public MasterTTeaser : number = 0;
  public MasterTReverse : number = 0;
  public MasterTCasino : number = 0;
  public MasterTHorses : number = 0;
  public MasterTOtherWagers : number = 0;
  public MasterTOtherAdjustment : number = 0;
  public MasterTHorseAdjustment : number = 0;
  public MasterTTotal : number = 0;

  public _CurrencySelected : string= '1';

  public totalsColumns: IResponsiveTableColumn[] = [
    {
      label: "Totals",
      title: "",
      frozen: true,
    },
    {
      value: (_) => `Players: ${this.MasterTPlayers}`,
      title: "",
    },
    {
      value: (_) => this.MasterTStraightbet,
      title: "Straight",
      ...NUMERIC_COLUMN
    },
    {
      value: (_) => this.MasterTParlay,
      title: "Parlay",
      ...NUMERIC_COLUMN
    },
    {
      value: (_) => this.MasterTTeaser,
      title: "Teaser",
      ...NUMERIC_COLUMN
    },
    {
      value: (_) => this.MasterTReverse,
      title: "Reverse",
      ...NUMERIC_COLUMN
    },
    {
      value: (_) => this.MasterTCasino,
      title: "Casino",
      ...NUMERIC_COLUMN
    },
    {
      value: (_) => this.MasterTHorses,
      title: "Horses",
      ...NUMERIC_COLUMN
    },
    {
      value: (_) => this.MasterTOtherWagers,
      title: "Other Wagers",
      ...NUMERIC_COLUMN
    },
    {
      value: (_) => this.MasterTOtherAdjustment,
      title: "Adjustment",
      ...NUMERIC_COLUMN
    },
    {
      value: (_) => this.MasterTHorseAdjustment,
      title: "Horse Adjustment",
      ...NUMERIC_COLUMN
    },
    {
      value: (_) => this.MasterTTotal,
      title: "Total",
      ...NUMERIC_COLUMN
    },
  ]

  public columns: IResponsiveTableColumn[] = [
    {
      key: "IdPlayer",
      title: "Player",
      frozen: true,
    },
    {
      key: "Password",
      title: "Password",
    },
    {
      key: "Straightbet",
      title: "Straight",
      totalsKey: "TStraightbet",
      ...NUMERIC_COLUMN
    },
    {
      key: "Parlay",
      title: "Parlay",
      totalsKey: "TParlay",
      ...NUMERIC_COLUMN
    },
    {
      key: "Teaser",
      title: "Teaser",
      totalsKey: "TTeaser",
      ...NUMERIC_COLUMN
    },
    {
      key: "Reverse",
      title: "Reverse",
      totalsKey: "TReverse",
      ...NUMERIC_COLUMN
    },
    {
      key: "Casino",
      title: "Casino",
      totalsKey: "TCasino",
      ...NUMERIC_COLUMN
    },
    {
      key: "Horses",
      title: "Horses",
      totalsKey: "THorses",
      ...NUMERIC_COLUMN
    },
    {
      key: "OtherWagers",
      title: "Other Wagers",
      totalsKey: "TOtherWagers",
      ...NUMERIC_COLUMN
    },
    {
      key: "OtherAdjustment",
      title: "Adjustment",
      totalsKey: "TOtherAdjustment",
      ...NUMERIC_COLUMN
    },
    {
      key: "HorseAdjustment",
      title: "Horse Adjustment",
      totalsKey: "THorseAdjustment",
      ...NUMERIC_COLUMN
    },
    {
      key: "Total",
      title: "Total",
      totalsKey: "TTotal",
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
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Player Action'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Player Action'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Player Action',filename: 'Player Action '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      this.GetWeekRange();
      this.GetCurrency();
      // this.GetReport();

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
          // this.GetReport();
        },
        (error) => { }
      );
  } //end submit form



  GetReport() {

    var t: RequestPlayerActivity = new RequestPlayerActivity();
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.StartDate = this._dateRange.Start;
    t.EndDate = this._dateRange.End;
    this._reportService.GetPlayerActions(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) =>{
        console.log("action",data);
        this.reportData = data;

        this.MasterTPlayers = this.reportData.reduce((acc, obj) => acc + obj.Players.length, 0);
        this.MasterTStraightbet = this.reportData.reduce((acc, obj) => acc + obj.TStraightbet, 0);
        this.MasterTParlay = this.reportData.reduce((acc, obj) => acc + obj.TParlay, 0);
        this.MasterTTeaser = this.reportData.reduce((acc, obj) => acc + obj.TTeaser, 0);
        this.MasterTReverse = this.reportData.reduce((acc, obj) => acc + obj.TReverse, 0);
        this.MasterTCasino = this.reportData.reduce((acc, obj) => acc + obj.TCasino, 0);
        this.MasterTHorses = this.reportData.reduce((acc, obj) => acc + obj.THorses, 0);
        this.MasterTOtherWagers = this.reportData.reduce((acc, obj) => acc + obj.TOtherWagers, 0);
        this.MasterTOtherAdjustment = this.reportData.reduce((acc, obj) => acc + obj.TOtherAdjustment, 0);
        this.MasterTHorseAdjustment = this.reportData.reduce((acc, obj) => acc + obj.THorseAdjustment, 0);
        this.MasterTTotal = this.reportData.reduce((acc, obj) => acc + obj.TTotal, 0);

      },
      error: (err) => {
    
      },
      complete: () => {
   
      }

    });

  }

}
