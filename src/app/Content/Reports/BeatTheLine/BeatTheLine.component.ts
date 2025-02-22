import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeekRangeDto, AgentListModel,AgentSessionDto, RequestPlayerListModel, GetBeatTheLineRequestDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-BeatTheLine',
  templateUrl: './BeatTheLine.component.html',
  styleUrls: ['./BeatTheLine.component.css']
})
export class BeatTheLineComponent implements OnInit {

  public _loadingReport: boolean = false;
  public display: boolean = false;
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentList: any[] = [];
  public playerList: any[] = [];
  public AgentSelected: any;
  public reportData: any;
  public playerSelected: any;

  public _idAgent: string = "";

  dtOptions: any = {};

  constructor(
    private route: ActivatedRoute,
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService
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
    }); //end dataservice call
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

  GetAgentList() {
    let info: AgentListModel = new AgentListModel();

    info.idAgent = this._currentUser.IdAgentSelected;
    info.agent = this._currentUser.AgentSelected;
    this._reportService.GetAgentsList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.agentList = data['List'];
        this.GetPlayerList();
      }, error => {
      });
  }

  GetPlayerList() {
    let info: RequestPlayerListModel = new RequestPlayerListModel();

    if (this.AgentSelected == '' || this.AgentSelected == undefined) {
      info.idAgent = this._currentUser.IdAgentSelected;
    }
    else {
      info.idAgent = parseInt(this.AgentSelected._idagent);
    }

    this._reportService.GetPlayerList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.playerList = data;
        console.log(this.playerList);
      }, error => {
      });
  }

  GetReport(){
    this._loadingReport = true;

    console.log("AgentSelected====>", this.AgentSelected)
    let t: GetBeatTheLineRequestDto = new GetBeatTheLineRequestDto();

    t.IdAgent = (this.AgentSelected == null || this.AgentSelected == undefined) ? this._currentUser.IdAgentSelected : this.AgentSelected._idagent;
    t.IdPlayer = (this.playerSelected == null || this.playerSelected == undefined) ? -1 : this.playerSelected.IdPlayer;
    t.DateFrom = this._dateRange.Start;
    t.DateTo = this._dateRange.End;


    this._reportService.GetBeatTheLine(this._currentUser, t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.reportData = data;
        this._loadingReport = false;
        console.log("DATA====>", this.reportData)
      }, error => {
        this._loadingReport = false;
      });
  }

}
