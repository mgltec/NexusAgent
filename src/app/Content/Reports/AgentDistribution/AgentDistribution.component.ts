import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentListModel, AgentDistributionRequest, AgentSessionDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { NUMERIC_COLUMN, calculateClasses } from '../../ReusableComponents/responsive-table/responsive-table.utils';
import { transformNumber } from 'src/app/Utils/number';


@Component({
  selector: 'app-AgentDistribution',
  templateUrl: './AgentDistribution.component.html',
  styleUrls: ['./AgentDistribution.component.scss']
})

export class AgentDistributionComponent implements OnInit, OnDestroy {
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

  public columns: IResponsiveTableColumn[] = [
    {
      key: "_agent",
      title: "AGENT",
      frozen: true,
    },
    {
      key: "_agenttype",
      title: "TYPE / PERCENTAGE",
    },
    {
      key: "_makeup",
      title: "OLD MAKE UP",
      ...NUMERIC_COLUMN
    },
    {
      key: "_totaltransaction",
      title: "WON / LOSS",
      ...NUMERIC_COLUMN
    },
    {
      value: (item) => (item._distweek < 0 ? -1*((item._totalmoneycomm / 100) * item._distweek) : (0)),
      title: "COMMISION",
      classes: (_, item) => calculateClasses(item._totalmoneycomm),
      pipe: (value) => transformNumber(value, '1.2-2')
    },
    {
      key: "_distweek",
      title: "DISTRIBUTION",
      ...NUMERIC_COLUMN
    },
    {
      key: "_newmakeup",
      title: "NEW MAKE UP",
      ...NUMERIC_COLUMN
    },
    {
      key: "_prevbalance",
      title: "BEGINNING OF WEEK",
      ...NUMERIC_COLUMN
    },
    {
      key: "_newbalance",
      title: "END OF WEEK",
      ...NUMERIC_COLUMN
    },
  ]

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
          responsive: true,
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
     this.GetWeeks();


    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call

  }

  calculateClasses(value: number): string {
    if (Number(value) > 0) return 'NumPositive';
    else if (Number(value) < 0) return 'NumNegative';
    else return 'NumZero';
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
    let info: AgentDistributionRequest = new AgentDistributionRequest();

    if (this.agentSelected == '') {
      info.prmIdAgent = this._currentUser.IdAgentSelected;
      info.prmAgent = this._currentUser.AgentSelected;
    }
    else {
      info.prmIdAgent = parseInt(this.agentSelected);
      info.prmAgent = this._currentUser.AgentSelected;
    }

    this.week = this.weekList[this.weekSelected];
    info.prmStartDate = this.week.SunDate;

    info.prmIsDetail = false;
    info.prmIdCurrency = '1';

    this._reportService.GetAgentDistribution(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.reportData = data['ListDetail'];
        this._loadingReport = false;
      }, error => {  this._loadingReport = false;
      });


  }

  getLine(rep: any) {
    console.log("_totalmoneycomm", rep._totalmoneycomm)
    console.log("_distweek", rep._distweek)
    console.log(rep._totalmoneycomm < 0 ? ((rep._totalmoneycomm / 100) * rep._distweek) : (0))
    return rep._totalmoneycomm < 0 ? ((rep._totalmoneycomm / 100) * rep._distweek) : (0)
  }

  hideFilters()
  {
    this._DataService.methodShowFilters(false);
   }


}
