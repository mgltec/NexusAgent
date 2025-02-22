import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentListModel, AgentSessionDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-AgentExposure',
  templateUrl: './AgentExposure.component.html',
  styleUrls: ['./AgentExposure.component.scss']
})
export class AgentExposureComponent implements OnInit, OnDestroy {

  public _loadingReport: boolean = false;
  public display: boolean = false;
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public SportSelected: string = "NFL";
  public agentList: any[] = [];
  public agentSelected: any;
  public agentExposureReport: any;
  public sumaParlays: number = 0;
  public sumaStraight: number = 0;
  public sumaTeasers: number = 0;
  public sumaReverses: number = 0;
  public isDesktop: boolean = false;

  constructor(
    private router: Router,
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
    private modalService: NgbModal
  ) {

    this._unsubscribeAll = new Subject();
  }

  get dtOptions() {
    return {
      responsive: true,
      paging: false,
      ordering: false,
      dom: 'Bfrtip',
      buttons: [
        {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Exposure'} ,
        {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Exposure'} ,
        {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Exposure',filename: 'Agent Exposure '+ this._currentUser.AgentSelected } ,
        {extend: 'pdf'},
        {extend: 'pdfHtml5'},
      ],
      columnDefs: [
        { targets: 0, responsivePriority: 1, className: "all" },
        { targets: 1, responsivePriority: 2, className: "all" },
        { targets: 2, className: this.isDesktop ? "all" : "none" },
        { targets: 3, className: this.isDesktop ? "all" : "none" },
        { targets: 4, className: this.isDesktop ? "all" : "none" },
        { targets: 5, className: this.isDesktop ? "all" : "none" }
      ]
    };
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.isDesktop = window.matchMedia('(min-width: 824px)').matches;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  ngOnInit() {
    this.isDesktop = window.matchMedia('(min-width: 824px)').matches;
    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');

        }
      }
      /****************************DATATABLE OPTIONS*************************************** */
/*************************END DATATABLE OPTIONS*************************************** */

      this.GetAgentList();
      this.GetAgentExposureData();



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
    this.GetAgentExposureData();
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


  GetAgentExposureData() {
    this._loadingReport = true;

    this._reportService.GetAgentExposure(this._currentUser, this.SportSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        // this.agentExposureReport = {
        //   "ListExposure": [
        //     {
        //       "_VisitorNumber": "001",
        //       "_HomeNumber": "002",
        //       "_VisitorTeam": "Team A",
        //       "_HomeTeam": "Team B",
        //       "_StraightbetVSpread": -3,
        //       "_StraightbetVTotal": 200,
        //       "_StraightbetVMoney": 100,
        //       "_StraightbetHSpread": 3,
        //       "_StraightbetHTotal": 220,
        //       "_StraightbetHMoney": 110,
        //       "_ParlayVSpread": -2,
        //       "_ParlayVTotal": 210,
        //       "_ParlayVMoney": 105,
        //       "_ParlayHSpread": 2,
        //       "_ParlayHTotal": 230,
        //       "_ParlayHMoney": 115,
        //       "_TeaserVSpread": -1,
        //       "_TeaserVTotal": 220,
        //       "_TeaserVMoney": 110,
        //       "_TeaserHSpread": 1,
        //       "_TeaserHTotal": 240,
        //       "_TeaserHMoney": 120,
        //       "_ReversesVSpread": 0,
        //       "_ReversesVTotal": 230,
        //       "_ReversesVMoney": 115,
        //       "_ReversesHSpread": 0,
        //       "_ReversesHTotal": 250,
        //       "_ReversesHMoney": 125
        //     },
        //     {
        //       "_VisitorNumber": "001",
        //       "_HomeNumber": "002",
        //       "_VisitorTeam": "Team A",
        //       "_HomeTeam": "Team B",
        //       "_StraightbetVSpread": -3,
        //       "_StraightbetVTotal": 200,
        //       "_StraightbetVMoney": 100,
        //       "_StraightbetHSpread": 3,
        //       "_StraightbetHTotal": 220,
        //       "_StraightbetHMoney": 110,
        //       "_ParlayVSpread": -2,
        //       "_ParlayVTotal": 210,
        //       "_ParlayVMoney": 105,
        //       "_ParlayHSpread": 2,
        //       "_ParlayHTotal": 230,
        //       "_ParlayHMoney": 115,
        //       "_TeaserVSpread": -1,
        //       "_TeaserVTotal": 220,
        //       "_TeaserVMoney": 110,
        //       "_TeaserHSpread": 1,
        //       "_TeaserHTotal": 240,
        //       "_TeaserHMoney": 120,
        //       "_ReversesVSpread": 0,
        //       "_ReversesVTotal": 230,
        //       "_ReversesVMoney": 115,
        //       "_ReversesHSpread": 0,
        //       "_ReversesHTotal": 250,
        //       "_ReversesHMoney": 125
        //     },
        //     {
        //       "_VisitorNumber": "001",
        //       "_HomeNumber": "002",
        //       "_VisitorTeam": "Team A",
        //       "_HomeTeam": "Team B",
        //       "_StraightbetVSpread": -3,
        //       "_StraightbetVTotal": 200,
        //       "_StraightbetVMoney": 100,
        //       "_StraightbetHSpread": 3,
        //       "_StraightbetHTotal": 220,
        //       "_StraightbetHMoney": 110,
        //       "_ParlayVSpread": -2,
        //       "_ParlayVTotal": 210,
        //       "_ParlayVMoney": 105,
        //       "_ParlayHSpread": 2,
        //       "_ParlayHTotal": 230,
        //       "_ParlayHMoney": 115,
        //       "_TeaserVSpread": -1,
        //       "_TeaserVTotal": 220,
        //       "_TeaserVMoney": 110,
        //       "_TeaserHSpread": 1,
        //       "_TeaserHTotal": 240,
        //       "_TeaserHMoney": 120,
        //       "_ReversesVSpread": 0,
        //       "_ReversesVTotal": 230,
        //       "_ReversesVMoney": 115,
        //       "_ReversesHSpread": 0,
        //       "_ReversesHTotal": 250,
        //       "_ReversesHMoney": 125
        //     },
        //     {
        //       "_VisitorNumber": "001",
        //       "_HomeNumber": "002",
        //       "_VisitorTeam": "Team A",
        //       "_HomeTeam": "Team B",
        //       "_StraightbetVSpread": -3,
        //       "_StraightbetVTotal": 200,
        //       "_StraightbetVMoney": 100,
        //       "_StraightbetHSpread": 3,
        //       "_StraightbetHTotal": 220,
        //       "_StraightbetHMoney": 110,
        //       "_ParlayVSpread": -2,
        //       "_ParlayVTotal": 210,
        //       "_ParlayVMoney": 105,
        //       "_ParlayHSpread": 2,
        //       "_ParlayHTotal": 230,
        //       "_ParlayHMoney": 115,
        //       "_TeaserVSpread": -1,
        //       "_TeaserVTotal": 220,
        //       "_TeaserVMoney": 110,
        //       "_TeaserHSpread": 1,
        //       "_TeaserHTotal": 240,
        //       "_TeaserHMoney": 120,
        //       "_ReversesVSpread": 0,
        //       "_ReversesVTotal": 230,
        //       "_ReversesVMoney": 115,
        //       "_ReversesHSpread": 0,
        //       "_ReversesHTotal": 250,
        //       "_ReversesHMoney": 125
        //     },
        //     // Repeat the above object 4 more times with different values
        //     // ...
        //   ],
        //   "sumaStraight": 2200,
        //   "sumaParlays": 2300,
        //   "sumaTeasers": 2400,
        //   "sumaReverses": 2500
        // };

        this.agentExposureReport = data;

        console.log(data);

         this.sumaParlays = 0;
         this.sumaStraight = 0;
         this.sumaTeasers = 0;
         this.sumaReverses = 0;

        this.agentExposureReport.ListExposure.forEach((element:any) => {
          this.sumaParlays += Number(element._ParlayVSpread) + Number(element._ParlayVTotal) + Number(element._ParlayVMoney) + Number(element._ParlayHSpread) + Number(element._ParlayHTotal) + Number(element._ParlayHMoney);
          this.sumaStraight += Number(element._StraightbetVSpread) + Number(element._StraightbetVTotal) + Number(element._StraightbetVMoney) + Number(element._StraightbetHSpread) + Number(element._StraightbetHTotal) + Number(element._StraightbetHMoney);
          this.sumaTeasers += Number(element._TeaserVSpread) + Number(element._TeaserVTotal) + Number(element._TeaserVMoney) + Number(element._TeaserHSpread) + Number(element._TeaserHTotal) + Number(element._TeaserHMoney);
          this.sumaReverses += Number(element._ReversesVSpread) + Number(element._ReversesVTotal) + Number(element._ReversesVMoney) + Number(element._ReversesHSpread) + Number(element._ReversesHTotal) + Number(element._ReversesHMoney);

        });
        this._loadingReport = false;
      }, error => {
        this._loadingReport = false;
      });
  }

  GetAgentList() {

    let info: AgentListModel = new AgentListModel();

    info.idAgent = this._currentUser.Master.IdAgent;
    info.agent = this._currentUser.Master.Agent;
    this._reportService.GetAgentsList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.agentList = data.List;
        //console.log(this.agentList);
      }, error => {

      });
  }

  calculateClasses(value: number): string {
    //console.log(value);

    if (Number(value) > 0)
      return "hasvalue";
    else
    return "";
  }


}//end component
