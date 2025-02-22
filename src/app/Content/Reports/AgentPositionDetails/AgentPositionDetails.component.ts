import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { AgentSessionDto, RequestAgentPositionDetail } from 'src/app/Models/models';
import { AgentPositionDetailsDto } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-AgentPositionDetails',
  templateUrl: './AgentPositionDetails.component.html',
  styleUrls: ['./AgentPositionDetails.component.css']
})
export class AgentPositionDetailsComponent implements OnInit, OnDestroy {

  public _idGame: string = "";
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public display: boolean = false;
  public _loadingReport: boolean = false;
  public totalWager: number = 0;
  public totalWin: number = 0;
  public totalRisk: number = 0;
  public posDetailsObj: AgentPositionDetailsDto = new AgentPositionDetailsDto();

  constructor(private route: ActivatedRoute,
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService) {

    this._unsubscribeAll = new Subject();
   }


  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }


  ngOnInit() {

    this._idGame = this.route.snapshot.queryParamMap.get('idagame') || '{}';

    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
        }
      }
      this.GetAgentPositionDetail();
      // this.GetAgentList();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call


  }//end enOnInit


  GetAgentPositionDetail() {

    this._loadingReport = true;

    let t: RequestAgentPositionDetail = new RequestAgentPositionDetail();

    t.EndDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;//this._ResultAgentPosition.StartDate;
    t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;//this._ResultAgentPosition.EndDate;
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.IdGame = Number(this._idGame);
    t.IdCurrency = 0;

    this.totalWager = 0;
    this.totalWin = 0;
    this.totalRisk = 0;

    this._reportService
      .GetAgentPositionDetails(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.posDetailsObj = data;
          //this.dtTrigger.next();
          //this._displayPositionDetailData = true;
         // console.log(this.posDetailsObj);
          this.posDetailsObj.ListDetail.forEach(e => {
            this.totalWager += Number(e._wageramount);
            this.totalWin += Number(e._winamount);
            this.totalRisk += Number(e._riskamount);
          });
           this._loadingReport = false;
      
        },
        (error) => { this._loadingReport = false; }
      );
  } //end submit form




}//end component
