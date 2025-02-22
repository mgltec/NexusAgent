import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { AgentListModel, AgentSessionDto, RequestAgentPositionDetail, RequestAgentPositionDto, ResultAgentPosition, WeekRangeDto } from 'src/app/Models/models';
import { AgentPositionDetailsDto, AgentPositionResultV2Dto, RequestAgentPositionV2Dto } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-AgentPosition',
  templateUrl: './AgentPosition.component.html',
  styleUrls: ['./AgentPosition.component.css']
})
export class AgentPositionComponent implements OnInit, OnDestroy {

  public display: boolean = false;
  public _unsubscribeAll: Subject<any>;
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public _checkFuture: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _ResultAgentPosition: ResultAgentPosition = new ResultAgentPosition();
  public _ListResultAgentPosition!: AgentPositionResultV2Dto[];
  public _loadingReport: boolean = false;
  public toasts: any[] = [];
  public closeResult = '';
  public agentList: any[] = [];
  public _displayPositionDetailData: boolean = false;
  public totalWager: number = 0;
  public totalWin: number = 0;
  public totalRisk: number = 0;
  public posDetailsObj: AgentPositionDetailsDto = new AgentPositionDetailsDto();
  //public dtOptions: DataTables.Settings = {};
  public agentSelected: any;
  public totalCBB: number = 0;
  public totalCFB: number = 0;
  public totalESOC: number = 0;
  public totalMLB: number = 0;
  public totalMU: number = 0;
  public totalNBA: number = 0;
  public totalNFL: number = 0;
  public totalNHL: number = 0;
  public totalPROP: number = 0;
  public totalRAC: number = 0;
  public totalTNT: number = 0;
  public totalSOC: number = 0;
  public sportSelected: string = "";
  public rotationNumber: string = "";

  public displayModalPositionDetail: boolean=false;

  dtOptions: any = {};

  //public _count : number = 0;

