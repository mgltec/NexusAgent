import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestPlayerActivity } from 'src/app/Models/RpModels';
import {AgentDto,
        WeekRangeDto,
        AgentListModel,
        AgentSessionDto,
        RequestPlayerListModel,
        AgentPlayerHistorySpDto,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { transformDate } from 'src/app/Utils/date';

@Component({
  selector: 'app-PlayerHistoryDefault',
  templateUrl: './PlayerHistoryDefault.component.html',
  styleUrls: ['./PlayerHistoryDefault.component.scss']
})
export class PlayerHistoryDefaultComponent implements OnInit {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportData: AgentPlayerHistorySpDto[] = [];
  public CurrencyList: any[] = [];
  public agentList: any[] = [];
  public playerList: any[] = [];
  public playerSelected: string = '-1';
  public _loadingReport: boolean = false;
  public i : number = 0;

  public _CurrencySelected : string= '1';

  public columns: IResponsiveTableColumn[] = [
    {
      key: "Player",
      title: "Player",
      frozen: true,
    },
    {
      value: (item) => `${item.LoginName} / ${item.PhoneLine}`,
      title: "User/Phone",
    },
    {
      key: "PlacedDate",
      title: "Date",
    },
    {
      key: "IdSport",
      title: "Sport",
    },
    {
      key: "DetailDesc",
      title: "Description",
    },
    {
      key: "RiskAmount",
      title: "Risk/Win",
      ...NUMERIC_COLUMN
    },
    {
      key: "Amount",
      title: "Amount",
      ...NUMERIC_COLUMN
    },
    {
      key: "Result",
      title: "Result",
    },
    {
      key: "PlacedDate",
      title: "Placed",
      pipe: (value) => transformDate(value),
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
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Player History'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Player History'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Player History',filename: 'Player History '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */

      this._dateRange.Start = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
      this._dateRange.End = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;
      this.GetWeekRange();
      this.GetCurrency();
      this.GetAgentList();
      this.GetReport();
      this.GetPlayerList();
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

  GetAgentList() {

    let info: AgentListModel = new AgentListModel();

    info.idAgent = this._currentUser.IdAgentSelected;
    info.agent = this._currentUser.AgentSelected;
    this._reportService.GetAgentsList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.agentList = data['List'];
        this.agentSelected = this._currentUser.IdAgentSelected.toString();
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
      }, error => {

      });
      this.playerSelected='-1'
  }

  GetWeekRange() {
    this._reportService
      .GetWeekRange()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._dateRange = data;
       //   this.GetReport();
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

    console.log("getReport");

    var t: RequestPlayerActivity = new RequestPlayerActivity();
    t.IdAgent = this.agentSelected !== '' ? parseInt(this.agentSelected) : this._currentUser.IdAgentSelected;
    t.StartDate = this._dateRange.Start;
    t.EndDate = this._dateRange.End;
    t.IdPlayer = parseInt(this.playerSelected);



    this._reportService.GetAgentPlayerHistory(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        console.log("playerHist", data);
        this.reportData = data;
      },
      error: (err) => {
        this._loadingReport = false;
      },
      complete: () => {
        this._loadingReport = false;
      }

    });

  }//end report method

}
