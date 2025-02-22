import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentInfoDto, AgentRightDTO, AgentSessionDto, Node } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { PhoneDirectoryService } from 'src/app/Services/phoneDirectory.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-PrincipalClassic',
  templateUrl: './PrincipalClassic.component.html',
  styleUrls: ['./PrincipalClassic.component.scss']
})
export class PrincipalClassicComponent implements OnInit {

  public _unsubscribeAll: Subject<any>;
  public isDesktop: boolean = false;
  public menuOpened: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _step = 1;
  public agentBalanceGeneral: AgentInfoDto = new AgentInfoDto();
  public _loadingAgentList: boolean = false;
  public agentRights: AgentRightDTO[] = [];
  display: boolean = true;
  rootNode!: Node;
  _loadingTree: boolean = false;
  isOpen: boolean = true;

  constructor(
    public _reportService: ReportsService,
    public _DataService: DataService,
    private router: Router,
    public messageService: MessageService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private phoneDirectoryService: PhoneDirectoryService
  ) {
    this._unsubscribeAll = new Subject();
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  @HostListener("window:resize")
  onWindowResize() {
    const newIsDesktop = window.matchMedia("(min-width: 1024px)").matches;

    // Solo cambia el estado si hay un cruce del límite de 1024px
    if (newIsDesktop !== this.isDesktop) {
    this.isDesktop = newIsDesktop;
    
    if (!this.isDesktop) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }
  }

  ngOnInit() {
    this.isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if(!this.isDesktop){
      this.isOpen = false;
    }
    this._DataService.MenuOpened.subscribe((opened) => {
      this.menuOpened = opened;
    });

    this._DataService.UserSession.subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;


      if (
        this._currentUser.Master == null ||
        this._currentUser.IdAgentSelected == 0
      ) {
        if (localStorage.getItem("agentInfo") != null) {
          this._currentUser = JSON.parse(
            localStorage.getItem("agentInfo") || "{}"
          );
        }
        this.GetAgentBalanceGeneral();
        this.GetAgentRights();
        this.GetAgentTree(this._currentUser.Master.IdAgent)
      }else{
        this.GetAgentBalanceGeneral();
        this.GetAgentRights();
        this.GetAgentTree(this._currentUser.Master.IdAgent)
      }
    }); //end dataservice call
    
  };

  onStepChange(newStep: number) {
    this._step = newStep;
  }

  GetAgentBalanceGeneral() {
    this._reportService
      .GetAgentBalanceGeneral(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.agentBalanceGeneral = data;
        },
        (error) => { }
      );
  }

  GetAgentRights() {
    this._loadingAgentList = true;
    this._reportService
      .GetAgentRights(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.agentRights = data;
          this._DataService.changeAgentRights(data);
          localStorage.setItem("agentRights", JSON.stringify(this.agentRights));
        },
        (error) => {
          console.log("Error in GetAgentRights");
        }
      );
  }

  hasRight(idRight: number): boolean {
    return this.agentRights.some((right) => right.IdRight === idRight);
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
          this.sortChildren(data);
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

  toggleIsOpen(){
    this.isOpen = !this.isOpen;
  }

  private sortChildren(node: any) {
    if (node.children && node.children.length) {
      
      node.children.sort((a: any, b: any) => a.Agent.localeCompare(b.Agent));
  
      node.children.forEach((child: any) => this.sortChildren(child));
    }
  }
}
