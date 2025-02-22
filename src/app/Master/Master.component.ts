import { DatePipe } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AdjustmentHistoryComponent } from "../Content/Reports/AdjustmentHistory/AdjustmentHistory.component";
import { AgentCustomerPerformanceComponent } from "../Content/Reports/AgentCustomerPerformance/AgentCustomerPerformance.component";
import { AgentDistributionComponent } from "../Content/Reports/AgentDistribution/AgentDistribution.component";
import { AgentPositionComponent } from "../Content/Reports/AgentPosition/AgentPosition.component";
import { AgentWagersComponent } from "../Content/Reports/AgentWagers/AgentWagers.component";
import { AgentWagersTickerComponent } from "../Content/Reports/AgentWagersTicker/AgentWagersTicker.component";
import { ChangesHistoryComponent } from "../Content/Reports/ChangesHistory/ChangesHistory.component";
import { LoginHistoryComponent } from "../Content/Reports/LoginHistory/LoginHistory.component";
import { PlayerLinesComponent } from "../Content/Reports/PlayerLines/PlayerLines.component";
import { ScoresHistoryComponent } from "../Content/Reports/ScoresHistory/ScoresHistory.component";
import {
  AgentListModel,
  AgentRightDTO,
  AgentSessionDto,
  Node,
  RequestPlayerListModel,
} from "../Models/models";
import { DataService } from "../Services/data.service";
import { ReportsService } from "../Services/reports.service";

@Component({
  selector: "app-Master",
  templateUrl: "./Master.component.html",
  styleUrls: ["./Master.component.scss"],
  providers: [
    AgentPositionComponent,
    AgentDistributionComponent,
    AgentCustomerPerformanceComponent,
    AgentWagersComponent,
    AgentWagersTickerComponent,
    PlayerLinesComponent,
    ScoresHistoryComponent,
    LoginHistoryComponent,
    ChangesHistoryComponent,
    AdjustmentHistoryComponent,
    DatePipe,
  ],
})
export class MasterComponent implements OnInit, OnDestroy {
  @ViewChild("content") content!: ElementRef;

  public display: boolean = false;
  public agentTreeData: any;
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _loadingTree: boolean = false;
  public playerSelected: any;
  public AgentSelected: any;
  public _stepTrans: number = 1;
  public closeResult: string = "";
  public isDesktop: boolean = false;
  public menuOpened: boolean = false;
  public dragStartPosition: number = 0;
  public dragEndPosition: number = 0;
  public agentRights: AgentRightDTO[] = [];

  public agentList: any[] = [];
  public playerList: any[] = [];

  public loadingPlayerList: boolean = false;
  public _loadingAgentList: boolean = false;
  public _isPhone: boolean = false;

  rootNode!: Node;

  public selectedAgent: any;
  public searchAgentText: string = "";
  public weekList: any[] = [];

