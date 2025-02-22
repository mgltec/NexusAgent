import { Component, OnDestroy, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentDto, WeekRangeDto, AgentListModel, RequestPlayerListModel, CustomerPerformanceRequest, AgentSessionDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-AgentCustomerPerformance',
  templateUrl: './AgentCustomerPerformance.component.html',
  styleUrls: ['./AgentCustomerPerformance.component.scss']
})
export class AgentCustomerPerformanceComponent implements OnInit, OnDestroy {
  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentSelected: string = '';
  public agentList: any[] = [];
  public playerSelected: string = '0';
  public playerList: any[] = [];
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public groupbySelected: string = '1';
  public businessUnit: boolean = false;
  public reportData: any[] = [];
  public _loadingReport: boolean = false;


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
      this.GetAgentList();
      this.GetWeekRange();

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
    this._loadingReport = true;

    let info: CustomerPerformanceRequest = new CustomerPerformanceRequest();

    if (this.agentSelected == '' || this.agentSelected == undefined) {
      info.prmidAgent = this._currentUser.IdAgentSelected
      info.prmidPlayer = '0'
    }
    else {
      info.prmidAgent = parseInt(this.agentSelected);
      info.prmidPlayer = this.playerSelected
    }
    info.prminitDate = this._dateRange.Start;
    info.prmendDate = this._dateRange.End;
    info.prmgroup = this.groupbySelected;



    this._reportService.GetCustomerPerfromance(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.reportData = data;
        this._loadingReport = false;
      }, error => {this._loadingReport = false;

      });
  }

  hideFilters()
  {
    this._DataService.methodShowFilters(false);
  }

}
