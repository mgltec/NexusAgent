import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentSessionDto, PlayerHistoryByDayDto } from 'src/app/Models/models';
import { RequestPlayerTransaction } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-PlayerDetails',
  templateUrl: './PlayerDetails.component.html',
  styleUrls: ['./PlayerDetails.component.css']
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {



  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public display: boolean = false
  public _idPlayer: string = "";
  public _Player: string = "";

  public _PlayerInfo: any;
  public _PlayerTransaction: any[] = [];
  public _PlayerBalanceHistory: any;
  public _loadingPlayerInfo: boolean = false;
  public _loadingPlayerTran: boolean = false;
  public _loadingPlayerBalanceHistory: boolean = false;
  public displayModal: boolean = false;
  public _historyData: PlayerHistoryByDayDto[] = [];
  public closeResult: string = "";
  public _loadingReport: boolean = false;
  public _lifeTimeNet: number = 0;

  public OpenBets : any;

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
    private modalService: NgbModal
  ) {

    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._idPlayer = this.route.snapshot.queryParamMap.get('idplayer') || '';
    this._Player = this.route.snapshot.queryParamMap.get('player') || '';

    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
        }
      }
      this.GetPlayerInformation();
      this.GetPlayerTransaction();
      this.GetPlayerBalanceHistory();
      this.GetPlayerLifeTimeNet(this._idPlayer);

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call


  }//end method

  GetPlayerInformation() {
    this._loadingPlayerInfo = true;
    this._reportService.GetPlayerInformation(Number(this._idPlayer))
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

  GetPlayerTransaction() {

    let a: RequestPlayerTransaction = new RequestPlayerTransaction();

    a.startDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    a.endDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;
    a.IdPlayer = this._idPlayer;

    this._loadingPlayerTran = true;
    this._reportService.GetPlayerTransactions(a)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this._PlayerTransaction = data;
        //  console.log(this._PlayerTransaction);
        this._loadingPlayerTran = false;
      }, error => {
        this._loadingPlayerTran = false;
      });
  }

  GetPlayerBalanceHistory() {

    let a: RequestPlayerTransaction = new RequestPlayerTransaction();

    a.startDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    a.endDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;
    a.IdPlayer = this._idPlayer;

    this._loadingPlayerBalanceHistory = true;
    this._reportService.GetBalanceHistory(a)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this._PlayerBalanceHistory = data;
        // console.log(this._PlayerBalanceHistory);
        this._loadingPlayerBalanceHistory = false;
      }, error => {
        this._loadingPlayerBalanceHistory = false;
      });
  }

  hideFilters() {
    this._DataService.methodShowFilters(false);
  }

  calculateClasses(value: number): string {
    //console.log(value);

    if (Number(value) > 0)
      return "NumPositive";
    else if (Number(value) < 0)
      return "NumNegative";
    else
      return "NumZero";
  }

  showModalDialog() {
    this.displayModal = true;
  }

  onChangeDateSelection(event: any) {

    localStorage.setItem(
      "agentInfo",
      JSON.stringify(this._currentUser)
    );
    this._DataService.changeDataUserSession(this._currentUser);
  }

  open(content: any) {
    // this.playerSelected = null;
    // this.AgentSelected = null;
    // this._stepTrans = 1;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  gotoPlayerHistory() {
    this.router.navigate(["mainbk/playerhistory"], { queryParams: { player: this._Player, idplayer: this._idPlayer } });
  }


  GetPlayerOpenBets(idPlayer: string, content: any) {

    //this._loadingReport = true;

    this._reportService
      .GetplayerOpenBets(Number(idPlayer))
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


  GetPlayerLifeTimeNet(idPlayer: string) {

    //this._loadingReport = true;

    this._reportService
      .GetPlayerLifeTimeNet(Number(idPlayer))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {

          console.log(data);
this._lifeTimeNet = data;

        },
        (error) => { this._loadingReport = false; }
      );
  } //end submit form


}//end component
