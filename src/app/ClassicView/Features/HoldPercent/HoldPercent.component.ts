import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IResponsiveTableColumn } from 'src/app/Content/ReusableComponents/responsive-table/responsive-table.types';
import { NUMERIC_COLUMN } from 'src/app/Content/ReusableComponents/responsive-table/responsive-table.utils';
import {WeekRangeDto,
        AgentSessionDto,
        DateAgentDTO,
        GetAgentHoldPercentRequest,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { transformNumber } from 'src/app/Utils/number';


@Component({
  selector: 'app-HoldPercent',
  templateUrl: './HoldPercent.component.html',
  styleUrls: ['./HoldPercent.component.css']
})
export class HoldPercentComponent implements OnInit {

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
  public totals: any = {};

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
      key: "StrWagerType",
      title: "Wager Type",
      frozen: true,
      totalsLabel: "Totals"
    },
    {
      key: "IdSport",
      title: "Sport"
    },
    {
      key: "Amount",
      title: "Amount",
      totalsKey: "TotalAmount",
      pipe: (value) => Math.trunc(parseFloat(value)).toString() 
    },
    {
      key: "WinLost",
      title: "Win/Lost",
      totalsKey: "TotalWinLost",
      pipe: (value) => Math.trunc(parseFloat(value)).toString() 
    },
    {
      key: "HoldPercent",
      title: "Hold %",
      totalsKey: "TotalPercent",
      pipe: (value) =>  parseFloat(value).toFixed(2)
    }
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
    let req = new GetAgentHoldPercentRequest();
    req.StartDate = this._dateRange.Start;
    req.EndDate = this._dateRange.End;
    req.prmIdAgent = this._currentUser.IdAgentSelected;
    this._loadingReport = true;
    this._reportService
      .GetAgentHoldPercent(this._currentUser, req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._loadingReport = false;
          this.totals.TotalPercent = 0;

          this.reportData = data.reduce((acc: any, item: any) => {
            const HoldPercent = item.Amount !== 0 ? ((item.WinLost / item.Amount) * 100).toFixed(2) : '0.00';

            if (!acc[item.Agent]) {
              acc[item.Agent] = {
                players: [], // Aquí se guardarán los jugadores
                TotalAmount: 0,
                TotalWinLost: 0,
                TotalPercent: 0,
              };
            }
          
            // Añadimos el item actual al array de players del agente correspondiente
            acc[item.Agent].players.push({
              ...item,
              HoldPercent, 
            });
          
            // Actualizamos los totales acumulativos
            acc[item.Agent].TotalAmount += Math.trunc(item.Amount);
            acc[item.Agent].TotalWinLost += Math.trunc(item.WinLost);

            return acc;
          }, {});

          Object.keys(this.reportData).forEach(agent => {
            const totalAmount = this.reportData[agent].TotalAmount;
            const totalWinLost = this.reportData[agent].TotalWinLost;
          
            // Calculamos el HoldPercent solo si TotalAmount no es cero
            this.reportData[agent].TotalPercent = totalAmount !== 0 
              ? ((totalWinLost / totalAmount) * 100).toFixed(2)
              : '0.00%';  // Si TotalAmount es cero, HoldPercent será 0.00%
          });
        },
        (error) => {
          console.log("Error in HoldPercent");
        }
      );
  }

  getAgentKeys(groupedData: any): string[] {
    return Object.keys(groupedData);
  }
}
