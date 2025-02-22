import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentListModel, AgentSessionDto,AgentRedFigureRequest } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';


@Component({
  selector: 'app-AgentRedFigure',
  templateUrl: './AgentRedFigure.component.html',
  styleUrls: ['./AgentRedFigure.component.scss']
})
export class AgentRedFigureComponent implements OnInit {
  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentSelected: string = '';
  public agentList: any[] = [];
  public weekSelected: number = 1;
  public weekList: any[] = [];
  public week: any;
  public reportData: any[] = [];
  public _loadingReport: boolean = false;

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
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Red Figure'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Red Figure'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Red Figure',filename: 'Agent Red Figure '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */

   this.GetAgentList();
   this.GetWeeks();


  }); //end dataservice call

  this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
    this.display = data;
  }); //end dataservice call

  }

  GetAgentList() {

    let info: AgentListModel = new AgentListModel();

    info.idAgent = this._currentUser.IdAgentSelected;
    info.agent = this._currentUser.AgentSelected;
    this._reportService.GetAgentsList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.agentList = data['List'];
      }, error => {

      });
  }

  GetWeeks() {
    this._reportService
      .GetWeeks(this._currentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.weekList = data;
          this.GetReport();
        },
        (error) => { }
      );
  }
  GetReport() {

    this._loadingReport = true;
    let info: AgentRedFigureRequest = new AgentRedFigureRequest();

    if (this.agentSelected == '') {
      info.IdAgent = this._currentUser.IdAgentSelected;
    }
    else {
      info.IdAgent = parseInt(this.agentSelected);
    }

    this.week = this.weekList[this.weekSelected];
    info.Week = this.week.MonDate;



    this._reportService.GetAgentRedFigure(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.reportData = data;
        this._loadingReport = false;
      }, error => {  this._loadingReport = false;
      });

  }

  hideFilters()
  {
    this._DataService.methodShowFilters(false);
   }

}
