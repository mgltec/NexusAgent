import { DecimalPipe, formatDate } from '@angular/common';
import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {AgentDto,
        WeekRangeDto,
        AgentListModel,
        AgentSessionDto,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { AgentPlayerAdjustmentRequestDTO } from 'src/app/Models/RpModels';
import { IResponsiveTableColumn } from '../../ReusableComponents/responsive-table/responsive-table.types';
import { transformNumber } from 'src/app/Utils/number';

@Component({
  selector: 'app-AgentAdjustment',
  templateUrl: './AgentAdjustment.component.html',
  styleUrls: ['./AgentAdjustment.component.css']
})
export class AgentAdjustmentComponent implements OnInit,OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _dateRange: WeekRangeDto = new WeekRangeDto();
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportData: any[] = [];
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;
  public TotalAdjustment: number = 0;

  public _CurrencySelected : string= '1';
  
  public columns: IResponsiveTableColumn[] = [
    {
      key: "Date",
      title: "Date",
      frozen: true,
      totalsLabel: "Total Adjustment:"
    },
    {
      key: "Reference",
      title: "Reference"
    },
    {
      key: "Type",
      title: "Type"
    },
    {
      key: "Description",
      title: "Description"
    },
    {
      key: "User",
      title: "User"
    },
    {
      key: "PlacedDate",
      title: "Placed Date"
    },
    {
      key: "Amount",
      title: "Amount",
      pipe: (value) => transformNumber(value, '1.2-2'),
      totalsKey: "Total"
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
        buttons: [
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Adjustment'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Adjustment'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Adjustment',filename: 'Agent Adjustment '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      this.GetWeekRange();
      this.GetCurrency();
    // this.GetWeeks();
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

    var t: AgentPlayerAdjustmentRequestDTO = new AgentPlayerAdjustmentRequestDTO();
    t.IdAgent = this._currentUser.IdAgentSelected;
    t.StartDate = this._dateRange.Start;
    t.EndDate = this._dateRange.End;


    this._reportService.GetAgentPlayerAdjustment(this._currentUser, t).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) =>{
        this.reportData = data;
        console.log('data====>', this.reportData);

        this.TotalAdjustment = this.reportData.reduce((acc, obj) => acc + obj.Amount, 0);
        
      },
      error: (err) => {
    
      },
      complete: () => {
   
      }

    });

  }


}


