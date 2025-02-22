import { getLocaleDateFormat } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { AgentDto, WeekRangeDto, AgentListModel, RequestPlayerListModel,AgentSessionDto, ScoresHistoryRequest } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-ScoresHistory',
  templateUrl: './ScoresHistory.component.html',
  styleUrls: ['./ScoresHistory.component.scss']
})
export class ScoresHistoryComponent implements OnInit {
  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  currentDate = new Date();
  public date :string  =  '';
  public sportSelected: string = '';
  public reportData: any[] = [];
  public _loadingReport: boolean = false;

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

    }); //end dataservice call

      this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
        this.display = data;
      }); //end dataservice call

     // console.log(this.date);
  }



  GetReport(){
    this._loadingReport = true;
    let info: ScoresHistoryRequest = new ScoresHistoryRequest();
    info.Date =  this.date;
    info.IdSport = this.sportSelected;

    this._reportService.GetScoreHistory(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.reportData = data;
      //  console.log(data);
        this._loadingReport = false;
      }, error => {  this._loadingReport = false;
      });
  }


  hideFilters(){
  this._DataService.methodShowFilters(false);
  }

}
