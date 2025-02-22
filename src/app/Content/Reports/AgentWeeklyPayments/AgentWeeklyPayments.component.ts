import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentListModel, AgentDistributionRequest, AgentSessionDto,RequestPlayerListModel,WeekRangeDto, AgentWeeklyPaymentsResponseDTO } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { WeeklyPaymentsRequestDto } from 'src/app/Models/RpModels';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';



@Component({
  selector: 'app-AgentWeeklyPayments',
  templateUrl: './AgentWeeklyPayments.component.html',
  styleUrls: ['./AgentWeeklyPayments.component.scss']
})

export class AgentWeeklyPaymentsComponent implements OnInit, OnDestroy {
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
  public reportData: AgentWeeklyPaymentsResponseDTO[] = [];
  public _loadingReport: boolean = false;
  public _CurrencySelected : string= '1';
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public Day1Total: number = 0;
  public Day2Total: number = 0;
  public Day3Total: number = 0;
  public Day4Total: number = 0;
  public Day5Total: number = 0;
  public Day6Total: number = 0;
  public Day7Total: number = 0;

  public columns: IResponsiveTableColumn[] = [
    {
      key: "Player",
      title: "Player",
      frozen: true,
      totalsLabel: "Total"
    },
    {
      key: "Day1",
      title: "Day1",
      totalsValue: (_) => this.Day1Total,
      ...NUMERIC_COLUMN
    },
    {
      key: "Day2",
      title: "Day2",
      totalsValue: (_) => this.Day2Total,
      ...NUMERIC_COLUMN
    },
    {
      key: "Day3",
      title: "Day3",
      totalsValue: (_) => this.Day3Total,
      ...NUMERIC_COLUMN
    },
    {
      key: "Day4",
      title: "Day4",
      totalsValue: (_) => this.Day4Total,
      ...NUMERIC_COLUMN
    },
    {
      key: "Day5",
      title: "Day5",
      totalsValue: (_) => this.Day5Total,
      ...NUMERIC_COLUMN
    },
    {
      key: "Day6",
      title: "Day6",
      totalsValue: (_) => this.Day6Total,
      ...NUMERIC_COLUMN
    },
    {
      key: "Day7",
      title: "Day7",
      totalsValue: (_) => this.Day7Total,
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
          responsive: true,
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

       this.GetWeekRange();
       this.GetCurrency();
       //this.GetReport();

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
    var t: WeeklyPaymentsRequestDto = new WeeklyPaymentsRequestDto();
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.DateWeek = this._dateRange.Start;


    this._reportService.GetAgentWeeklyPayment(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) =>{
        this.reportData = data;
        console.log('data====>', this.reportData);

        this.Day1Total = this.reportData.reduce((acc, obj) => acc + obj.Day1, 0);
        console.log('TOTAL DAY1 =====>', this.Day1Total)
        this.Day2Total = this.reportData.reduce((acc, obj) => acc + obj.Day2, 0);
        this.Day3Total = this.reportData.reduce((acc, obj) => acc + obj.Day3, 0);
        this.Day4Total = this.reportData.reduce((acc, obj) => acc + obj.Day4, 0);
        this.Day5Total = this.reportData.reduce((acc, obj) => acc + obj.Day5, 0);
        this.Day6Total = this.reportData.reduce((acc, obj) => acc + obj.Day6, 0);
        this.Day7Total = this.reportData.reduce((acc, obj) => acc + obj.Day7, 0);
      },
      error: (err) => {
    
      },
      complete: () => {
   
      }

    });

  }

  hideFilters()
  {
    this._DataService.methodShowFilters(false);
   }


}

