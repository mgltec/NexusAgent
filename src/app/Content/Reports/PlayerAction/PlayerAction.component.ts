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
        PlayerActionReport,
        AgentWagersRequest,
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
  reportData2: any = [];
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;
  public _dataPlayers: PlayerActionReport[] = [];
  public loading: boolean = false;

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
  public AgentPPlayed: number = 0;
  public AgentTParlay: number = 0;
  public AgentPHits: number = 0;
  public AgentPHAmount: number = 0;
  public MasterPPlayed: number = 0;
  public MasterPHits: number = 0;
  public MasterPHAmount: number = 0;

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
    // {
    //   value: (_) => this.MasterTStraightbet,
    //   title: "Straight",
    //   ...NUMERIC_COLUMN
    // },
    {
      value: (_) => this.MasterTParlay,
      title: "Parlay",
      ...NUMERIC_COLUMN
    },
    {
      value: (_) => this.MasterPPlayed,
      title: "Amount of PC's Played",
      
    },
    {
      value: (_) => this.MasterPHits,
      title: "PC's HITS",
     
    },
    {
      value: (_) => this.MasterPHAmount,
      title: "PC's HITS Amount",
      key: "PcHitsAmount",
      ...NUMERIC_COLUMN
    }
    // {
    //   value: (_) => this.MasterTTeaser,
    //   title: "Teaser",
    //   ...NUMERIC_COLUMN
    // },
    // {
    //   value: (_) => this.MasterTReverse,
    //   title: "Reverse",
    //   ...NUMERIC_COLUMN
    // },
    // {
    //   value: (_) => this.MasterTCasino,
    //   title: "Casino",
    //   ...NUMERIC_COLUMN
    // },
    // {
    //   value: (_) => this.MasterTHorses,
    //   title: "Horses",
    //   ...NUMERIC_COLUMN
    // },
    // {
    //   value: (_) => this.MasterTOtherWagers,
    //   title: "Other Wagers",
    //   ...NUMERIC_COLUMN
    // },
    // {
    //   value: (_) => this.MasterTOtherAdjustment,
    //   title: "Adjustment",
    //   ...NUMERIC_COLUMN
    // },
    // {
    //   value: (_) => this.MasterTHorseAdjustment,
    //   title: "Horse Adjustment",
    //   ...NUMERIC_COLUMN
    // },
    // {
    //   value: (_) => this.MasterTTotal,
    //   title: "Total",
    //   ...NUMERIC_COLUMN
    // }
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

  public columns2: IResponsiveTableColumn[] = [
    {
      key: "Player",
      title: "Player",
      frozen: true,
    },
    {
      key: "Password",
      title: "Password",
    },
    {
      key: "Parlay",
      title: "Parlay",
      totalsKey: "TParlay",
      ...NUMERIC_COLUMN
    },
    {
      key: "AmountPcPlayed",
      title: "Amount of PC's Played",
      totalsKey: "PPlayed",
      
    },
    {
      key: "PcHits",
      title: "PC's HITS",
      totalsKey: "PHits",
   
    },
    {
      key: "PcHitsAmount",
      title: "PC's HITS Amount",
      totalsKey: "PHAmount",
      ...NUMERIC_COLUMN
    }
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
        this.reportData = data;
        this.MasterTPlayers = this.reportData.reduce((acc, obj) => acc + obj.Players.length, 0);
        this.GetReport2();
        if(data.length === 0){
          this.MasterTParlay = 0;
          this.MasterPPlayed = 0;
          this.MasterPHits = 0;
          this.MasterPHAmount = 0;
        }
      },
      error: (err) => {
      },
      complete: () => {

      }

    });

  }


  GetReport2() {
    this._loadingReport = true;
    let info: AgentWagersRequest = new AgentWagersRequest();

    info.prmIdAgent = this._currentUser.IdAgentSelected;
    info.prmIdPlayer = -1;
    info.prmStartDate = this._dateRange.Start;
    info.prmEndDate = this._dateRange.End;
    info.prmSort = 0;
    info.prmUnit = 'ALL';
    info.prmWagerType = -1;
    info.prmResult = -1;

    this._reportService.GetAgentWagers2(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
        this.reportData2 = data;
        this._loadingReport = false;

        this.reportData.forEach(rep => {
          const mappedPlayers = rep.Players.map(player => {
            const playerRecords = this.reportData2.filter((record: any) => record.Player === player.IdPlayer);
            const parlayRecords = playerRecords.filter((record: any) => record.Description.includes('PARLAY'));
            return {
              Player: player.IdPlayer,
              Password: player.Password,
              Parlay: player.Parlay,
              AmountPcPlayed: playerRecords.length,
              PcHits: playerRecords.filter((record: any) => record.Result === 'WIN').length,
              // PcHitsAmount: playerRecords.reduce((acc: any, record: any) => acc + (parseFloat(record.OriginalWinAMount) || 0), 0)
              PcHitsAmount: playerRecords.reduce((acc: any, record: any) => {
                if (record.Result === 'WIN') {
                  return acc + (parseFloat(record.OriginalWinAMount) || 0);
                }
                return acc;
              }, 0)
            };
          });

          rep.Table = mappedPlayers;

          // calculate master agent
          this.AgentPPlayed = rep.Table.reduce((acc: any, obj: any) => acc + obj.AmountPcPlayed, 0);
          this.AgentTParlay = rep.Table.reduce((acc: any, obj: any) => acc + obj.Parlay, 0);
          this.AgentPHits = rep.Table.reduce((acc: any, obj: any) => acc + obj.PcHits, 0);
          this.AgentPHAmount = rep.Table.reduce((acc: any, obj: any) => acc + obj.PcHitsAmount, 0);
          rep.TParlay = this.AgentTParlay;
          rep.PcPlayed = this.AgentPPlayed;
          rep.PcHits = this.AgentPHits;
          rep.PcHAmount = this.AgentPHAmount;

          //calculate master totals
          this.MasterTParlay = this.reportData.reduce((acc, obj) => acc + obj.TParlay, 0);
          this.MasterPPlayed = this.reportData.reduce((acc, obj) => acc + obj.PcPlayed, 0);
          this.MasterPHits = this.reportData.reduce((acc, obj) => acc + obj.PcHits, 0);
          this.MasterPHAmount = this.reportData.reduce((acc, obj) => acc + obj.PcHAmount, 0);
        });


        // console.log(this.reportData);

    }, error => {
        this._loadingReport = false;
    });
}

