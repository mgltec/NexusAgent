import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentListModel, AgentDistributionRequest, AgentSessionDto,RequestPlayerListModel,WeekRangeDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';


@Component({
  selector: 'app-AgentWagerListing',
  templateUrl: './AgentWagerListing.component.html',
  styleUrls: ['./AgentWagerListing.component.scss']
})

export class AgentWagerListingComponent implements OnInit, OnDestroy {
  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentSelected: string = '';
  public agentList: any[] = [];
  public playerSelected: string = '-1';
  public playerList: any[] = [];
  public weekSelected: number = 1;
  public weekList: any[] = [];
  public CurrencyList: any[] = [];
  public week: any;
  public reportData: any[] = [];
  public _loadingReport: boolean = false;
  public _CurrencySelected : string= '1';
  public _dateRange: WeekRangeDto = new WeekRangeDto();

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
            {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Distribution'} ,
            {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Distribution'} ,
            {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Distribution',filename: 'Agent Distribution '+ this._currentUser.AgentSelected } ,
            {extend: 'pdf'},
            {extend: 'pdfHtml5'},
          ],

        };
        /*************************END DATATABLE OPTIONS*************************************** */

     this.GetAgentList();
     this.GetWeekRange();
     this.GetCurrency();

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

  GetPlayerList() {

    let info: RequestPlayerListModel = new RequestPlayerListModel();

    if (this.agentSelected == '' || this.agentSelected == undefined) {
      info.idAgent = this._currentUser.IdAgentSelected;
    }
    else {
      info.idAgent = parseInt(this.agentSelected);
    }

    this._reportService.GetPlayerList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.playerList = data;
      }, error => {

      });
      this.playerSelected='-1'
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

  GetCurrency() {
    this._reportService
      .GetCurrency()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.CurrencyList = data;
          this.GetReport();
        },
        (error) => { }
      );
  } //end submit form


  GetReport() {


  }

  hideFilters()
  {
    this._DataService.methodShowFilters(false);
   }


}

