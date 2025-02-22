import {
  Component,
  OnDestroy,
  OnInit,
  ɵɵsetComponentScope,
} from "@angular/core";
import { MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { delay, takeUntil } from "rxjs/operators";
import {
  AgentDto,
  WeekRangeDto,
  AgentListModel,
  RequestPlayerListModel,
  AgentSessionDto,
  AgentWagersTicketRequest,
  AgentDeleteWagerRightsRequest,
  AgentDeleteWagerRequest,
  AgentLoginDto,
} from "src/app/Models/models";
import { DataService } from "src/app/Services/data.service";
import { ReportsService } from "src/app/Services/reports.service";

@Component({
  selector: "app-AgentWagersTicker",
  templateUrl: "./AgentWagersTicker.component.html",
  styleUrls: ["./AgentWagersTicker.component.scss"],
})
export class AgentWagersTickerComponent implements OnInit, OnDestroy {
  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public login: AgentLoginDto = new AgentLoginDto();
  public agentSelected: string = "";
  public agentList: any[] = [];
  public playerSelected: string = "-1";
  public playerList: any[] = [];
  public sportSelected: string = "ALL";
  public typeSelected: string = "-1";
  public amountSelected: string = "-1";
  public right: boolean = false;
  public reportData: any[] = [];
  public DeleteData: any[] = [];
  public AgentRight: any[] = [];
  public _loadingReport: boolean = false;
  public interval: any;
  public displayModal: boolean = false;
  public wagerSelected: any;
  public intervalSelected: string = "30000";

  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  ngOnInit() {
    this._DataService.UserSession.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem("agentInfo") != null) {
          this._currentUser = JSON.parse(
            localStorage.getItem("agentInfo") || "{}"
          );
        }
      }
      this.GetAgentList();
    }); //end dataservice call

    this._DataService.ShowFilters.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((data) => {
      this.display = data;
    }); //end dataservice call

    this.GetAgentRights();
    this.GetReport();
  }

  GetColor(rep: any) {
    return rep.OriginalRiskAmount <= 10
      ? "#C7FFA6 !important"
      : rep.OriginalRiskAmount > 10 && rep.OriginalRiskAmount <= 50
      ? "#CFE99D !important"
      : rep.OriginalRiskAmount > 50 && rep.OriginalRiskAmount <= 100
      ? "#D7D495 !important"
      : rep.OriginalRiskAmount > 100 && rep.OriginalRiskAmount <= 250
      ? "#DFBF8C !important"
      : rep.OriginalRiskAmount > 250 && rep.OriginalRiskAmount <= 500
      ? "#E7AA84 !important"
      : rep.OriginalRiskAmount > 500 && rep.OriginalRiskAmount <= 1000
      ? "#EF957B !important"
      : rep.OriginalRiskAmount > 1000 && rep.OriginalRiskAmount <= 2000
      ? "#F78073 !important"
      : rep.OriginalRiskAmount > 2000 && rep.OriginalRiskAmount <= 3000
      ? "#FF6B6B !important"
      : rep.OriginalRiskAmount > 3000
      ? "#FF5C5C !important"
      : "white !important";
  }

  GetAgentList() {
    let info: AgentListModel = new AgentListModel();
    info.idAgent = this._currentUser.IdAgentSelected;
    info.agent = this._currentUser.AgentSelected;
    this._reportService
      .GetAgentsList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.agentList = data["List"];
        },
        (error) => {}
      );
  }

  GetPlayerList() {
    let info: RequestPlayerListModel = new RequestPlayerListModel();
    if (this.agentSelected == "" || this.agentSelected == undefined) {
      info.idAgent = this._currentUser.IdAgentSelected;
    } else {
      info.idAgent = parseInt(this.agentSelected);
    }
    this._reportService
      .GetPlayerList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.playerList = data;
        },
        (error) => {}
      );
    this.playerSelected = "-1";
  }

  GetAgentRights() {
    let info: AgentDeleteWagerRightsRequest =
      new AgentDeleteWagerRightsRequest();
    info.IdAgent = this._currentUser.Master.IdAgent;
    this._reportService
      .GetAgentDeleteWagersRights(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.AgentRight = data;
          this.right = this.AgentRight[0].Permit;
        },
        (error) => {}
      );
  }

  GetReport() {
    this._loadingReport = true;

    let info: AgentWagersTicketRequest = new AgentWagersTicketRequest();

    if (this.agentSelected == "") {
      info.prmIdAgent = this._currentUser.IdAgentSelected;
    } else {
      info.prmIdAgent = parseInt(this.agentSelected);
    }

    info.prmIdPlayer = parseInt(this.playerSelected);
    info.prmIdSport = this.sportSelected;
    info.prmWagerType = parseInt(this.typeSelected);

    if (this.amountSelected != "-1" && parseInt(this.amountSelected) < 0) {
      info.prmMayorque = -1;
      info.prmMenorque = parseInt(this.amountSelected.replace("-", ""));
    } else if (
      this.amountSelected != "-1" &&
      parseInt(this.amountSelected) > 0
    ) {
      info.prmMenorque = -1;
      info.prmMayorque = parseInt(this.amountSelected);
    } else {
      info.prmMenorque = -1;
      info.prmMayorque = -1;
    }

    this._reportService
      .GetAgentWagersTicket(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.reportData = data;
          this._loadingReport = false;
          this.GetReportWithInterval();
        },
        (error) => {
          this._loadingReport = false;
        }
      );
  }

  GetReportWithInterval() {
    if (this.intervalSelected == "-1") {
      clearInterval(this.interval);
    } else {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this._loadingReport = true;
        let info: AgentWagersTicketRequest = new AgentWagersTicketRequest();

        if (this.agentSelected == "") {
          info.prmIdAgent = this._currentUser.IdAgentSelected;
        } else {
          info.prmIdAgent = parseInt(this.agentSelected);
        }

        info.prmIdPlayer = parseInt(this.playerSelected);
        info.prmIdSport = this.sportSelected;
        info.prmWagerType = parseInt(this.typeSelected);

        if (this.amountSelected != "-1" && parseInt(this.amountSelected) < 0) {
          info.prmMayorque = -1;
          info.prmMenorque = parseInt(this.amountSelected.replace("-", ""));
        } else if (
          this.amountSelected != "-1" &&
          parseInt(this.amountSelected) > 0
        ) {
          info.prmMenorque = -1;
          info.prmMayorque = parseInt(this.amountSelected);
        } else {
          info.prmMenorque = -1;
          info.prmMayorque = -1;
        }

        this._reportService
          .GetAgentWagersTicket(info)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(
            (data) => {
              this.reportData = data;
              this._loadingReport = false;
            },
            (error) => {
              this._loadingReport = false;
            }
          );
      }, parseInt(this.intervalSelected));
    }
  }

  DeleteWagerModal(info: any[]) {
    this.wagerSelected = info;
    this.displayModal = true;
  }

  DeleteWager() {
    let t: AgentDeleteWagerRequest = new AgentDeleteWagerRequest();
    t.IdWager = this.wagerSelected.TicketNumber;
    t.IdAgent = this._currentUser.Master.IdAgent;
    //t.Ip = this.login.Ip;
    t.Ip = "192.168.41.44";
    t.Url = "https://allagentreports.bankrollaction.com";
    //console.log(t);

    this._reportService
      .DeleteWager(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.DeleteData = data;
          console.log(this.DeleteData);
          this.GetReport();
        },
        (error) => {}
      );
    this.displayModal = false;
  }

  hideFilters() {
    this._DataService.methodShowFilters(false);
  }
}
