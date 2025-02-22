import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {AgentDto,
        WeekRangeDto,
        AgentListModel,
        AgentSessionDto,
        RequestPlayerListModel,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';


@Component({
  selector: 'app-PlayerActivity',
  templateUrl: './PlayerActivity.component.html',
  styleUrls: ['./PlayerActivity.component.css']
})
export class PlayerActivityComponent implements OnInit,OnDestroy {


  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public currentDate : string = '';
  public reportData: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;

  public SelectedActivity: string = '2';
  public SelectedAccess: string = '3';
  public SelectedSource: string = '3';
  public SelectedStatus: string = '2';

  dtOptions: any = {};

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
        /****************************DATATABLE OPTIONS*************************************** */
      this.dtOptions = {
        paging: false,
        ordering: true,
        dom: 'Bfrtip',
        buttons: [
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Player Activity'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Player Activity'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Player Activity',filename: 'Player Activity '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      this.GetWeekRange();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call
  }

  hideFilters()
  {
    this._DataService.methodShowFilters(false);
  }



  GetWeekRange() {
    this._reportService
      .GetWeekRange()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._dateRange = data;
          this.GetReport();
        },
        (error) => { }
      );
  } //end submit form



  GetReport() {


  }

}
