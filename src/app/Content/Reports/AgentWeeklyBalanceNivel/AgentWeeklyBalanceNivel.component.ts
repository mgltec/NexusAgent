import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentDataDto, AgentListModel, AgentSessionDto } from 'src/app/Models/models';
import { ReportWeeklyBalance, RequestAgentWeeklyBalance } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-AgentWeeklyBalanceNivel',
  templateUrl: './AgentWeeklyBalanceNivel.component.html',
  styleUrls: ['./AgentWeeklyBalanceNivel.component.css']
})
export class AgentWeeklyBalanceNivelComponent implements OnInit {

  public display: boolean = false
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentList: any[] = [];
  public _loadingReport: boolean = false;
  public _dataReportWeeklyBalance: ReportWeeklyBalance = new ReportWeeklyBalance();

  public _TotalPrev: number = 0;
  public _TotalMon: number = 0;
  public _TotalTue: number = 0;
  public _TotalWed: number = 0;
  public _TotalThu: number = 0;
  public _TotalFri: number = 0;
  public _TotalSat: number = 0;
  public _TotalSun: number = 0;
  public _TotalThisWeek: number = 0;
  public _TotaPayM: number = 0;
  public _TotalNewBal: number = 0;
  public _TotalAtRisk: number = 0;
  public _TotalAvail: number = 0;

  public agentSelected: any;
  public businessUnitSelected: string = "-1";

  public _agentQuery: any;
  public _IdagentQuery: any;

  public _agentPool: AgentDataDto[] = [];

  dtTrigger: Subject<any> = new Subject();
  public dtOptions: any = {};


  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
    private route: ActivatedRoute
  ) {

    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {

    this._agentQuery = this.route.snapshot.queryParamMap.get('ag') || '';
    this._IdagentQuery = this.route.snapshot.queryParamMap.get('co') || '';


    this._agentPool = JSON.parse(localStorage.getItem('AgentWeeklyPool') || '{}');

    console.log(this._agentPool);
    

    let agentExits: boolean = false;

    var i = 0;
    this._agentPool.forEach(element => {
      console.log(element);
      if (element.IdAgent == Number(this._IdagentQuery)) {
        agentExits = true;
      }
      else if(agentExits){
        //remove from this poing
        console.log("remove item:");
        console.log(element);
        this._agentPool.splice(i, this._agentPool.length);
        //i--;
      }
      i++;
    });

    if (!agentExits) {

      let agentDaDto: AgentDataDto = new AgentDataDto();

      agentDaDto.Agent = this._agentQuery;
      agentDaDto.IdAgent = Number(this._IdagentQuery);
  
      this._agentPool.push(agentDaDto);
    }

    console.log(this._agentPool);

    localStorage.setItem(
      "AgentWeeklyPool",
      JSON.stringify(this._agentPool)
    );

    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
        }
      }
      this.GetAgentWeekly(this._agentQuery, this._IdagentQuery);
      //this.GetAgentList();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call

  }//end OnInit

  // GetAgentList() {

  //   let info: AgentListModel = new AgentListModel();

  //   info.idAgent = this. //this._currentUser.Master.IdAgent;
  //   info.agent = //this._currentUser.Master.Agent;
  //   this._reportService.GetAgentsList(info)
  //     .pipe(takeUntil(this._unsubscribeAll))
  //     .subscribe(data => {
  //       this.agentList = data.List;
  //       //console.log(this.agentList);
  //     }, error => {

  //     });
  // }

  GetAgentWeekly(agent: string, idagent: any) {
    console.log("click");
    this._loadingReport = true;

    this._TotalPrev = 0;
    this._TotalMon = 0;
    this._TotalTue = 0;
    this._TotalWed = 0;
    this._TotalThu = 0;
    this._TotalFri = 0;
    this._TotalSat = 0;
    this._TotalSun = 0;
    this._TotalThisWeek = 0;
    this._TotalNewBal = 0;
    this._TotalAtRisk = 0;
    this._TotalAvail = 0;

    let t: RequestAgentWeeklyBalance = new RequestAgentWeeklyBalance();

    t.Agent = agent;
    t.IdAgent = Number(idagent);
    t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    t.IsDistributor = "true";
    t.TransactionType = Number(this.businessUnitSelected);
    t.AgentDisplayHistory = true;
    t.IdCurrency = 0;
    //************************************************** */
    let agentDaDto: AgentDataDto = new AgentDataDto();

    agentDaDto.Agent = agent;
    agentDaDto.IdAgent = Number(idagent);

    var i = 0;
    let agentExits: boolean = false;
    this._agentPool.forEach(element => {
      if (element.IdAgent == Number(idagent)) {
        agentExits = true;
      }
      else if(agentExits){
        //remove from this poing
        console.log("remove item:" + element);
        this._agentPool.splice(i, this._agentPool.length);
        //i--;
      }
      i++;
    });

    if(!agentExits)
     this._agentPool.push(agentDaDto);

    localStorage.setItem(
      "AgentWeeklyPool",
      JSON.stringify(this._agentPool)
    );

    /*********************************************** */

    this._reportService
      .GetWeeklyBalanceByAgentLevelZero(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._dataReportWeeklyBalance = data;
          //this.dtTrigger.next();
          console.log(this._dataReportWeeklyBalance);

          this._dataReportWeeklyBalance.AgentList.forEach(agent => {

            this._TotalPrev += Number(agent._BalFwd);
            this._TotalMon += Number(agent._WeekDay1);
            this._TotalTue += Number(agent._WeekDay2);
            this._TotalWed += Number(agent._WeekDay3);
            this._TotalThu += Number(agent._WeekDay4);
            this._TotalFri += Number(agent._WeekDay5);
            this._TotalSat += Number(agent._WeekDay6);
            this._TotalSun += Number(agent._WeekDay7);
            this._TotalThisWeek += Number(agent._ThisWeek);
            this._TotalNewBal += Number(agent._Balance);
            this._TotalAtRisk += Number(agent._TotalAtRisk);
            this._TotalAvail += Number(agent._TotalAvail);
          });


          this._loadingReport = false;
        },
        (error) => { this._loadingReport = false; }
      );
  } //end submit form

  calculateClasses(value: number): string {
    //console.log(value);

    if (Number(value) > 0)
      return "NumPositive";
    else if (Number(value) < 0)
      return "NumNegative";
    else
      return "NumZero";
  }

  hideFilters() {
    this._DataService.methodShowFilters(false);
  }

  onChangeDateSelection(event: any) {

    localStorage.setItem(
      "agentInfo",
      JSON.stringify(this._currentUser)
    );
    this._DataService.changeDataUserSession(this._currentUser);
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

  // businessUnitChange() {
  //   this.GetAgentWeekly();
  // }

  clear(table: Table) {
    table.clear();
  }

}//end component