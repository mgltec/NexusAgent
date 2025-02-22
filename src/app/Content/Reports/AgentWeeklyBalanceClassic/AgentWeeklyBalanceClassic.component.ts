import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  selector: 'app-AgentWeeklyBalanceClassic',
  templateUrl: './AgentWeeklyBalanceClassic.component.html',
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
    var t: RequestWeeklyBalanceClassic = new RequestWeeklyBalanceClassic();
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.Agent = this._currentUser.AgentSelected;
    t.DateInit = this._dateFromSelected;
    t.TransactionType = Number(this.transactionType);

    this._reportService.GetWeeklyBalanceClassic(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        console.log("weekly", data);
        // this.reportData = data;
          this._reportService
            .GetAgentTree(this._currentUser.IdAgentSelected)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
              (treeData) => {
                let treeD = treeData
                // const nonExcludedAgents = treeD.children.filter(agent => agent.AgentExcluded === 0).map(agent => agent.Agent);
                const nonExcludedAgents = this.getNonExcludedAgents(treeD.children);
               
                // this.reportData = data
                //     .filter(reportItem => nonExcludedAgents.includes(reportItem.Agent))
                //     .sort((a, b) => a.Agent.localeCompare(b.Agent));

                // this.reportData = data
                // .filter(reportItem => 
                //   nonExcludedAgents.includes(reportItem.Agent) || 
                //   (reportItem.Agent === this._currentUser.AgentSelected && reportItem.Players.length > 0)
                // )
                // .sort((a, b) => a.Agent.localeCompare(b.Agent));

                // this.reportData = data
                // .map(reportItem => ({
                //   ...reportItem,
                //   Players: reportItem.Players.map(player => ({
                //     ...player,
                //     SettFigDisplay: player.SettFig === 1 ? player.BalFwd : "0",
                //   }))
                // }))
                // .filter(reportItem => 
                //   nonExcludedAgents.includes(reportItem.Agent) || 
                //   (reportItem.Agent === this._currentUser.AgentSelected && reportItem.Players.length > 0)
                // )
                // .sort((a, b) => a.Agent.localeCompare(b.Agent));

                this.reportData = data
                .map(reportItem => {
                  // Calcula SettFigDisplay para cada jugador
                  const updatedPlayers = reportItem.Players.map(player => ({
                    ...player,
                    SettFigDisplay: (player.SettFig === 1 || player.SettFig === 100) ? player.BalFwd : "0"
                  }));

                  // Calcula TSettFig basado en los nuevos SettFigDisplay
                  const TSettFig = updatedPlayers.reduce((acc, player) => acc + Number(player.SettFigDisplay), 0);

                  return {
                    ...reportItem,
                    Players: updatedPlayers,
                    TSettFig
                  };
                })
                .filter(reportItem => 
                  nonExcludedAgents.includes(reportItem.Agent) || 
                  (reportItem.Agent === this._currentUser.AgentSelected && reportItem.Players.length > 0)
                )
                .sort((a, b) => a.Agent.localeCompare(b.Agent));

              
                
                this.MasterTBalFwd = this.reportData.reduce((acc, obj) => acc + obj.TBalFwd, 0);
                this.MasterTMon= this.reportData.reduce((acc, obj) => acc + obj.TMon, 0);
                this.MasterTTue= this.reportData.reduce((acc, obj) => acc + obj.TTue, 0);
                this.MasterTWed= this.reportData.reduce((acc, obj) => acc + obj.TWed, 0);
                this.MasterTThu= this.reportData.reduce((acc, obj) => acc + obj.TThu, 0);
                this.MasterTFri= this.reportData.reduce((acc, obj) => acc + obj.TFri, 0);
                this.MasterTSat= this.reportData.reduce((acc, obj) => acc + obj.TSat, 0);
                this.MasterTSun= this.reportData.reduce((acc, obj) => acc + obj.TSun, 0);
                this.MasterTThisWeek= this.reportData.reduce((acc, obj) => acc + obj.TThisWeek, 0);
                this.MasterTPmts= this.reportData.reduce((acc, obj) => acc + obj.TPmts, 0);
                this.MasterTBal= this.MasterTBalFwd  + this.MasterTThisWeek;
                console.log(this.reportData)
                },
                 (error) => {
                 }
               );
        

      },
      error: (err) => {
        this._loadingReport = false;
      },
      complete: () => {
        this._loadingReport = false;
      }

    });

  }//end report method

  getNonExcludedAgents(children: any[]): string[] {
    let agents: string[] = [];

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
  return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
}