  constructor(
    public _reportService: ReportsService,
    public _DataService: DataService,
    private router: Router,
    public messageService: MessageService,
    private modalService: NgbModal,
    private renderer: Renderer2
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  touchStart(event: TouchEvent) {
    this.dragStartPosition = event?.touches?.[0].clientX;
    this.dragEndPosition = event?.touches?.[0].clientX;
  }

  touchMove(event: TouchEvent) {
    this.dragEndPosition = event?.touches?.[0].clientX;
    if (!this.menuOpened) {
      // Simulate open menu gesture
      const deltaX = this.dragEndPosition - this.dragStartPosition;
      if (this.dragStartPosition > 0 && this.dragStartPosition < 50) {
        if (deltaX > 0 && deltaX < 50) {
          this.content.nativeElement.style.transform = `translateX(${deltaX}px)`;
        }
      }
    } else {
      // Simulate rubber band
      const deltaX = this.dragStartPosition - this.dragEndPosition;
      if (deltaX > 0 && deltaX < 50) {
        this.content.nativeElement.style.transform = `translateX(calc(90vw - ${deltaX}px))`;
      }
    }
  }

  gotoPlayerDetails() {
    if (this.playerSelected != null) {
      this.modalService.dismissAll();
      let param = this.playerSelected.Player.split("-");
      let play: string = "";

      if (param.length > 1) play = param[1].trim();
      else play = this.playerSelected.Player;
      this.router.navigate(["mainbk/playerdetails"], {
        queryParams: { player: play, idplayer: this.playerSelected.IdPlayer },
      });
    }
  }

  touchEnd() {
    const draggableElement = this.content.nativeElement;
    draggableElement.style.transform = "";

    if (!this.menuOpened) {
      const difference = this.dragEndPosition - this.dragStartPosition;
      if (difference > 50 && this.dragStartPosition <= 50) {
        this.openMenu();
      }
    } else {
      const difference = this.dragStartPosition - this.dragEndPosition;
      if (difference > 50) {
        this.closeMenu();
      }
    }
  }

  openMenu() {
    this.renderer.addClass(document.body, "modal-opened");
    document.documentElement.style.setProperty("--body-overflow", "hidden");
    this._DataService.changeMenuOpened(true);
  }

  closeMenu() {
    this.renderer.removeClass(document.body, "modal-opened");
    document.documentElement.style.setProperty("--body-overflow", "initial");
    this._DataService.changeMenuOpened(false);
  }

  @HostListener("window:resize")
  onWindowResize() {
    this.isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  }

  ngOnInit() {
    this.isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    this._DataService.MenuOpened.subscribe((opened) => {
      this.menuOpened = opened;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });

    this._DataService.UserSession.subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;

      this._DataService.AgentRights.subscribe((rights) => {
        this.agentRights = rights;
      });

      if (
        this._currentUser.Master == null ||
        this._currentUser.IdAgentSelected == 0
      ) {
        if (localStorage.getItem("agentInfo") != null) {
          this._currentUser = JSON.parse(
            localStorage.getItem("agentInfo") || "{}"
          );
        }
      }
    }); //end dataservice call

