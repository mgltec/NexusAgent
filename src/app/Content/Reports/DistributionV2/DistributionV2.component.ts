import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentListModel, AgentSessionDto } from 'src/app/Models/models';
import { AgentDistDto, SuperAgentDistribution } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-DistributionV2',
  templateUrl: './DistributionV2.component.html',
  styleUrls: ['./DistributionV2.component.css']
})
export class DistributionV2Component implements OnInit, OnDestroy {


  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public loadingReport: boolean = false;
  public ReportData: SuperAgentDistribution = new SuperAgentDistribution();
  public display: boolean = false;
  public agentSelected: any;
  public agentList: any[] = [];

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

    // this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
    //   this._currentUser = ServiceUserInformation;
    //   if (this._currentUser.Master == null) {
    //     if (localStorage.getItem('agentInfo') != null) {
    //       this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
    //     }
    //   }
    //   this.GetAgentDistribution();
    //   this.GetAgentList();

    // }); //end dataservice call

    // this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
    //   this.display = data;
    // }); //end dataservice call

  }//end OnInit


  GetAgentDistribution() {
    this.loadingReport = true;

    // if (this._currentUser.IdAgentSelected == 25759) {
    //   // this._reportService.GetAgentDistributionV2(this._currentUser.IdAgentSelected, this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate)
    //   this._reportService.GetAgentDistributionV3Tangusma(this._currentUser.IdAgentSelected, this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate)
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(data => {
    //       this.ReportData = data;
    //       console.log(this.ReportData);
    //       this.loadingReport = false;
    //     }, error => {
    //       this.loadingReport = false;
    //     });
    // }
    // else {
    //   // this._reportService.GetAgentDistributionV2(this._currentUser.IdAgentSelected, this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate)
    //   this._reportService.GetAgentDistributionV3SubTangusma(this._currentUser.IdAgentSelected, this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate)
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(data => {
    //       this.ReportData = data;
    //       console.log(this.ReportData);
    //       this.loadingReport = false;
    //     }, error => {
    //       this.loadingReport = false;
    //     });
    // }
  }

  calculateClasses(value: number): string {
    if (Number(value) > 0)
      return "NumPositive";
    else if (Number(value) < 0)
      return "NumNegative";
    else
      return "NumZero";
  }

  calculateRowClass(value: number): string {
    if (Number(value) > 0)
      return "rowGreen";
    else if (Number(value) < 0)
      return "rowRed";
    else
      return "rowgray";
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


  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.ReportData.ListDistri);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Distribution");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}


  hideFilters() {
    this._DataService.methodShowFilters(false);
  }

}//end component
