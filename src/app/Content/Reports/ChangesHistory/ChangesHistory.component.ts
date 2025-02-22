import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { AgentDto, WeekRangeDto, AgentListModel, RequestPlayerListModel,AgentSessionDto, PlayerChangesHistoryRequest } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-ChangesHistory',
  templateUrl: './ChangesHistory.component.html',
  styleUrls: ['./ChangesHistory.component.scss']
})
export class ChangesHistoryComponent implements OnInit {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentSelected: string = '';
  public agentList: any[] = [];
  public playerSelected: string = '-1';
  public playerList: any[] = [];
  public week : any;
  public weekSelected : number =0;
  public weekList: any[] = [];
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
    }); //end dataservice call

      this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
        this.display = data;
      }); //end dataservice call

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
      this.GetWeeks();
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

GetReport(){
  this._loadingReport = true;

  let info: PlayerChangesHistoryRequest = new PlayerChangesHistoryRequest();

  if (this.agentSelected == '' || this.agentSelected == undefined) {
    info.idAgent = this._currentUser.IdAgentSelected
    info.idPlayer = -1
  }
  else {
    info.idAgent = parseInt(this.agentSelected);
    info.idPlayer = parseInt(this.playerSelected);
  }
  this.week = this.weekList[this.weekSelected];
  info.startDate= this.week.MonDate;
  info.endDate = this.week.SunDate;

  this._reportService.GetPlayerChangesHistory(info)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.reportData = data;
     // console.log(data);
      this._loadingReport = false;
    }, error => {this._loadingReport = false;

    });

}


hideFilters(){
  this._DataService.methodShowFilters(false);
  }

}
