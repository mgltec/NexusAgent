import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentSessionDto } from 'src/app/Models/models';
import { RequestAgentWeeklyBalance } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-Summary',
  templateUrl: './Summary.component.html',
  styleUrls: ['./Summary.component.css']
})
export class SummaryComponent implements OnInit {


  public display: boolean = false
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentList: any[] = [];
  public _loadingReport: boolean = false;
  public _dataSummaryReport: any;


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
      //  this.GetAgentWeekly();
      //  this.GetAgentList();
      this.GetSummaryReport();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call

  }//end OnInit


  GetSummaryReport() {
    this._loadingReport = true;

    let t: RequestAgentWeeklyBalance = new RequestAgentWeeklyBalance();

    t.Agent = this._currentUser.AgentSelected;
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    t.IsDistributor = "true";
    t.TransactionType = -1;
    t.AgentDisplayHistory = true;
    t.IdCurrency = 0;


    this._reportService.GetSummaryReport(this._currentUser, t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this._dataSummaryReport = data;
        console.log(this._dataSummaryReport);
        this._loadingReport = false;
      }, error => {
        this._loadingReport = false;
      });
  }

  calculateClasses(value: number): string {
    if (Number(value) > 0)
      return "NumPositive";
    else if (Number(value) < 0)
      return "NumNegative";
    else
      return "NumZero";
  }



}//end componente
