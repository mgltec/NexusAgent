import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { AgentDto, WeekRangeDto, AgentListModel, RequestPlayerListModel,AgentSessionDto, PlayerLinesRequest } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';


@Component({
  selector: 'app-PlayerLines',
  templateUrl: './PlayerLines.component.html',
  styleUrls: ['./PlayerLines.component.scss']
})
export class PlayerLinesComponent implements OnInit {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentSelected: string = '';
  public agentList: any[] = [];
  public playerSelected: string = '-1';
  public playerList: any[] = [];
  public sportSelected: string = '';
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
    }); //end dataservice call

      this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
        this.display = data;
      }); //end dataservice call
      this.GetAgentList();
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

    info.idAgent = this._currentUser.IdAgentSelected;//parseInt(this.agentSelected);

    this._reportService.GetPlayerList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.playerList = data;
      }, error => {

      });
  }


  GetReport(){
    this._loadingReport = true;
    let info: PlayerLinesRequest = new PlayerLinesRequest();

    info.idPlayer = this.playerSelected;
    info.idSport = this.sportSelected;
    info.idAgent = this.agentSelected;

    this._reportService.GetPlayerLines(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.reportData = data;
        console.log(data);
        this._loadingReport = false;
      }, error => {  this._loadingReport = false;
      });
  }

  hideFilters(){
  this._DataService.methodShowFilters(false);
  }

}
