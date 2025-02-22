import { formatDate } from '@angular/common';
import { Component,ElementRef,OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestPlayerActivity } from 'src/app/Models/RpModels';
import {WeekRangeDto,
        AgentSessionDto,
        AgentPlayersManagement,
        PlayersManagementDto,
        AgentListModel,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';


@Component({
  selector: 'app-AgentPlayersManagement',
  templateUrl: './AgentPlayersManagement.component.html',
  styleUrls: ['./AgentPlayersManagement.component.css']
})
export class AgentPlayersManagementComponent implements OnInit {
  @ViewChild('contentTrans') contentTrans!: ElementRef;

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportData: AgentPlayersManagement[] = [];
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;
  public displayModal: boolean = false;
  public displayFinantialTrans: boolean = false;
  public agentList: any[] = [];

  public _idPlayer: string = "";
  public _Player: string = "";

  public _CurrencySelected : string= '1';

  public columns: IResponsiveTableColumn[] = [
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
      key: "CreditLimit",
      title: "Credit Limit",
      ...NUMERIC_COLUMN
    },
    {
      key: "OnlineMaxWager",
      title: "Online Max Wager",
      ...NUMERIC_COLUMN
    },
    {
      key: "OnlineMinWager",
      title: "Online Min Wager",
      ...NUMERIC_COLUMN
    },
    {
      key: "MaxWager",
      title: "Max Wager",
      ...NUMERIC_COLUMN
    },
    {
      key: "MinWager",
      title: "Min Wager",
      ...NUMERIC_COLUMN
    },
    {
      key: "Enable",
      title: "Min Wager",
      template: (item) => {
        if (item.Status == 'D') return `<i class="fa fa-times-circle fa-listing red"></i>`
        return `<i class="fa fa-check-circle fa-listing green"></i>`
      }
    },
    {
      key: "LastWager",
      title: "Last Wager",
      ...NUMERIC_COLUMN
    },
    {
      key: "SettledFigure",
      title: "Settle Figure",
      ...NUMERIC_COLUMN
    },
    {
      key: "SettledFigure",
      title: "Settle Figure",
    },
    {
      title: "",
      template: (item) => `
        <button type="button" onclick="${() => this.showEditModalDialog(item)}" class="btn btn-outline-secondary"><i class="fas fa-edit"></i></button>
        <button type="button" onclick="${() => this.OpenFinantialModal(this.contentTrans, item)}" class="btn btn-outline-secondary"><i class="fas fa-credit-card"></i></button>
      `,
    }
  ]

  dtOptions: any = {};

  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
    private modalService: NgbModal
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
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Gross Week'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Gross Week'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Gross Week',filename: 'Agent Gross Week '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
     // this.GetWeekRange();
      this.GetAgentList();
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



    var t: RequestPlayerActivity = new RequestPlayerActivity();
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    t.EndDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;

    var idagent: number = 0;

    if (this.agentSelected == '') {
      idagent = this._currentUser.IdAgentSelected;
    }
    else {
      idagent = parseInt(this.agentSelected);
    }



    this._reportService.GetAgentPlayerManagement(this._currentUser, idagent).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
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



  showEditModalDialog(playerInfo: PlayersManagementDto) {
    this.displayModal = true;
this._idPlayer = playerInfo.IdPlayer.toString();
this._Player = playerInfo.Player;
  }

  closeEditPlayer() {
    this.displayModal = false;
    this.GetReport();
  }

  OpenFinantialModal(content: any, playerInfo: PlayersManagementDto) {
    // this.playerSelected = null;
    // this.AgentSelected = null;
    // this._stepTrans = 1;
    this._idPlayer = playerInfo.IdPlayer.toString();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


}//end component