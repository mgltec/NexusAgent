
import { Component,OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestPlayerActivity } from 'src/app/Models/RpModels';
import {
        WeekRangeDto,
        AgentSessionDto,
        GetIPLoginDto,
        DuplicateIpDto,
      } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-IpReport',
  templateUrl: './IpReport.component.html',
  styleUrls: ['./IpReport.component.css']
})
export class IpReportComponent implements OnInit, OnDestroy {

  public _unsubscribeAll: Subject<any>;
  public display: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentSelected: string = '';
  public currentDate : string = '';
  public reportData: GetIPLoginDto[] = [];
  public duplicateData: DuplicateIpDto[] = [];
  public CurrencyList: any[] = [];
  public _loadingReport: boolean = false;
  public i : number = 0;

  public fechaAyer: Date = new Date();
  public fechahoy: Date = new Date();
  public _dateFromSelected!: string;
  public _dateEndSelected!: string;

  public _CurrencySelected : string= '1';

  dtOptions: any = {};

  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
  ) {
    this._unsubscribeAll = new Subject();

    this.fechaAyer.setDate(this.fechaAyer.getDate() - 1);

    var year = this.fechaAyer.getFullYear();
    var month = this.fechaAyer.getMonth() + 1;
    var day = this.fechaAyer.getDate();
    this._dateFromSelected = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;


    var yearH = this.fechahoy.getFullYear();
    var monthH = this.fechahoy.getMonth() + 1;
    var dayH = this.fechahoy.getDate();
    this._dateEndSelected = `${yearH}-${monthH < 10 ? '0' + monthH : monthH}-${dayH < 10 ? '0' + dayH : dayH}`;

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
          {extend: 'copy', footer: true, className: 'pi pi-copy', text: '',title:'Agent Gross Week'} ,
          {extend: 'print', footer: true, className: 'pi pi-print', text: '',title:'Agent Gross Week'} ,
          {extend: 'excel', footer: true, className: 'pi pi-file-excel', text: '',title:'Agent Gross Week',filename: 'Agent Gross Week '+ this._currentUser.AgentSelected } ,
          {extend: 'pdf'},
          {extend: 'pdfHtml5'},
        ],

      };
      /*************************END DATATABLE OPTIONS*************************************** */
      // this.GetWeekRange();
      // this.GetCurrency();
      this.GetReport();
      this.GetDuplicateIps();
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

 



  GetReport() {

    this._loadingReport = true;

    let a : RequestPlayerActivity = new RequestPlayerActivity();
    a.IdAgent = this._currentUser.IdAgentSelected;
    a.StartDate = this._dateFromSelected;
    a.EndDate = this._dateEndSelected;


    this._reportService.GetPlayersLoginIpData(this._currentUser, a).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        this.reportData = data;

        this.reportData.forEach(agents => {

          agents.Players.forEach(player => {

            this._reportService.GetIpServiceInfo(player.Ip).pipe(takeUntil(this._unsubscribeAll)).subscribe({
              next: (dataIp) => {
                

                console.log("IP info", dataIp);

                player.Country = dataIp;
                
              },
              error: (err) => {
                //this._loadingReport = false;
              },
              complete: () => {
               // this._loadingReport = false;
              }
        
            });
            
          });


          



        });


      },
      error: (err) => {
        this._loadingReport = false;
      },
      complete: () => {
        this._loadingReport = false;
      }

    });

  }//end report method


  GetDuplicateIps() {

    this._loadingReport = true;

    let a : RequestPlayerActivity = new RequestPlayerActivity();
    a.IdAgent = this._currentUser.IdAgentSelected;
    a.StartDate = this._dateFromSelected;
    a.EndDate = this._dateEndSelected;


    this._reportService.GetDuplicateIps(this._currentUser, a).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        this.duplicateData = data;
      },
      error: (err) => {
        this._loadingReport = false;
      },
      complete: () => {
        this._loadingReport = false;
      }

    });

  }//end report method





}




