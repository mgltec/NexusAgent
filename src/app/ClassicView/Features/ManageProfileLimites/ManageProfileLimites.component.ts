import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentListModel, AgentSessionDto, CloneProfileDTO, PlayerInfoRequestDto, PlayerProfileLimitDTO, ProfileLimitsDto, ProfileLimitsResultDto, RequestPlayerListModel, SaveProfileDTO, SportDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-ManageProfileLimites',
  templateUrl: './ManageProfileLimites.component.html',
  styleUrls: ['./ManageProfileLimites.component.scss']
})
export class ManageProfileLimitesComponent implements OnInit {

  public agentSelected: any ;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _unsubscribeAll: Subject<any>;
  public playerSelected: any;
  public playerList: any = []; 
  public agentList: any = []; 
  public limits: boolean | null = null;
  public limits2: boolean | null= null;

  public limitOnline: boolean = false;
  public limitPhone: boolean = false;
  selectedLimit: boolean | null = null;

  public limitBasic: boolean = false;
  public limitAdvance: boolean = false;
  selectedLimit2: boolean | null = null;
  editingRowIndex: number | null = null;
  public sports: SportDto[] = [];
  public sportSelected: SportDto = new SportDto();

  public profileLimits: ProfileLimitsResultDto[] = [];
  public profileLimitSelected: ProfileLimitsResultDto | undefined = new ProfileLimitsResultDto();
  public currentProfileLimit: ProfileLimitsResultDto | undefined = new ProfileLimitsResultDto();
  public amount: number = 0;


  _options : ProfileLimitsDto[] = [];
  

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

       this.GetAgentTree2()
       this.GetSports();
        /****************************DATATABLE OPTIONS*************************************** */
    }); //end dataservice call

  }

  GetAgentTree2() {
    this._reportService.GetAgentTree2(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.agentList = data;
      }, error => {

      });
  }


  GetPlayerList() {
    console.log(this.agentSelected)
    let info: RequestPlayerListModel = new RequestPlayerListModel();

    if (this.agentSelected == '' || this.agentSelected == undefined) {
      info.idAgent = this._currentUser.IdAgentSelected;
    }
    else {
      info.idAgent = this.agentSelected.IdAgent;

    }

    console.log(info)

    this._reportService.GetPlayerList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.playerList = data;
        // this.playerSelected = data[0];
      }, error => {

      });

      this.GetPlayerProfileLimitsByAgent()
  }

  GetPlayerInfo() {
    const domain: string = window.location.hostname.replace('www.', '');
    let req: PlayerInfoRequestDto = new PlayerInfoRequestDto();
    req.IdPlayer = parseInt(this.playerSelected.IdPlayer);
    req.IdSport = "";
    req.RequestHeader.DomainName = domain;
    req.RequestHeader.IdSite = 0;
    req.RequestHeader.IsPlayer = true;
    req.RequestHeader.UserName = this._currentUser.Master.Agent;
    console.log("aqui")

    this._reportService.GetPlayerInfoWithIdPlayer(this._currentUser, parseInt(this.playerSelected.IdPlayer))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {

        this.currentProfileLimit = this.profileLimits.find((item) => item.IdProfileLimits === data.IdProfileLimits);
        this.profileLimitSelected = this.profileLimits.find((item) => item.IdProfileLimits === data.IdProfileLimits);
        console.log(this.profileLimitSelected)
        
        this.GetPlayerProfileLimits()
      }, error => {

      });      
  }

  GetSports() {
    this._reportService.GetSports(this._currentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.sports = data;
      }, error => {

      });
  }


  GetPlayerProfileLimitsByAgent() {
    this._reportService.PlayerProfileLimits_GetByAgent(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.profileLimits = data;
        this.profileLimitSelected = this.currentProfileLimit;
      }, error => {

      });
  }

  updateLimit(value: boolean): void {
    this.limitOnline = value;      
    this.limitPhone = !value;      
  }

  updateLimit2(value: boolean): void {
    this.limitBasic = value;     
    this.limitAdvance = !value;    
  }

  ChangeProfilePlayer() {
    let req: PlayerProfileLimitDTO = new PlayerProfileLimitDTO();
    req.IdPlayer = this.playerSelected.IdPlayer;
    req.IdProfileLimits = this.profileLimitSelected ? this.profileLimitSelected?.IdProfileLimits : 0;
    this._reportService.ChangeProfilePlayer(this._currentUser, req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        console.log(data)
        if(data === 0){
          this.currentProfileLimit = this.profileLimitSelected;
          this.showMessage("success", "Profile changed", "");
        }
      }, error => {

      });
  }

  GetPlayerProfileLimits() {
    const idSport = this.sportSelected.IdSport;
    console.log(idSport)
    if(this.agentSelected && this.playerSelected && this.sportSelected && this.selectedLimit !== null && this.selectedLimit2 !== null){
      this._reportService.GetPlayerProfileLimits(this._currentUser, this.playerSelected.IdPlayer, idSport.toString().trim(), this.selectedLimit, this.selectedLimit2 )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(data => {
          console.log(data)
          this._options = data;
        }, error => {
  
        });
    }
  }


  CloneProfile() {
    let req: CloneProfileDTO = new CloneProfileDTO();
    req.IdPlayer = this.playerSelected.IdPlayer;
    req.prmIdAgent = this.agentSelected.IdAgent;
    req.prmIdProfileLimits = this.profileLimitSelected ? this.profileLimitSelected?.IdProfileLimits : 0;
    req.NewName = this.playerSelected.Player;
    this._reportService.CloneProfile(this._currentUser, req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        console.log(data)
        if(data === 0){
          this.GetPlayerProfileLimitsByAgent();
          this.showMessage("success", "Profile created", "");
        }
      }, error => {

      });
  }

  SaveProfile(selectedLimit: boolean | null) {
    let req: SaveProfileDTO = new SaveProfileDTO();
    req.IdPlayer = this.playerSelected.IdPlayer;
    req.IdSport = this.sportSelected.IdSport;
    req.Online = selectedLimit !== null ? selectedLimit : true;
    req.GameTypes = this._options.map( game => ({
      IdGameType: game.IdGameType,
      Side: game.Side,
      Total: game.Total,
      MoneyLine: game.MoneyLine,
      Parlays: game.Parlays,
      Teasers: game.Teasers,
      IfBets: game.IfBets,
      Reverses: game.Reverses,
      Related: game.Related
    }))
    this._reportService.SaveProfile(this._currentUser, req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        console.log(data)
        if(data === 0){
          
          this.showMessage("success", "Profile successfully saved ", "");
        }
      }, error => {

      });
  }
  
  applyAmount(){
    this._options.forEach(game => {
      game.Side = this.amount;
      game.Total = this.amount;
      game.MoneyLine = this.amount;
      game.Parlays = this.amount;
      game.Teasers = this.amount;
      game.IfBets = this.amount;
      game.Reverses = this.amount;
      game.Related = this.amount;
    });
    console.log(this._options)
  }

  reset(){
    this.GetPlayerProfileLimits();
    this.GetPlayerProfileLimitsByAgent();
  }

  saveOnlineAndPhone(){
    this.SaveProfile(true);
    this.SaveProfile(false);
  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }
}
