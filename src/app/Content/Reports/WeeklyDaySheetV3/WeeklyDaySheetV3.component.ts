import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentDataDto, AgentDaySheetNewAgentDto, AgentListModel, AgentSessionDto, DaySheetForNewAgentRequestDto, GetPlayerHistoryRequesDto, PlayerHistoryByDayDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import 'datatables.net';


@Component({
  selector: 'app-WeeklyDaySheetV3',
  templateUrl: './WeeklyDaySheetV3.component.html',
  animations: [
    trigger(
      'myAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', 'opacity': 1 }),
        animate('200ms', style({ transform: 'translateY(100%)', opacity: 0 }))
      ]),
    ]
    )
  ],
  styleUrls: ['./WeeklyDaySheetV3.component.scss']
})
export class WeeklyDaySheetV3Component implements OnInit, OnDestroy {


  @ViewChild('dt1') dt1!: Table;

  public display: boolean = false
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentList: any[] = [];
  public _loadingReport: boolean = false;
  public _dataReportWeeklyBalance: AgentDaySheetNewAgentDto = new AgentDaySheetNewAgentDto();
  public _historyData: PlayerHistoryByDayDto[] = [];
  public displayModal: boolean = false;
  public IdPlayerSelected: string = "";
  public OpenBets : any;


  public agentSelected: any;
  public businessUnitSelected: string = "-1";

  dtTrigger: Subject<any> = new Subject();
  public dtOptions: any = {};
  public closeResult: string = "";

  public fechaAyer: Date = new Date();
  public fechahoy: Date = new Date();
  public _dateFromSelected!: string;
  public _dateEndSelected!: string;


  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
    private modalService: NgbModal
  ) {

    this._unsubscribeAll = new Subject();

    this.fechaAyer.setDate(this.fechaAyer.getDate() - 1);

    var year = this.fechaAyer.getFullYear();
    var month = this.fechaAyer.getMonth() + 1;
    var day = this.fechaAyer.getDate();
    this._dateFromSelected = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;


    var yearH = this.fechahoy.getFullYear();
    var monthH = this.fechahoy.getMonth() + 1;
    var dayH = this.fechahoy.getDate();
    this._dateEndSelected = `${yearH}-${monthH < 10 ? '0' + monthH : monthH}-${dayH < 10 ? '0' + dayH : dayH}`;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {

    //localStorage.removeItem("AgentWeeklyPool");

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      //processing: true
    };

    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
        }
      }
      this.GetAgentWeekly();
      this.GetAgentList();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call

  }//end OnInit

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

  GetAgentWeekly() {

    this._loadingReport = true;

    let t: DaySheetForNewAgentRequestDto = new DaySheetForNewAgentRequestDto();
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.WeekDate = this._dateFromSelected;
    t.ActionType = "A"; //Number(this.businessUnitSelected);
    t.ReportOrderBy = "Player";

    let agentPool: AgentDataDto[] = [];

    let agentDaDto: AgentDataDto = new AgentDataDto();

    agentDaDto.Agent = this._currentUser.AgentSelected;
    agentDaDto.IdAgent = this._currentUser.IdAgentSelected;

    agentPool.push(agentDaDto);

    localStorage.setItem(
      "AgentWeeklyPool",
      JSON.stringify(agentPool)
    );

    this._reportService
      .GetNewWeeklyBasedDaySheet(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._dataReportWeeklyBalance = data;
          this._loadingReport = false;
        },
        (error) => { this._loadingReport = false; }
      );
  } //end submit form

  GetPlayerOpenBets(idPlayer: number, content: any) {

    //this._loadingReport = true;

    this._reportService
      .GetplayerOpenBets(idPlayer)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.OpenBets = data;

          this._historyData = data;
          //console.log(this._historyData);

          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "my-class" }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });


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

  businessUnitChange() {
    this.GetAgentWeekly();
  }

  clear(table: Table) {
    table.clear();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt1.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  activeState: boolean[] = [true, false, false];

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  GetLineHeight(node: AgentDaySheetNewAgentDto, isParent?: boolean) {
    return `${this.GetTotalUsers(node, isParent, true) * 100}%`
  }

  GetTotalUsers(node: AgentDaySheetNewAgentDto, isParent?: boolean, outerLevel?: boolean) {
    let total = 0
    if (node.Opened || isParent) {
      const agentsFinalIndex = node?.Agents?.length - 1;
      node?.Agents?.forEach((agent, index) => {
        if (outerLevel && agentsFinalIndex === index) {
          total += 1;
        } else {
          total += 1 + this.GetTotalUsers(agent);
        }
      })

      const playersFinalIndex = node?.Agents?.length - 1;
      node?.Players?.forEach((player, index) => {
        if (outerLevel && playersFinalIndex === index) {
          total += 1;
        } else {
          total += 1 + this.GetTotalUsers(player)
        }
      })
    }
    return total
  }

  ShowInfo(IdAgent: number, show: boolean) {

    let nod = this.findNodeMGL(IdAgent, this._dataReportWeeklyBalance, show);

  }

  findNodeMGL(id: any, currentNode: AgentDaySheetNewAgentDto, show: boolean, parentNode?: AgentDaySheetNewAgentDto): any {
    var i,
      currentChild,
      result;

    if (id == currentNode.Parent) {

      if (show == false) {
          if (parentNode) {
            parentNode.Opened = false
          }

          currentNode.Show = show;

          if (currentNode.Players != null) {
            currentNode.Players.forEach(Player => {
              this.findNodeMGL(currentNode.Id, Player, show, currentNode);
            });
          }
          if (currentNode.Agents != null) {
            currentNode.Agents.forEach(Agent => {
              this.findNodeMGL(currentNode.Id, Agent, show, currentNode);
            });
          }
       }
        else
        {
          if (parentNode) {
            parentNode.Opened = true
          }
          currentNode.Show = true;
        }
      
    } else {

      // Use a for loop instead of forEach to avoid nested functions
      // Otherwise "return" will not work properly

      if (currentNode.Players != null) {
        for (i = 0; i < currentNode.Players.length; i += 1) {
          currentChild = currentNode.Players[i];

          // Search in the current child
          result = this.findNodeMGL(id, currentChild, show, currentNode);
        }
      }
      if (currentNode.Agents != null) {
        for (i = 0; i < currentNode.Agents.length; i += 1) {
          currentChild = currentNode.Agents[i];

          // Search in the current child
          result = this.findNodeMGL(id, currentChild, show, currentNode);

          // Return the result if the node has been found
          // if (result !== false) {
          //     return result;
          // }
        }
      }
      // The node has not been found and we have no more options
      return false;
    }
  }

  GetPlayerHistory(IdAgent: number, IdPlayer: number, day: number, content: any) {

    let t: GetPlayerHistoryRequesDto = new GetPlayerHistoryRequesDto();

    t.IdAgent = IdAgent;
    t.WeekDay = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    t.IdPlayer = IdPlayer;
    t.ReportDayNumber = day;

    console.log(t);

    this._reportService
      .GetPlayerHistoryByDay(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {

          this._historyData = data;
          console.log(this._historyData);

          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "my-class" }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });

          // this._loadingReport = false;
        },
        (error) => { }
      );
  } //end submit form

  EditPlayer(idPlayer: any, content: any) {
    console.log(idPlayer);
    this.IdPlayerSelected = idPlayer;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  PlayerTransaction(idPlayer: any, content: any) {
    console.log(idPlayer);
    this.IdPlayerSelected = idPlayer;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}//end component