    // this.GetAgentTree();
    this.GetAgentTree(this._currentUser.Master.IdAgent);
    this.GetAgentList();
    this.checkDomainAndSetFlag();
    //  this.GetWeeks();
  }

  showFiltersChildsComponents() {
    this._DataService.methodShowFilters(true);
  }

  checkDomainAndSetFlag() {
    const url = window.location.href;
    if (url.includes("wagermvp.com")) {
      this._isPhone = true;
    }
  }

  open(content: any) {
    this.playerSelected = null;
    this.AgentSelected = null;
    this._stepTrans = 1;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  GetWeeks() {
    this._reportService
      .GetWeeks(this._currentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          // console.log(data);
          this.weekList = data;
          this._currentUser.WeekList = data;
          this._currentUser.RangeDateSelected = 0;

          localStorage.setItem("agentInfo", JSON.stringify(this._currentUser));
          this._DataService.changeDataUserSession(this._currentUser);
        },
        (error) => {}
      );
  }

  OpenDivPlayerTransaction() {
    if (this.playerSelected != null) this._stepTrans = 2;
    else {
      this.showMessage("error", "Player error", "Please select a player");
    }
  }

  OpenAddPlayerForm() {
    this._stepTrans = 2;
  }

  OpenAddSubAgentForm() {
    this._stepTrans = 2;
  }

  OpenAgentTransForm() {
    this._stepTrans = 2;
  }

  GetPlayerList() {
    this.loadingPlayerList = true;
    let info: RequestPlayerListModel = new RequestPlayerListModel();

    info.idAgent = this.AgentSelected._idagent; //this._currentUser.IdAgentSelected;//parseInt(this.agentSelected);

    this._reportService
      .GetPlayerList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.playerList = data;
          // console.log(this.playerList);
          this.loadingPlayerList = false;
        },
        (error) => {
          this.loadingPlayerList = false;
        }
      );
  }

  GetAgentList() {
    this._loadingAgentList = true;
    let info: AgentListModel = new AgentListModel();

    info.idAgent = this._currentUser.IdAgentSelected;
    info.agent = this._currentUser.AgentSelected;
    this._reportService
      .GetAgentsList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.agentList = data["List"];
          this._loadingAgentList = false;
        },
        (error) => {
          this._loadingAgentList = false;
        }
      );
  }

  GetAgentTree(IdAgent: number) {
    this._loadingTree = true;

    // let agentIn: RequestAgentTreeDto = new RequestAgentTreeDto();

    // agentIn.Agent = this._currentUser.AgentSelected;
    // agentIn.IdAgent = this._currentUser.IdAgentSelected;

    this._reportService
      .GetAgentTree(IdAgent)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          console.log("AgentTree:", data);

          this.rootNode = data;

          this._loadingTree = false;
        },
        (error) => {
          this._loadingTree = false;
        }
      );
  }

  onCheckboxChange(val: any) {
    console.log("node:", val);

    if (val.AgentExcluded == 1) {
      this._reportService
        .InsertAgentExclusion(val.IdAgent)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
          (data) => {},
          (error) => {
            this._loadingTree = false;
          }
        );
    } else if (val.AgentExcluded == 0) {
      this._reportService
        .DeleteAgentExclusion(val.IdAgent)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
          (data) => {},
          (error) => {
            this._loadingTree = false;
          }
        );
    }
  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }

  toggleNode(node: Node) {
    node.expanded = !node.expanded;
  }

  nodeSelect(nodeSel: Node) {
    console.log("nodeSelect Event: ", nodeSel);

    this._currentUser.AgentSelected = nodeSel.Agent;
    this._currentUser.IdAgentSelected = nodeSel.IdAgent;

    localStorage.setItem("agentInfo", JSON.stringify(this._currentUser));
    this._DataService.changeDataUserSession(this._currentUser);

    //close siderbar after control change
    this._DataService.methodShowFilters(false);
    this.display = false;
  }

  // searchAgent() {
  //   if (this.searchAgentText != "") {
  //     this.tempAgentTreeData = this.agentTreeData;
  //     let nod: any[] = [];
  //     let res: any = this.filterRecursive(this.tempAgentTreeData[0]);
  //     nod.push(res);
  //     this.tempAgentTreeData = nod;
  //     // console.log(this.tempAgentTreeData);
  //   } else {
  //     this.tempAgentTreeData = this.agentTreeData;
  //   }
  // }

  filterRecursive(currentNode: any): any {
    //if ("XJHEAD2" == currentNode.agent) {
    var i, currentChild, result;

    if (this.searchAgentText.toUpperCase() == currentNode.agent) {
      return currentNode;
    } else {
      // Use a for loop instead of forEach to avoid nested functions
      // Otherwise "return" will not work properly

      if (currentNode.children != null) {
        for (i = 0; i < currentNode.children.length; i += 1) {
          currentChild = currentNode.children[i];

          // Search in the current child
          result = this.filterRecursive(currentChild);

          // Return the result if the node has been found
          if (result !== false) {
            return result;
          }
        }

        // The node has not been found and we have no more options
        return false;
      }
      return false;
    }
  }

  GetIdAgent() {
    this._reportService
      .GetIdAgent(this.searchAgentText)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          //console.log(data);
          if (data != 0) this.GetAgentTree(data);
        },
        (error) => {}
      );
  }

  FindByText() {
    if (this.searchAgentText != "") {
      this.GetIdAgent;
      // this.tempAgentTreeData = this.agentTreeData;
      // let nod: any[] = [];
      // let res: any = this.filterRecursive(this.tempAgentTreeData[0]);
      // nod.push(res);
      // this.tempAgentTreeData = nod;
      // console.log(this.tempAgentTreeData);
    } else {
      //this.tempAgentTreeData = this.agentTreeData;
      this.GetAgentTree(this._currentUser.Master.IdAgent);
    }
  }

  hasRight(idRight: number): boolean {
    return this.agentRights.some((right) => right.IdRight === idRight);
  }

  logout() {
    if (localStorage.getItem("agentInfo")) {
      localStorage.clear();

      let returnUrl = "/login";
      this.router.navigate([returnUrl]);
      // this.authService.doLogout().then(res => {
      //   window.location.href = '/login';
      // }, err => {
      //   console.log(err);
      // });
    }
  }

  openDropdown(event: Event) {
    event.preventDefault(); // Esto evitará que el enlace redireccione
  }

  openSidebar(){
    this.display = true;
  }

  onHide() {
    this.display = false;
  }
} //end component
