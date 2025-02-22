import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentListModel, AgentSessionDto, RequestPlayerListModel } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { PhoneDirectoryService } from 'src/app/Services/phoneDirectory.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-player-payments',
  templateUrl: './player-payments.component.html',
  styleUrls: ['./player-payments.component.scss']
})
export class PlayerPaymentsComponent implements OnInit {
  public loadingPlayerList: boolean = false;
  public _loadingAgentList: boolean = false;
  public _stepTrans: number = 1;
  public playerSelected: any;
  public AgentSelected: any;
  public agentList: any[] = [];
  public playerList: any[] = [];
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _PlayerInfo: any;
  _loadingPlayerInfo: boolean = false;
  _idPlayer: number = 0;

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

  ngOnInit() {
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
      }
    }); //end dataservice call
    
    this.GetAgentList();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
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

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }
  
  OpenDivPlayerTransaction() {
    if (this.playerSelected != null){
      this._stepTrans = 2;
      this.GetPlayerInformation(this.playerSelected.IdPlayer)
    } 
    else {
      this.showMessage("error", "Player error", "Please select a player");
    }
  }

  GetPlayerInformation(idPlayer:number) {
    this._loadingPlayerInfo = true;
    this._reportService.GetPlayerInformation(idPlayer)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this._PlayerInfo = data;
        console.log("PlayerInfo");
        console.log(this._PlayerInfo);
        this._loadingPlayerInfo = false;
      }, error => {
        this._loadingPlayerInfo = false;
      });
  }


}
