import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentListModel, RequestPlayerListModel ,AgentWagersRequest,AgentDeleteWagerRequest, AgentLoginDto, AgentSessionDto} from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { transformDate } from 'src/app/Utils/date';


@Component({
  selector: 'app-AgentWagers',
  templateUrl: './AgentWagers.component.html',
  styleUrls: ['./AgentWagers.component.scss']
})
export class AgentWagersComponent implements OnInit, OnDestroy {
  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public login: AgentLoginDto = new AgentLoginDto();
  public agentSelected: string = '';
  public agentList: any[] = [];
  public playerSelected: string = '-1';
  public playerList: any[] = [];
  public weekSelected : number =0;
  public weekList: any[] = [];
  public week : any;
  public sortbySelected: string = '0';
  public businessSelected: string = 'ALL';
  public typeSelected: string = '-1';
  public statusSelected: string = '-1';
  public ShowSummary: boolean = true;
  public reportData: any[] = [];
  public reportDataDetails: any[] = [];
  public TotalRisk: number = 0;
  public TotalWin: number = 0;
  public TotalWonLoss: number = 0;
  public _loadingReport: boolean = false;
  public i : number = 0;

  
  public totalsColumns: IResponsiveTableColumn[] = [
    {
      value: (_) => this.TotalRisk,
      title: "TOTAL RISK",
    },
    {
      value: (_) => this.TotalWin,
      title: "TOTAL WIN",
    },
    {
      value: (_) => this.TotalWonLoss,
      title: "WON / LOSS",
    },
  ]

  public columns: IResponsiveTableColumn[] = [
    {
      title: "AGENT\nPLAYER / PASSWORD",
      frozen: true,
      template: (item) => `
        <div>
          <span>${item.Agent}</span>
          <br>
          <span>${item.Player} / ${item.Password}</span>
        </div>
      `
    },
    {
      value: (item) => `${item.OriginalRiskAmount} / ${item.OriginalWinAMount}`,
      title: "RISK / WIN",
    },
    {
      value: (item) => `${item.Description} (IP: ${item.IP})`,
      title: "DESCRIPTION",
    },
    {
      title: "EVENT DATE / DESCRIPTION",
      cellClasses: "wagers-list",
      template: (item) => `
        <div>
          <ul>
            ${item?.Details?.map((detail: any) => `
              <li>
                <span class="wager-details">
                  ${detail.GameDateTime} - ${detail.IdSport}
                </span> 
                <span class="wager-divider">|</span>
                <span class="wager-description">${detail.CompleteDescription}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `
    },
    {
      key: "PlacedDate",
      title: "DATE",
    },
    {
      key: "TicketNumber",
      title: "TRANSACTION",
    },
    {
      key: "Result",
      title: "RESULT",
    },
    {
      key: "Won_Loss",
      title: "WON / LOSS"
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

    this._DataService.UserSession.subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;

      if (this._currentUser.Master == null || this._currentUser.Master == undefined) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
          this.agentSelected = String(this._currentUser.IdAgentSelected);
        }
      }

      this.GetAgentList();
      this.GetWeeks();
       /****************************DATATABLE OPTIONS*************************************** */
       this.dtOptions = {
        responsive: true,
        paging: false,
        ordering: true,
        dom: 'Bfrtip',
        buttons: [
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Commission'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Commission'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Commission',filename: 'Agent Commission '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice
  }


  GetAgentList() {

    let info: AgentListModel = new AgentListModel();

    info.idAgent = this._currentUser.IdAgentSelected;
    info.agent = this._currentUser.AgentSelected;
    this._reportService.GetAgentsList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.agentList = data['List'];
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

GetWeeks() {
  this._reportService
    .GetWeeks(this._currentUser)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(
      (data) => {
         this.weekList = data;
         this.GetReport();
       },
      (error) => { }
    );
} //end submit form

resetSelect(){
  if(this.businessSelected != "Sports"){
    this.typeSelected= '-1';
    this.statusSelected='-1';
  }
}

GetReport(){
  this._loadingReport = true;
  let info :AgentWagersRequest = new AgentWagersRequest();

  if (this.agentSelected=='')
  {
    info.prmIdAgent = this._currentUser.IdAgentSelected;
  }
  else{
    info.prmIdAgent = parseInt(this.agentSelected);
  }

  info.prmIdPlayer=parseInt(this.playerSelected);
  this.week = this.weekList[this.weekSelected];
  info.prmStartDate= this.week.MonDate;
  info.prmEndDate = this.week.SunDate;

  info.prmSort= parseInt(this.sortbySelected);
  info.prmUnit = this.businessSelected;
  info.prmWagerType= parseInt(this.typeSelected);
  info.prmResult=parseInt(this.statusSelected);

  this._reportService.GetAgentWagers(info)
  .pipe(takeUntil(this._unsubscribeAll))
  .subscribe(data => {
        this.reportData = data;
        this.GetTotals();
        this._loadingReport = false;
      }, error => { this._loadingReport = false;
  });
}

GetTotals(){
   this.TotalRisk = 0;
   this.TotalWin  = 0;
   this.TotalWonLoss = 0;
  this.reportData.forEach(element => {
      this.TotalRisk = this.TotalRisk + parseInt(this.reportData[this.i].OriginalRiskAmount);
      this.TotalWin = this.TotalWin + parseInt(this.reportData[this.i].OriginalWinAMount);
      this.TotalWonLoss = this.TotalWonLoss + parseInt(this.reportData[this.i].Won_Loss);
      this.i= this.i + 1;
  });
  this.i=0;
}

hideFilters(){
  this._DataService.methodShowFilters(false);
}



}


