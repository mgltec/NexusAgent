import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {AgentDto,
        WeekRangeDto,
        AgentListModel,
        AgentSessionDto,
        RequestPlayerListModel,
        GetPlayerAccessRequestDTO,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';
import { transformDate } from 'src/app/Utils/date';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';

@Component({
  selector: 'app-PlayerAccess',
  templateUrl: './PlayerAccess.component.html',
  styleUrls: ['./PlayerAccess.component.scss']
})
export class PlayerAccessComponent implements OnInit,OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportData: any[] = [];
  public CurrencyList: any[] = [];
  public agentList: any[] = [];
  public playerList: any[] = [];
  public playerSelected: string = '-1';
  public _loadingReport: boolean = false;
  public i : number = 0;

  public _CurrencySelected : string= '1';

  dtOptions: any = {};

  
  public columns: IResponsiveTableColumn[] = [
    {
      key: "Player",
      title: "Player",
      frozen: true,
    },
    {
      key: "IdCall",
      title: "Call ID",
    },
    {
      key: "StartTime",
      title: "Start Time",
      pipe: (value) => this.transformDateLarge(value),
    },
    {
      key: "EndTime",
      title: "End Time",
      pipe: (value) => this.transformDateLarge(value),
    },
    {
      key: "IP",
      title: "IP Access",
    }
  ]

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
        buttons: [
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Player Access'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Player Access'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Player Access',filename: 'Player Access '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      this.GetWeekRange();
      this.GetAgentList();
    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call
  }


  hideFilters()
  {
    this._DataService.methodShowFilters(false);
  }

  GetAgentList() {

    let info: AgentListModel = new AgentListModel();

    info.idAgent = this._currentUser.IdAgentSelected;
    info.agent = this._currentUser.AgentSelected;
    this._reportService.GetAgentsList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.agentList = data['List'];
        this.agentSelected = data['List'][0]._idagent;
      }, error => {

      });
  }

  GetPlayerList() {

    let info: RequestPlayerListModel = new RequestPlayerListModel();

    if (this.agentSelected == '' || this.agentSelected == undefined) {
      info.idAgent = this._currentUser.IdAgentSelected;
    }
    else {
      info.idAgent = parseInt(this.agentSelected);

    }

    this._reportService.GetPlayerList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.playerList = data;
        this.playerSelected = "-1";
      }, error => {

      });
      this.playerSelected='0'
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
    let req = new GetPlayerAccessRequestDTO();
    req.prmStartDate = this._dateRange.Start;
    req.prmEndDate = this._dateRange.End;
    req.prmIdAgent = this.agentSelected ? parseInt(this.agentSelected): this._currentUser.IdAgentSelected;
    req.prmIdPlayer = parseInt(this.playerSelected);
    req.prmIP = "";
    req.prmPhoneLine = -1;

    this._loadingReport = true;
    this._reportService
      .GetPlayerAccess(this._currentUser, req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._loadingReport = false;
          this.reportData = data;

        },
        (error) => {
          console.log("Error in HoldPercent");
        }
      );
  }

  transformDateLarge(value: string): string {
    const date = new Date(value);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

}
