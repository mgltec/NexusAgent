import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  AgentListModel,
  AgentRightDTO,
  AgentSessionDto,
  DaySheetForNewAgentRequestDto,
  RequestPlayerListModel,
} from "src/app/Models/models";
import {
  DashboardPlayerDataDto,
  PlayerActivityByAgentDto,
  PlayerAmountListDto,
  PlayerStatisticsResult,
  RequestAgentWeeklyBalance,
  RequestPlayerActivity,
  SuperAgentDistribution,
  WonLostBusinessUnitDto,
} from "src/app/Models/RpModels";
import { DataService } from "src/app/Services/data.service";
import { ReportsService } from "src/app/Services/reports.service";

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.scss"],
  providers: [DatePipe],
})
export class PrincipalComponent implements OnInit, OnDestroy {
  public _loadingReport: boolean = false;
  public display: boolean = false;
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _playerDataThisWeek: DashboardPlayerDataDto =
    new DashboardPlayerDataDto();
  public _playerDataLastWeek: DashboardPlayerDataDto =
    new DashboardPlayerDataDto();
  public _wonLossReport: WonLostBusinessUnitDto = new WonLostBusinessUnitDto();
  public _playerActivityReport: PlayerActivityByAgentDto[] = [];
  public _loadingWonLossByUnit: boolean = false;
  public _loadingActivePlayerReport: boolean = false;
  public _loadingAgentList: boolean = false;
  public _loadingReportDistro: boolean = false;
  public _topPlayerList: PlayerAmountListDto = new PlayerAmountListDto();
  public playerList: any[] = [];
  public playerList2: any[] = [];
  public playerSelected: any;
  public AgentSelected: any;
  public _stepTrans: number = 1;
  public agentList: any[] = [];
  public agentRights: AgentRightDTO[] = [];
  public filteredItems!: any[];
  public PlayerSelectedAcomplete: any;
  public basicData: any;
  public basicOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            borderDash: [5, 5], // This will create a 5px dash followed by a 5px gap
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            borderDash: [5, 5],
          },
        },
      ],
    },
  };
  public chartData: any;
  public ReportDataDistro: SuperAgentDistribution =
    new SuperAgentDistribution();

  public _loadingPlayerDataThisWeek: boolean = false;
  public _loadingTopPlayer: boolean = false;
  public displayModal: boolean = false;

  public _idPlayer: string = "";
  public _Player: string = "";

  public closeResult: string = "";

  public loadingPlayerList: boolean = false;

  public showServiceBalance: boolean = false;
  public playerStatistics?: PlayerStatisticsResult;
  public loadingServiceBalance: boolean = true;

  constructor(
    private router: Router,
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
    private modalService: NgbModal,
    private datePipe: DatePipe
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
          this.GetAgentRights();
          this.GetPlayerLossAndActivePlayerAdvanceThisWeek();
          this.GetPlayerLossAndActivePlayerLastWeek();
          this.GetWonLossByBusinessUnit();
          //  this.GetPlayerActivity();**
          this.GetPlayerTopWinLoss();
          this.GetAgentList();
          this.GetPlayerList2();
          this.GetDataForChart();
          this.GetAgentDistribution();
          this.GetAgentBalance();
        }
      } else {
        this.GetAgentRights();
        this.GetPlayerLossAndActivePlayerAdvanceThisWeek();
        this.GetPlayerLossAndActivePlayerLastWeek();
        this.GetWonLossByBusinessUnit();
        // this.GetPlayerActivity();**
        this.GetPlayerTopWinLoss();
        this.GetAgentList();
        this.GetPlayerList2();
        this.GetDataForChart();
        this.GetAgentDistribution();
        this.GetAgentBalance();
      }
    }); //end dataservice call

    this._DataService.ShowFilters.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((data) => {
      this.display = data;
    }); //end dataservice call
  }

  // GetPlayerLossAndActivePlayerThisWeek() {

  //   this._loadingPlayerDataThisWeek = true;

  //   let t: RequestAgentWeeklyBalance = new RequestAgentWeeklyBalance();

  //   t.Agent = this._currentUser.AgentSelected;
  //   t.IdAgent = this._currentUser.IdAgentSelected;
  //   t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
  //   t.EndDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;
  //   t.IsDistributor = "true";
  //   t.TransactionType = -1;
  //   t.AgentDisplayHistory = true;
  //   t.IdCurrency = 0;

  //   this._reportService.GetDashboardPlayerData(t)
  //     .pipe(takeUntil(this._unsubscribeAll))
  //     .subscribe(data => {
  //       this._playerDataThisWeek = data;
  //       //console.log(this._playerDataThisWeek);
  //       this._loadingPlayerDataThisWeek = false;
  //     }, error => {
  //       this._loadingPlayerDataThisWeek = false;
  //     });
  // }

  modalInvoice:boolean = false;

  get InvoiceUrl() {
    const idAgent = this._currentUser.IdAgentSelected;
    return `https://billing.5itedev.com/index.html?d=${idAgent}&is=True`;
  }

  GetPlayerLossAndActivePlayerAdvanceThisWeek() {
    this._loadingPlayerDataThisWeek = true;

    let t: DaySheetForNewAgentRequestDto = new DaySheetForNewAgentRequestDto();
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.WeekDate =
      this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    t.ActionType = "A"; //Number(this.businessUnitSelected);
    t.ReportOrderBy = "Player";

    this._reportService
      .GetDashboardPlayerAdvanceData(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._playerDataThisWeek = data;
          //console.log(this._playerDataThisWeek);
          this._loadingPlayerDataThisWeek = false;
        },
        (error) => {
          this._loadingPlayerDataThisWeek = false;
        }
      );
  }

  GetPlayerLossAndActivePlayerLastWeek() {
    let t: DaySheetForNewAgentRequestDto = new DaySheetForNewAgentRequestDto();
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.WeekDate = this._currentUser.WeekList[1].MonDate;
    t.ActionType = "A"; //Number(this.businessUnitSelected);
    t.ReportOrderBy = "Player";

    this._reportService
      .GetDashboardPlayerAdvanceData(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._playerDataLastWeek = data;
        },
        (error) => {}
      );
  }

  GetDataForChart() {
    this._reportService
      .GetDataForChart(this._currentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.chartData = data[0];

          let labels = [
            this.chartData.day1,
            this.chartData.day2,
            this.chartData.day3,
            this.chartData.day4,
            this.chartData.day5,
            this.chartData.day6,
            this.chartData.day7,
          ];

          this.basicData = {
            labels: labels.map((label) =>
              this.datePipe.transform(label, "dd MMM")
            ),
            datasets: [
              {
                label: "Sports",
                backgroundColor: "#D95351",
                data: [
                  this.chartData.Day1Sports,
                  this.chartData.Day2Sports,
                  this.chartData.Day3Sports,
                  this.chartData.Day4Sports,
                  this.chartData.Day5Sports,
                  this.chartData.Day6Sports,
                  this.chartData.Day7Sports,
                ],
              },
              {
                label: "Casino",
                backgroundColor: "#337ab7",
                data: [
                  this.chartData.Day1Casino,
                  this.chartData.Day2Casino,
                  this.chartData.Day3Casino,
                  this.chartData.Day4Casino,
                  this.chartData.Day5Casino,
                  this.chartData.Day6Casino,
                  this.chartData.Day7Casino,
                ],
              },
              {
                label: "Racing",
                backgroundColor: "#5cb85c",
                data: [
                  this.chartData.Day1Horses,
                  this.chartData.Day2Horses,
                  this.chartData.Day3Horses,
                  this.chartData.Day4Horses,
                  this.chartData.Day5Horses,
                  this.chartData.Day6Horses,
                  this.chartData.Day7Horses,
                ],
              },
            ],
          };
        },
        (error) => {}
      );
  }

  GetWonLossByBusinessUnit() {
    this._loadingWonLossByUnit = true;
    let t: RequestAgentWeeklyBalance = new RequestAgentWeeklyBalance();

    t.Agent = this._currentUser.AgentSelected;
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.StartDate =
      this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    t.EndDate =
      this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;
    t.IsDistributor = "true";
    t.TransactionType = -1;
    t.AgentDisplayHistory = true;
    t.IdCurrency = 0;

    this._reportService
      .GetWonLossByBusinessUnit(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._wonLossReport = data;
          this._loadingWonLossByUnit = false;
        },
        (error) => {
          this._loadingWonLossByUnit = false;
        }
      );
  }

  GetPlayerActivity() {
    this._loadingActivePlayerReport = true;
    let t: RequestPlayerActivity = new RequestPlayerActivity();

    t.Agent = this._currentUser.AgentSelected;
    t.EndDate =
      this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;
    t.StartDate =
      this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;

    this._reportService
      .GetActivePlayerByAgent(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._playerActivityReport = data;
          // console.log(this._playerActivityReport);
          this._loadingActivePlayerReport = false;
        },
        (error) => {
          this._loadingActivePlayerReport = false;
        }
      );
  }

  GetPlayerTopWinLoss() {
    this._loadingTopPlayer = true;
    let t: RequestAgentWeeklyBalance = new RequestAgentWeeklyBalance();

    t.Agent = this._currentUser.AgentSelected;
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.StartDate =
      this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    t.EndDate =
      this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;
    t.IsDistributor = "true";
    t.TransactionType = -1;
    t.AgentDisplayHistory = true;
    t.IdCurrency = 0;

    this._reportService
      .GetTopPlayerListWinLos(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._topPlayerList = data;
          this._loadingTopPlayer = false;
        },
        (error) => {
          this._loadingTopPlayer = false;
        }
      );
  }

  hideFilters() {
    this._DataService.methodShowFilters(false);
  }

  onChangeDateSelection(event: any) {
    localStorage.setItem("agentInfo", JSON.stringify(this._currentUser));
    this._DataService.changeDataUserSession(this._currentUser);

    //close siderbar after control change
    this._DataService.methodShowFilters(false);
    this.display = false;
  }

  calculateClassesCard(value: any): string {
    if (Number(value) < 0) {
      return "card pull-up positive border-primary";
    } else if (Number(value) > 0) {
      return "card pull-up negative border-primary";
    } else {
      return "card pull-up neutral border-primary";
    }
  }

  calculateClasses(value: number): string {
    if (Number(value) > 0) return "NumPositive";
    else if (Number(value) < 0) return "NumNegative";
    else return "NumZero";
  }

  OpenPlayerInfoModal() {
    this._Player = "";
    this._idPlayer = "";
    this.displayModal = true;
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
          this.loadingPlayerList = false;
        },
        (error) => {
          this.loadingPlayerList = false;
        }
      );
  }

  GetPlayerList2() {
    this.loadingPlayerList = true;
    this._reportService
      .GetAllPlayerfromAgentNoDetails(this._currentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.playerList2 = data;
          this.loadingPlayerList = false;
        },
        (error) => {
          this.loadingPlayerList = false;
        }
      );
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

  OpenDivPlayerTransaction() {
    if (this.playerSelected != null) this._stepTrans = 2;
    else {
      this.showMessage("error", "Player error", "Please select a player");
    }
  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
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

  GoToWeeklyBalanceLastWeek() {
    this._currentUser.RangeDateSelected = 1;

    localStorage.setItem("agentInfo", JSON.stringify(this._currentUser));
    this._DataService.changeDataUserSession(this._currentUser);

    this.router.navigate(["mainbk/weeklydaysheet"]);
  }

  filterItems(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.playerList2.length; i++) {
      let item = this.playerList2[i];
      if (item.Player.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredItems = filtered;
  }

  SelectedPlayerAutoComplete() {
    //console.log(this.PlayerSelectedAcomplete);
    this.router.navigate(["mainbk/playerdetails"], {
      queryParams: {
        player: this.PlayerSelectedAcomplete.Player,
        idplayer: this.PlayerSelectedAcomplete.IdPlayer,
      },
    });
  }

  OpenAddPlayerForm() {
    this._stepTrans = 2;
  }

  OpenAgentTransForm() {
    this._stepTrans = 2;
  }

  GetAgentDistribution() {
    // this._loadingReportDistro = true;
    // if (this._currentUser.IdAgentSelected == 25759) {
    //   this._reportService.GetAgentDistributionV3Tangusma(this._currentUser.IdAgentSelected, this._currentUser.WeekList[1].MonDate)    //week: 1 because is last week
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(data => {
    //       this.ReportDataDistro = data;
    //     //  console.log(this.ReportDataDistro);
    //       this._loadingReportDistro = false;
    //     }, error => {
    //       this._loadingReportDistro = false;
    //     });
    // }
    // else {
    //   this._reportService.GetAgentDistributionV3SubTangusma(this._currentUser.IdAgentSelected, this._currentUser.WeekList[1].MonDate) //week: 1 because is last week
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(data => {
    //       this.ReportDataDistro = data;
    //      // console.log(this.ReportDataDistro);
    //       this._loadingReportDistro = false;
    //     }, error => {
    //       this._loadingReportDistro = false;
    //     });
    // }
  }

  GetAgentBalance() {
    this.loadingServiceBalance = true;

    this._reportService
      .GetAgentBalance(this._currentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data) {
            this.playerStatistics = data;
          }
          this.loadingServiceBalance = false;
        },
        (error) => {
          this.loadingServiceBalance = false;
        }
      );
  }

  GoToDistribution() {
    this._currentUser.RangeDateSelected = 1;

    localStorage.setItem("agentInfo", JSON.stringify(this._currentUser));
    this._DataService.changeDataUserSession(this._currentUser);

    this.router.navigate(["mainbk/distributionV2"]);
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
} // end component