getValue(item: any, column: IResponsiveTableColumn) {
  if (column.label) return column.label
  if (column.value) return column.value(item)
  if (!column.key) return ""
  return item[column.key]
}

getValuePipe(item: any, column: IResponsiveTableColumn) {
  const value = this.getValue(item, column)
  return column.pipe ? column.pipe(value) : value
}

getClasses(item: any, column: IResponsiveTableColumn) {
  const value = this.getValue(item, column);
  return column.classes ? column.classes(value,item)  : null
}

getTotals(column: IResponsiveTableColumn) {
  if (column.totalsLabel) return column.totalsLabel
  if (column.totalsValue) return column.totalsValue(this.reportData)
  if (!column.totalsKey) return ""

  // return this.reportData[column.totalsKey]
}

getTotalsPipe(column: IResponsiveTableColumn) {
  const value = this.getTotals(column)
  const pipe = column.totalsPipe ?? column.pipe
  return pipe ? pipe(value) : value
}

getPlayersTotal(data:any){
  return data.length;
}

getTotalAgentParlay(data:any){
  return data?.reduce((acc: any, obj: any) => acc + obj.Parlay, 0);
}

getTotalAgentPcHits(data:any){
  return data?.reduce((acc: any, obj: any) => acc + obj.PcHits, 0);
}

getTotalAgentPcHitsAmnount(data:any){
  return data?.reduce((acc: any, obj: any) => acc + obj.PcHitsAmount, 0);
}

getTotalAgentPcPlayed(data:any){
  return data?.reduce((acc: any, obj: any) => acc + obj.AmountPcPlayed, 0);
}

}
