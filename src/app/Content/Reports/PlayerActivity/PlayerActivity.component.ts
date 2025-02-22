import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {AgentDto,
        WeekRangeDto,
        AgentListModel,
        AgentSessionDto,
        RequestPlayerListModel,
        DateAgentDTO,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';
import { transformNumber } from 'src/app/Utils/number';


@Component({
  selector: 'app-PlayerActivity',
  templateUrl: './PlayerActivity.component.html',
  styleUrls: ['./PlayerActivity.component.css']
})
export class PlayerActivityComponent implements OnInit,OnDestroy {


  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public currentDate : string = '';
  public reportData: any = [];
  public _loadingReport: boolean = false;
  public i : number = 0;

  public SelectedActivity: string = '2';
  public SelectedAccess: string = '3';
  public SelectedSource: string = '3';
  public SelectedStatus: string = '2';

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

  public columns: IResponsiveTableColumn[] = [
    {
      key: "Player",
      title: "Player",
      frozen: true,
      totalsLabel: "Totals"
    },
    {
      key: "AccessLocal",
      title: "Phone Access",
      totalsKey: "TotalAccessLocal"
    },
    {
      key: "AccessOnline",
      title: "Online Access",
      totalsKey: "TotalAccessOnline"
    },
    {
      key: "TotalAccess",
      title: "Total Access",
      totalsKey: "TotalTotalAccess"
    },
    {
      key: "GradedWagerLocal",
      title: "Pending Local",
      totalsKey: "TotalGradedWagerLocal"
    },
    {
      key: "GradedWagerOnline",
      title: "Pending Online",
      totalsKey: "TotalGradedWagerOnline"
    },
    {
      key: "OpenWagerLocal",
      title: "Settled Local",
      totalsKey: "TotalOpenWagerLocal"
    },
    {
      key: "OpenWagerOnline",
      title: "Settled Online",
      totalsKey: "TotalOpenWagerOnline"
    },
    {
      key: "Total",
      title: "Total",
      totalsKey: "Total"
    },
  ]

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
        buttons: [
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Player Activity'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Player Activity'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Player Activity',filename: 'Player Activity '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      this.GetWeekRange();

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
          this.GetReport();
        },
        (error) => { }
      );
  } //end submit form



  GetReport() {
    let req = new DateAgentDTO();
    req.prmStartDate = this._dateRange.Start;
    req.prmEndDate = this._dateRange.End;
    req.prmIdAgent = this._currentUser.IdAgentSelected;
    this._loadingReport = true;
    this._reportService
      .GetAgentPlayerCount(this._currentUser, req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          // this.reportData = data;
          this.reportData = data.reduce((acc: any, item: any) => {
            const TotalAccess = item.AccessLocal + item.AccessOnline;
            const Total = item.AccessLocal + item.AccessOnline + item.GradedWagerLocal + item.GradedWagerOnline + item.OpenWagerLocal + item.OpenWagerOnline;
            const TotalAccessLocal = 10;
            if (!acc[item.Agent]) {
              acc[item.Agent] = {
                players: [], // Aquí se guardarán los jugadores
                TotalAccessLocal: 0,
                TotalAccessOnline: 0,
                TotalGradedWagerLocal: 0,
                TotalGradedWagerOnline: 0,
                TotalOpenWagerLocal: 0,
                TotalOpenWagerOnline: 0,
                TotalTotalAccess: 0,
                Total: 0
              };
            }
          
            // Añadimos el item actual al array de players del agente correspondiente
            acc[item.Agent].players.push({
              ...item,
              TotalAccess, 
              Total
            });
          
            // Actualizamos los totales acumulativos
            acc[item.Agent].TotalAccessLocal += item.AccessLocal;
            acc[item.Agent].TotalAccessOnline += item.AccessOnline;
            acc[item.Agent].TotalGradedWagerLocal += item.GradedWagerLocal;
            acc[item.Agent].TotalGradedWagerOnline += item.GradedWagerOnline;
            acc[item.Agent].TotalOpenWagerLocal += item.OpenWagerLocal;
            acc[item.Agent].TotalOpenWagerOnline += item.OpenWagerOnline;
            acc[item.Agent].TotalTotalAccess += TotalAccess;
            acc[item.Agent].Total += Total;
          
            return acc;
          }, {});

          console.log(this.reportData)
          this._loadingReport = false;
        },
        (error) => {
          console.log("Error in AgentPlayerCount");
        }
      );
  }

  getAgentKeys(groupedData: any): string[] {
    return Object.keys(groupedData);
  }
}