  dtTrigger: Subject<any> = new Subject();

  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
    private modalService: NgbModal
  ) {

    this._unsubscribeAll = new Subject();
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {

    this.dtOptions = {
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 25,
      //processing: true
      dom: 'Bfrtip',
      buttons: [
        {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Position'} ,
        {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Position'} ,
        {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Position',filename: 'Agent Position '+ this._currentUser.AgentSelected + ' ' + this._dateRange.Start} ,
        {extend: 'pdf'},
        {extend: 'pdfHtml5'},
      ],

    };

    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
        }
      }

      //this._count++;
      this.GetAgentPositionV2();
      this.GetAgentList();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call

  }

  GetAgentPositionV2() {

    this._loadingReport = true;

    this.totalCBB = 0;
    this.totalCFB = 0;
    this.totalESOC = 0;
    this.totalMLB = 0;
    this.totalMU = 0;
    this.totalNBA = 0;
    this.totalNFL = 0;
    this.totalNHL = 0;
    this.totalPROP = 0;
    this.totalRAC = 0;
    this.totalTNT = 0;
    this.totalSOC = 0;


    let t: RequestAgentPositionV2Dto = new RequestAgentPositionV2Dto();

    t.AllGames = 0;
    t.EndDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate; //this._dateRange.End;
    t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate; //this._dateRange.Start;
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.Leagues = "";
    t.RotName = this.rotationNumber;
    t.ShowFutures = this._checkFuture == true? 1 : 0;
    t.Sport = this.sportSelected;


    //console.log(t);

    this._reportService
      .GetReportAgentPositionV2(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._ListResultAgentPosition = data;
        //  console.log(this._ListResultAgentPosition);

          let ListCBB = this._ListResultAgentPosition.filter(x => x.IdSport == 'CBB');
          let ListCFB = this._ListResultAgentPosition.filter(x => x.IdSport == 'CFB');
          let ListESOC = this._ListResultAgentPosition.filter(x => x.IdSport == 'ESOC');
          let ListMLB = this._ListResultAgentPosition.filter(x => x.IdSport == 'MLB');
          let ListMU = this._ListResultAgentPosition.filter(x => x.IdSport == 'MU');
          let ListNBA = this._ListResultAgentPosition.filter(x => x.IdSport == 'NBA');
          let ListNFL = this._ListResultAgentPosition.filter(x => x.IdSport == 'NFL');
          let ListNHL = this._ListResultAgentPosition.filter(x => x.IdSport == 'NHL');
          let ListPROP = this._ListResultAgentPosition.filter(x => x.IdSport == 'PROP');
          let ListRAC = this._ListResultAgentPosition.filter(x => x.IdSport == 'RAC');
          let ListTNT = this._ListResultAgentPosition.filter(x => x.IdSport == 'TNT');
          let ListSOC = this._ListResultAgentPosition.filter(x => x.IdSport == 'SOC');

          ListCBB.forEach(e => {
            this.totalCBB += e.VSpread != null ? e.VSpread : 0;
            this.totalCBB += e.HSpread != null ? e.HSpread : 0;
            this.totalCBB += e.VTotal != null ? e.VTotal : 0;
            this.totalCBB += e.HTotal != null ? e.HTotal : 0;
            this.totalCBB += e.VLine != null ? e.VLine : 0;
            this.totalCBB += e.HLine != null ? e.HLine : 0;
            this.totalCBB += e.VAmeric != null ? e.VAmeric : 0;
            this.totalCBB += e.HAmeric != null ? e.HAmeric : 0;
            this.totalCBB += e.Draw != null ? e.Draw : 0;
          });

          ListCFB.forEach(e => {
            this.totalCFB += e.VSpread != null ? e.VSpread : 0;
            this.totalCFB += e.HSpread != null ? e.HSpread : 0;
            this.totalCFB += e.VTotal != null ? e.VTotal : 0;
            this.totalCFB += e.HTotal != null ? e.HTotal : 0;
            this.totalCFB += e.VLine != null ? e.VLine : 0;
            this.totalCFB += e.HLine != null ? e.HLine : 0;
            this.totalCFB += e.VAmeric != null ? e.VAmeric : 0;
            this.totalCFB += e.HAmeric != null ? e.HAmeric : 0;
            this.totalCFB += e.Draw != null ? e.Draw : 0;
          });

          ListESOC.forEach(e => {
            this.totalESOC += e.VSpread != null ? e.VSpread : 0;
            this.totalESOC += e.HSpread != null ? e.HSpread : 0;
            this.totalESOC += e.VTotal != null ? e.VTotal : 0;
            this.totalESOC += e.HTotal != null ? e.HTotal : 0;
            this.totalESOC += e.VLine != null ? e.VLine : 0;
            this.totalESOC += e.HLine != null ? e.HLine : 0;
            this.totalESOC += e.VAmeric != null ? e.VAmeric : 0;
            this.totalESOC += e.HAmeric != null ? e.HAmeric : 0;
            this.totalESOC += e.Draw != null ? e.Draw : 0;
          });

          ListMLB.forEach(e => {
            this.totalMLB += e.VSpread != null ? e.VSpread : 0;
            this.totalMLB += e.HSpread != null ? e.HSpread : 0;
            this.totalMLB += e.VTotal != null ? e.VTotal : 0;
            this.totalMLB += e.HTotal != null ? e.HTotal : 0;
            this.totalMLB += e.VLine != null ? e.VLine : 0;
            this.totalMLB += e.HLine != null ? e.HLine : 0;
            this.totalMLB += e.VAmeric != null ? e.VAmeric : 0;
            this.totalMLB += e.HAmeric != null ? e.HAmeric : 0;
            this.totalMLB += e.Draw != null ? e.Draw : 0;
          });

          ListMU.forEach(e => {
            this.totalMU += e.VSpread != null ? e.VSpread : 0;
            this.totalMU += e.HSpread != null ? e.HSpread : 0;
            this.totalMU += e.VTotal != null ? e.VTotal : 0;
            this.totalMU += e.HTotal != null ? e.HTotal : 0;
            this.totalMU += e.VLine != null ? e.VLine : 0;
            this.totalMU += e.HLine != null ? e.HLine : 0;
            this.totalMU += e.VAmeric != null ? e.VAmeric : 0;
            this.totalMU += e.HAmeric != null ? e.HAmeric : 0;
            this.totalMU += e.Draw != null ? e.Draw : 0;
          });

          ListNBA.forEach(e => {
            this.totalNBA += e.VSpread != null ? e.VSpread : 0;
            this.totalNBA += e.HSpread != null ? e.HSpread : 0;
            this.totalNBA += e.VTotal != null ? e.VTotal : 0;
            this.totalNBA += e.HTotal != null ? e.HTotal : 0;
            this.totalNBA += e.VLine != null ? e.VLine : 0;
            this.totalNBA += e.HLine != null ? e.HLine : 0;
            this.totalNBA += e.VAmeric != null ? e.VAmeric : 0;
            this.totalNBA += e.HAmeric != null ? e.HAmeric : 0;
            this.totalNBA += e.Draw != null ? e.Draw : 0;
          });

          ListNFL.forEach(e => {
            this.totalNFL += e.VSpread != null ? e.VSpread : 0;
            this.totalNFL += e.HSpread != null ? e.HSpread : 0;
            this.totalNFL += e.VTotal != null ? e.VTotal : 0;
            this.totalNFL += e.HTotal != null ? e.HTotal : 0;
            this.totalNFL += e.VLine != null ? e.VLine : 0;
            this.totalNFL += e.HLine != null ? e.HLine : 0;
            this.totalNFL += e.VAmeric != null ? e.VAmeric : 0;
            this.totalNFL += e.HAmeric != null ? e.HAmeric : 0;
            this.totalNFL += e.Draw != null ? e.Draw : 0;
          });

          ListNHL.forEach(e => {
            this.totalNHL += e.VSpread != null ? e.VSpread : 0;
            this.totalNHL += e.HSpread != null ? e.HSpread : 0;
            this.totalNHL += e.VTotal != null ? e.VTotal : 0;
            this.totalNHL += e.HTotal != null ? e.HTotal : 0;
            this.totalNHL += e.VLine != null ? e.VLine : 0;
            this.totalNHL += e.HLine != null ? e.HLine : 0;
            this.totalNHL += e.VAmeric != null ? e.VAmeric : 0;
            this.totalNHL += e.HAmeric != null ? e.HAmeric : 0;
            this.totalNHL += e.Draw != null ? e.Draw : 0;
          });

          ListPROP.forEach(e => {
            this.totalPROP += e.VSpread != null ? e.VSpread : 0;
            this.totalPROP += e.HSpread != null ? e.HSpread : 0;
            this.totalPROP += e.VTotal != null ? e.VTotal : 0;
            this.totalPROP += e.HTotal != null ? e.HTotal : 0;
            this.totalPROP += e.VLine != null ? e.VLine : 0;
            this.totalPROP += e.HLine != null ? e.HLine : 0;
            this.totalPROP += e.VAmeric != null ? e.VAmeric : 0;
            this.totalPROP += e.HAmeric != null ? e.HAmeric : 0;
            this.totalPROP += e.Draw != null ? e.Draw : 0;
          });

          ListRAC.forEach(e => {
            this.totalRAC += e.VSpread != null ? e.VSpread : 0;
            this.totalRAC += e.HSpread != null ? e.HSpread : 0;
            this.totalRAC += e.VTotal != null ? e.VTotal : 0;
            this.totalRAC += e.HTotal != null ? e.HTotal : 0;
            this.totalRAC += e.VLine != null ? e.VLine : 0;
            this.totalRAC += e.HLine != null ? e.HLine : 0;
            this.totalRAC += e.VAmeric != null ? e.VAmeric : 0;
            this.totalRAC += e.HAmeric != null ? e.HAmeric : 0;
            this.totalRAC += e.Draw != null ? e.Draw : 0;
          });

          ListTNT.forEach(e => {
            this.totalTNT += e.VSpread != null ? e.VSpread : 0;
            this.totalTNT += e.HSpread != null ? e.HSpread : 0;
            this.totalTNT += e.VTotal != null ? e.VTotal : 0;
            this.totalTNT += e.HTotal != null ? e.HTotal : 0;
            this.totalTNT += e.VLine != null ? e.VLine : 0;
            this.totalTNT += e.HLine != null ? e.HLine : 0;
            this.totalTNT += e.VAmeric != null ? e.VAmeric : 0;
            this.totalTNT += e.HAmeric != null ? e.HAmeric : 0;
            this.totalTNT += e.Draw != null ? e.Draw : 0;
          });

          ListSOC.forEach(e => {
            this.totalSOC += e.VSpread != null ? e.VSpread : 0;
            this.totalSOC += e.HSpread != null ? e.HSpread : 0;
            this.totalSOC += e.VTotal != null ? e.VTotal : 0;
            this.totalSOC += e.HTotal != null ? e.HTotal : 0;
            this.totalSOC += e.VLine != null ? e.VLine : 0;
            this.totalSOC += e.HLine != null ? e.HLine : 0;
            this.totalSOC += e.VAmeric != null ? e.VAmeric : 0;
            this.totalSOC += e.HAmeric != null ? e.HAmeric : 0;
            this.totalSOC += e.Draw != null ? e.Draw : 0;
          });
          //console.log(data);
          this._loadingReport = false;
        },
        (error) => { this._loadingReport = false; }
      );
  } //end submit form

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

  GetAgentPositionDetail(IdGame: number) {

    this._loadingReport = true;

    let t: RequestAgentPositionDetail = new RequestAgentPositionDetail();

    t.EndDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;//this._ResultAgentPosition.StartDate;
    t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;//this._ResultAgentPosition.EndDate;
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.IdGame = Number(IdGame);
    t.IdCurrency = 0;

    this.totalWager = 0;
    this.totalWin = 0;
    this.totalRisk = 0;

    this._reportService
      .GetAgentPositionDetails(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.posDetailsObj = data;
          this.dtTrigger.next(null);
          this._displayPositionDetailData = true;
          console.log(this.posDetailsObj);
          // this.posDetailsObj.ListDetail.forEach(e => {
          //   this.totalWager += Number(e._wageramount);
          //   this.totalWin += Number(e._winamount);
          //   this.totalRisk += Number(e._riskamount);
          // });
           this._loadingReport = false;

        },
        (error) => { this._loadingReport = false; }
      );
  } //end submit form

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
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

  sportChange(){
    this.GetAgentPositionV2();
  }

  sportChangeByPagination(sport: string){
    this.sportSelected = sport;
    this.GetAgentPositionV2();
  }

  HideDialog(){
    this.dtTrigger.unsubscribe();
    this.dtTrigger = new Subject();
  }

  ClearRotation(){
    this.rotationNumber = "";
    this.GetAgentPositionV2();
  }

  calculateClasses(value:number): string
  {
    //console.log(value);

    if(Number(value) > 0)
        return "NumPositive";
    else if(Number(value) < 0)
      return "NumNegative";
    else
      return "NumZero";
  }

  getClassActiveItem(sport: string): string
  {
    if(sport == this.sportSelected)
    return 'page-item active';
    else
    return 'page-item';
  }

  getModalAgentPositionDetail(Gameselected: number)
  {
    let t: RequestAgentPositionDetail = new RequestAgentPositionDetail();

    t.EndDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].SunDate;//this._ResultAgentPosition.StartDate;
    t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;//this._ResultAgentPosition.EndDate;
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.IdGame = Number(Gameselected);
    t.IdCurrency = 0;

    this.totalWager = 0;
    this.totalWin = 0;
    this.totalRisk = 0;

    this._reportService
      .GetAgentPositionDetails(t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.posDetailsObj = data;
          //this.dtTrigger.next();
          //this._displayPositionDetailData = true;
         // console.log(this.posDetailsObj);
          this.posDetailsObj.ListDetail.forEach(e => {
            this.totalWager += Number(e._wageramount);
            this.totalWin += Number(e._winamount);
            this.totalRisk += Number(e._riskamount);
          });
           this._loadingReport = false;

        },
        (error) => { this._loadingReport = false; }
      );

      this.displayModalPositionDetail=true;
  }

}//end component
