import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from 'src/app/ui/prime-shim';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { catchError, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import {
  AgentSessionDto,
  RequestWeeklyBalanceClassic,
  WeeklyBalanceClassic,
} from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';

@Component({
  standalone: false,
  selector: 'app-AgentWeeklyBalanceClassic',
  templateUrl: './AgentWeeklyBalanceClassic.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./AgentWeeklyBalanceClassic.component.css']
})
export class AgentWeeklyBalanceClassicComponent implements OnInit, OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public currentDate: string = '';
  public reportData: WeeklyBalanceClassic[] = [];
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public fechaActual: Date = new Date();
  public _dateFromSelected!: string;
  public transactionType: string = "-1";


  public MasterTBalFwd: number = 0;
  public MasterTMon: number = 0;
  public MasterTTue: number = 0;
  public MasterTWed: number = 0;
  public MasterTThu: number = 0;
  public MasterTFri: number = 0;
  public MasterTSat: number = 0;
  public MasterTSun: number = 0;
  public MasterTThisWeek: number = 0;
  public MasterTPmts: number = 0;
  public MasterTBal: number = 0;

  public totalsColumns: IResponsiveTableColumn[] = [
    {
      value: (_) => this._currentUser.AgentSelected,
      title: "",
      frozen: true,
    },
    {
      value: (_) => this.MasterTBalFwd,
      title: "BalFwd",
      pipe: (value) => this.formatValue(value)
    },
    {
      value: (_) => this.MasterTMon,
      title: "Mon",
      pipe: (value) => this.formatValue(value)
    },
    {
      value: (_) => this.MasterTTue,
      title: "Tue",
      pipe: (value) => this.formatValue(value)
    },
    {
      value: (_) => this.MasterTWed,
      title: "Wed",
      pipe: (value) => this.formatValue(value)
    },
    {
      value: (_) => this.MasterTThu,
      title: "Thu",
      pipe: (value) => this.formatValue(value)
    },
    {
      value: (_) => this.MasterTFri,
      title: "Fri",
      pipe: (value) => this.formatValue(value)
    },
    {
      value: (_) => this.MasterTSat,
      title: "Sat",
      pipe: (value) => this.formatValue(value)
    },
    {
      value: (_) => this.MasterTSun,
      title: "Sun",
      pipe: (value) => this.formatValue(value)
    },
    {
      value: (_) => this.MasterTThisWeek,
      title: "This Week",
      pipe: (value) => this.formatValue(value)
    },
    {
      value: (_) => this.MasterTPmts,
      title: "Pmts",
      pipe: (value) => this.formatValue(value)
    },
    {
      value: (_) => this.MasterTBal,
      title: "Balance",
      pipe: (value) => this.formatValue(value)
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
      key: "BalFwd",
      title: "BalFwd",
      totalsKey: "TBalFwd",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "Mon",
      title: "Mon",
      totalsKey: "TMon",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "Tue",
      title: "Tue",
      totalsKey: "TTue",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "Wed",
      title: "Wed",
      totalsKey: "TWed",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "Thu",
      title: "Thu",
      totalsKey: "TThu",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "Fri",
      title: "Fri",
      totalsKey: "TFri",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "Sat",
      title: "Sat",
      totalsKey: "TSat",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "Sun",
      title: "Sun",
      totalsKey: "TSun",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "ThisWeek",
      title: "This Week",
      totalsKey: "TThisWeek",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "Pmts",
      title: "Pmts",
      totalsKey: "TPmts",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "CurrentBalance",
      title: "Balance",
      totalsKey: "TBalance",
      pipe: (value) => this.formatValue(value)
    },
    {
      key: "SettFigDisplay",
      title: "SettFig",
      totalsKey: "TSettFig",
      pipe: (value) =>  this.formatValue(value)
    },
  ]





  dtOptions: any = {};


  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
  ) {
    this._unsubscribeAll = new Subject();

    var year = this.fechaActual.getFullYear();
    var month = this.fechaActual.getMonth() + 1;
    var day = this.fechaActual.getDate();
    this._dateFromSelected = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;


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
          { extend: 'copy', footer: true, className: 'pi pi-copy', text: '', title: 'Player Totals' },
          { extend: 'print', footer: true, className: 'pi pi-print', text: '', title: 'Player Totals' },
          { extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '', title: 'Player Totals', filename: 'Player Totals ' + this._currentUser.AgentSelected },
          { extend: 'pdf' },
          { extend: 'pdfHtml5' },
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */


      this.GetReport();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call
  }

  hideFilters() {
    this._DataService.methodShowFilters(false);
  }

  calculateClasses(value: number): string {
    if (Number(value) > 0) return 'NumPositive';
    else if (Number(value) < 0) return 'NumNegative';
    else return 'NumZero';
  }

  GetReport() {
    this._loadingReport = true;

    const t: RequestWeeklyBalanceClassic = new RequestWeeklyBalanceClassic();
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.Agent = this._currentUser.AgentSelected;
    t.DateInit = this._dateFromSelected;
    t.TransactionType = Number(this.transactionType);

    // Weekly balance + agent tree run as a single chain. `finalize` guarantees
    // the loading flag is cleared on success, error or unsubscribe, so the
    // report can never get stuck loading.
    this._reportService
      .GetWeeklyBalanceClassic(this._currentUser, t)
      .pipe(
        switchMap((data) =>
          this._reportService
            .GetAgentTree(this._currentUser.IdAgentSelected)
            .pipe(
              map((treeData: any) => ({ data, treeData })),
              catchError(() => of({ data, treeData: null }))
            )
        ),
        takeUntil(this._unsubscribeAll),
        finalize(() => (this._loadingReport = false))
      )
      .subscribe({
        next: ({ data, treeData }) => {
          try {
            this.buildReport(data, treeData);
          } catch (error) {
            console.error('GetWeeklyBalanceClassic build error', error);
            this.reportData = [];
          }
        },
        error: () => (this.reportData = []),
      });
  } // end report method

  /** Builds the report rows (agents with their players + master totals). */
  private buildReport(data: any, treeData: any): void {
    let rows: any[] = Array.isArray(data) ? data : [];

    // Shape tolerance: if the API returned flat PLAYER rows (legacy shape with
    // `Player`/`Day1..Day7` and no `Agent`/`Players`), group them under the
    // selected agent so the report still renders.
    if (rows.length > 0 && rows[0].Players === undefined && rows[0].Player !== undefined) {
      rows = [this.groupFlatPlayers(rows)];
    }

    const nonExcludedAgents = this.getNonExcludedAgents(treeData?.children)
      .map((a) => (a || '').trim().toUpperCase());
    const selectedAgent = (this._currentUser.AgentSelected || '').trim().toUpperCase();

    this.reportData = rows
      .map((reportItem: any) => {
        const updatedPlayers = (reportItem.Players || []).map((player: any) => ({
          ...player,
          // The API exposes the weekly running total as `Balance`; the table
          // column reads `CurrentBalance`, so surface it under both names.
          CurrentBalance: player.CurrentBalance ?? player.Balance,
          SettFigDisplay:
            player.SettFig === 1 || player.SettFig === 100 ? player.BalFwd : '0',
        }));
        const TSettFig = updatedPlayers.reduce(
          (acc: number, player: any) => acc + Number(player.SettFigDisplay),
          0
        );
        return { ...reportItem, Players: updatedPlayers, TSettFig };
      })
      .filter((reportItem: any) => {
        const agent = (reportItem.Agent || '').trim().toUpperCase();
        // With no exclusion tree available, show everything instead of
        // filtering the whole report out.
        if (nonExcludedAgents.length === 0) {
          return true;
        }
        return (
          nonExcludedAgents.includes(agent) ||
          (agent === selectedAgent && (reportItem.Players?.length || 0) > 0)
        );
      })
      .sort((a: any, b: any) => (a.Agent || '').localeCompare(b.Agent || ''));

    const sum = (key: string): number =>
      this.reportData.reduce((acc: number, obj: any) => acc + (Number(obj[key]) || 0), 0);

    this.MasterTBalFwd = sum('TBalFwd');
    this.MasterTMon = sum('TMon');
    this.MasterTTue = sum('TTue');
    this.MasterTWed = sum('TWed');
    this.MasterTThu = sum('TThu');
    this.MasterTFri = sum('TFri');
    this.MasterTSat = sum('TSat');
    this.MasterTSun = sum('TSun');
    this.MasterTThisWeek = sum('TThisWeek');
    this.MasterTPmts = sum('TPmts');
    this.MasterTBal = this.MasterTBalFwd + this.MasterTThisWeek;
  }

  /**
   * Adapts the legacy flat shape (one row per player with Day1..Day7) into a
   * single agent group with `Players` and `T*` totals, so the report renders
   * even when the API responds with the un-nested format.
   */
  private groupFlatPlayers(rows: any[]): any {
    const players = rows
      .filter((r) => (r.Cnt || 0) !== 0 || (r.BalFwd || 0) !== 0 || (r.Pmts || 0) !== 0)
      .map((r) => {
        const thisWeek =
          (Number(r.Day1) || 0) + (Number(r.Day2) || 0) + (Number(r.Day3) || 0) +
          (Number(r.Day4) || 0) + (Number(r.Day5) || 0) + (Number(r.Day6) || 0) +
          (Number(r.Day7) || 0);
        return {
          ...r,
          Mon: r.Day1, Tue: r.Day2, Wed: r.Day3, Thu: r.Day4,
          Fri: r.Day5, Sat: r.Day6, Sun: r.Day7,
          ThisWeek: thisWeek,
          Balance: thisWeek,
          SettFig: Number(r.SettledFigure) || 0,
        };
      });

    const sum = (key: string) =>
      players.reduce((acc, p) => acc + (Number(p[key]) || 0), 0);

    return {
      Agent: this._currentUser.AgentSelected,
      IdAgent: this._currentUser.IdAgentSelected,
      IsDistribuitor: false,
      Players: players,
      TBalFwd: sum('BalFwd'),
      TMon: sum('Mon'), TTue: sum('Tue'), TWed: sum('Wed'), TThu: sum('Thu'),
      TFri: sum('Fri'), TSat: sum('Sat'), TSun: sum('Sun'),
      TThisWeek: sum('ThisWeek'),
      TPmts: sum('Pmts'),
      TBalance: sum('Balance'),
    };
  }

  getNonExcludedAgents(children: any[]): string[] {
    let agents: string[] = [];
    if (!children) {
      return agents;
    }

    children.forEach(child => {
        if (child.AgentExcluded === 0) {
            agents.push(child.Agent); // Agrega el agente si no está excluido
        }
        if (child.children && child.children.length > 0) {
            agents = agents.concat(this.getNonExcludedAgents(child.children)); // Llama recursivamente
        }
    });

    return agents;
}

getCurrentValue(observable: BehaviorSubject<number>): number {
  console.log(observable.getValue())
  return observable.getValue();
}

formatValue(value: number): string {
  if (value === null || value === undefined) {
    return '0';
  }
  return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
}
