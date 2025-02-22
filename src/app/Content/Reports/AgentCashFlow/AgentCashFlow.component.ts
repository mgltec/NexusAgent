import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentSessionDto, WeekRangeDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { RequestCashFlow } from 'src/app/Models/RpModels';
import { NUMERIC_COLUMN } from '../../ReusableComponents/responsive-table/responsive-table.utils';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { transformNumber } from 'src/app/Utils/number';

@Component({
  selector: 'app-AgentCashFlow',
  templateUrl: './AgentCashFlow.component.html',
  styleUrls: ['./AgentCashFlow.component.css']
})


export class AgentCashFlowComponent implements OnInit {
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
  public _TransactionTypeSelected : string= '0';
  public _dateRange: WeekRangeDto = new WeekRangeDto();

  public columns: IResponsiveTableColumn[] = [
    {
      key: "Player",
      title: "Player",
      frozen: true,
    },
    {
      key: "PlacedDate",
      title: "Placed",
    },
    {
      key: "PaymentMethod",
      title: "Payment Method",
    },
    {
      key: "Reference",
      title: "Reference",
    },
    {
      key: "Description",
      title: "Description",
    },
    {
      key: "Amount",
      title: "Amount",
      pipe: (value) => transformNumber(value, '1.2-2')
    },
    {
      key: "Fee",
      title: "Fee",
      pipe: (value) => transformNumber(value, '1.2-2')
    },
    {
      key: "Bonus",
      title: "Bonus",
      pipe: (value) => transformNumber(value, '1.2-2')
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
            fixedColumns: {
              left: 1,
            },      
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
  
      }); //end dataservice call
  
      this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
        this.display = data;
      }); //end dataservice call
  
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
      var t: RequestCashFlow = new RequestCashFlow();
      t.IdAgent = this._currentUser.IdAgentSelected;
      t.StartDate = this._dateRange.Start;
      t.EndDate = this._dateRange.End;
      t.TransactionType = Number(this._TransactionTypeSelected);
  
      this._reportService.GetCashFlow(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
        next: (data) =>{
          this.reportData = data;
          console.log('data====>', this.reportData);
       
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
