import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentSessionDto } from 'src/app/Models/models';
import { GetReportPlayerHistory } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-PlayerHistory',
  templateUrl: './PlayerHistory.component.html',
  styleUrls: ['./PlayerHistory.component.css']
})
export class PlayerHistoryComponent implements OnInit, OnDestroy {


  public _loadingReport: boolean = false;
  public display: boolean = false;
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public SportSelected: string = "NFL";
  public agentList: any[] = [];
  public agentSelected: any;
  public playerHistoryData: any;

  public _idPlayer: string = "";
  public _Player: string = "";

  public _sumTrans: number = 0;

  constructor(
    private route: ActivatedRoute,
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
    this._idPlayer = this.route.snapshot.queryParamMap.get('idplayer') || '';
    this._Player = this.route.snapshot.queryParamMap.get('player') || '';

    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');

        }
      }

      this.GetPlayerHistory();



    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call
  }

  onChangeDateSelection(event: any) {

    localStorage.setItem(
      "agentInfo",
      JSON.stringify(this._currentUser)
    );
    this._DataService.changeDataUserSession(this._currentUser);

    //close siderbar after control change
    this._DataService.methodShowFilters(false);
    this.display = false;
  }

  businessUnitChange() {
    this.GetPlayerHistory();
  }

  hideFilters() {
    this._DataService.methodShowFilters(false);
  }

  OnChangeAgent() {

    if (this.agentSelected != null) {
      this._currentUser.AgentSelected = this.agentSelected._agent;
      this._currentUser.IdAgentSelected = this.agentSelected._idagent;

      localStorage.setItem(
        "agentInfo",
        JSON.stringify(this._currentUser)
      );
      this._DataService.changeDataUserSession(this._currentUser);
    }
  }


  GetPlayerHistory() {
    this._loadingReport = true;

    let t: GetReportPlayerHistory = new GetReportPlayerHistory();

    t.IdPlayer = Number(this._idPlayer);
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    t.EndDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;
    t.Page = 1;
    t.RecPecPage = 100;
    t.HistWeek = 1;

    this._reportService.GetPlayerHistory(this._currentUser, t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.playerHistoryData = data;
        console.log(data);

          this._sumTrans = 0;
        //  this.sumaStraight = 0;
        //  this.sumaTeasers = 0;
        //  this.sumaReverses = 0;

        // this.playerHistoryData.ListBets.forEach((element:any) => {

        //   if(Number(element._text6) > 0)
        //   this._sumTrans += Number(element._text6);
        //   console.log(this._sumTrans);

        // });
        this._loadingReport = false;
      }, error => {
        this._loadingReport = false;
      });
  }

  // GetAgentList() {

  //   let info: AgentListModel = new AgentListModel();

  //   info.idAgent = this._currentUser.Master.IdAgent;
  //   info.agent = this._currentUser.Master.Agent;
  //   this._reportService.GetAgentsList(info)
  //     .pipe(takeUntil(this._unsubscribeAll))
  //     .subscribe(data => {
  //       this.agentList = data.List;
  //       //console.log(this.agentList);
  //     }, error => {

  //     });
  // }

  calculateClasses(value:number): string
  {
    //console.log(value);

    if(Number(value) > 0)
        return "NumPositive";
    else if(Number(value) < 0)
      return "NumNegative";
    else
      return "NumZero";
  }



}//end component
