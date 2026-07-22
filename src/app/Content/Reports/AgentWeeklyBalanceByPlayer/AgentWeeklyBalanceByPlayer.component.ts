import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/ui/prime-shim';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AgentSessionDto } from 'src/app/Models/models';
import { ReportWeeklyBalance, RequestAgentWeeklyBalance } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  standalone: false,
  selector: 'app-AgentWeeklyBalanceByPlayer',
  templateUrl: './AgentWeeklyBalanceByPlayer.component.html',
  styleUrls: ['./AgentWeeklyBalanceByPlayer.component.css']
})
export class AgentWeeklyBalanceByPlayerComponent implements OnInit {


  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public display: boolean = false
  public _agentReport: string = "";
  public _dataReportWeeklyBalance: ReportWeeklyBalance = new ReportWeeklyBalance();
  public _FiltereddataReportWeeklyBalance: ReportWeeklyBalance = new ReportWeeklyBalance();
  public _TotalPrev: number = 0;
  public _TotalMon: number = 0;
  public _TotalTue: number = 0;
  public _TotalWed: number = 0;
  public _TotalThu: number = 0;
  public _TotalFri: number = 0;
  public _TotalSat: number = 0;
  public _TotalSun: number = 0;
  public _TotalThisWeek: number = 0;
  public _TotaPayM: number = 0;
  public _TotalNewBal: number = 0;
  public _TotalAtRisk: number = 0;
  public _TotalAvail: number = 0;
  public _loadingReport: boolean = false;
  public businessUnitSelected: string = "-1";
  public customLoadingTemplate: boolean = false;
  
  // Pagination variables
  public currentPage: number = 0;
  public totalPages: number = 0;
  public rowsPerPage: number = 15;

  constructor(
    private route: ActivatedRoute,
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService,
  ) {

    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // Get agent from query params - NOT USED for filtering anymore, just for reference
    this._agentReport = this.route.snapshot.queryParamMap.get('agent') || '';
    console.log('📌 Query param agent:', this._agentReport);
    console.log('   Note: This is NOT used for filtering, shows all agents from the API');

    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
        }
      }
      this.GetAgentWeekly();

    }); //end dataservice call

    this._DataService.ShowFilters.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.display = data;
    }); //end dataservice call


  }//end method

  GetAgentWeekly() {

    this._loadingReport = true;

    this._TotalPrev = 0;
    this._TotalMon = 0;
    this._TotalTue = 0;
    this._TotalWed = 0;
    this._TotalThu = 0;
    this._TotalFri = 0;
    this._TotalSat = 0;
    this._TotalSun = 0;
    this._TotalThisWeek = 0;
    this._TotalNewBal = 0;
    this._TotalAtRisk = 0;
    this._TotalAvail = 0;

    let t: RequestAgentWeeklyBalance = new RequestAgentWeeklyBalance();

      t.Agent = this._currentUser.Master.Agent;
      t.IdAgent = this._currentUser.Master.IdAgent;
      t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
      t.IsDistributor = "true";
      t.TransactionType = Number(this.businessUnitSelected);
      t.AgentDisplayHistory = true;
      t.IdCurrency = 0;

    this._reportService
      .GetWeeklyBalanceByAgentLevelZero(t)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => (this._loadingReport = false))
      )
      .subscribe(
        (data) => {
          try {
          console.log('========== GetWeeklyBalanceStandarHistoryLevelZero Response ==========');
          console.log('Full Response:', data);
          console.log('Response Type:', typeof data);
          console.log('Response Keys:', data ? Object.keys(data) : 'No keys');
          console.log('Raw AgentList from API:', data?.AgentList);
          console.log('AgentList is Array?', Array.isArray(data?.AgentList));
          console.log('AgentList Length:', data?.AgentList?.length);
          console.log('First Agent (raw):', data?.AgentList?.[0]);
          
          // Log pagination info
          if (data?.AgentList?.[0]) {
            console.log('Pagination Info:');
            console.log('  CurrentPage:', data.AgentList[0].CurrentPage);
            console.log('  TotalPage:', data.AgentList[0].TotalPage);
            console.log('  RowPerPage:', data.AgentList[0].RowPerPage);
            console.log('  PlayerList Length:', data.AgentList[0].PlayerList?.length);
          }
          console.log('=======================================================================');

          // CRITICAL: Assign directly without using constructor to avoid data loss
          this._dataReportWeeklyBalance = data as ReportWeeklyBalance;
          
          console.log('After assignment:');
          console.log('  this._dataReportWeeklyBalance:', this._dataReportWeeklyBalance);
          console.log('  AgentList:', this._dataReportWeeklyBalance.AgentList);
          console.log('  AgentList Length:', this._dataReportWeeklyBalance.AgentList?.length);
          console.log('  AgentList[0]:', this._dataReportWeeklyBalance.AgentList?.[0]);
          console.log('  AgentList[0].PlayerList:', this._dataReportWeeklyBalance.AgentList?.[0]?.PlayerList);
          console.log('  AgentList[0].PlayerList.length:', this._dataReportWeeklyBalance.AgentList?.[0]?.PlayerList?.length);
          console.log('  AgentList[0].PlayerList[0]:', this._dataReportWeeklyBalance.AgentList?.[0]?.PlayerList?.[0]);
          
          // NO FILTER - Show all agents from the API response
          console.log('✅ No filtering applied - showing all agents from API');
           
          // Update pagination info AFTER filtering
          if (data?.AgentList?.[0]) {
            this.currentPage = data.AgentList[0].CurrentPage || 0;
            this.totalPages = data.AgentList[0].TotalPage || 0;
            this.rowsPerPage = data.AgentList[0].RowPerPage || 15;
            
            console.log('📄 Pagination Status:');
            console.log(`   Page ${this.currentPage + 1} of ${this.totalPages}`);
            console.log(`   Players on this page: ${data.AgentList[0].PlayerList?.length || 0}`);
            console.log(`   Component pagination values set:`);
            console.log(`     this.currentPage = ${this.currentPage}`);
            console.log(`     this.totalPages = ${this.totalPages}`);
            console.log(`     this.rowsPerPage = ${this.rowsPerPage}`);
            console.log(`     Will show pagination controls? ${this.totalPages > 1}`);
            
            // If PlayerList is empty but there are more pages, automatically load page 1
            if (data.AgentList[0].PlayerList?.length === 0 && this.totalPages > 1) {
              console.warn('⚠️ PlayerList is empty on page 0, but there are', this.totalPages, 'pages total.');
              console.warn('   🔄 Automatically loading page 1...');
              // Load the first page with data
              setTimeout(() => this.loadPage(1), 100);
            }
          }

          // Calculate totals
          console.log('🧮 Calculating totals for', this._dataReportWeeklyBalance.AgentList.length, 'agents');
          
          this._dataReportWeeklyBalance.AgentList.forEach((agent, index) => {
            console.log(`   Agent ${index + 1}:`, agent._Agent, 'Players:', agent.PlayerList?.length || 0);
            
            this._TotalPrev += Number(agent._BalFwd);
            this._TotalMon += Number(agent._WeekDay1);
            this._TotalTue += Number(agent._WeekDay2);
            this._TotalWed += Number(agent._WeekDay3);
            this._TotalThu += Number(agent._WeekDay4);
            this._TotalFri += Number(agent._WeekDay5);
            this._TotalSat += Number(agent._WeekDay6);
            this._TotalSun += Number(agent._WeekDay7);
            this._TotalThisWeek += Number(agent._ThisWeek);
            this._TotalNewBal += Number(agent._Balance);
            this._TotalAtRisk += Number(agent._TotalAtRisk);
            this._TotalAvail += Number(agent._TotalAvail);
          });

          console.log('✅ Data loaded successfully');
          console.log('   _dataReportWeeklyBalance.AgentList:', this._dataReportWeeklyBalance.AgentList);
          } catch (error) {
            console.error('AgentWeeklyBalanceByPlayer build error', error);
          }
        },
        (error) => {
          console.error('========== Error in GetWeeklyBalanceStandarHistoryLevelZero (ByPlayer) ==========');
          console.error('Error:', error);
          console.error('Error Message:', error?.message);
          console.error('Error Status:', error?.status);
          console.error('Error Details:', JSON.stringify(error, null, 2));
          console.error('=======================================================================');
        }
      );
  } //end submit form

  hideFilters() {
    this._DataService.methodShowFilters(false);
  }

  calculateClasses(value: number): string {
    //console.log(value);

    if (Number(value) > 0)
      return "NumPositive";
    else if (Number(value) < 0)
      return "NumNegative";
    else
      return "NumZero";
  }

  // TrackBy function for performance
  trackByPlayer(index: number, player: any): any {
    return player._IdPlayer || index;
  }

  businessUnitChange() {

    this.GetAgentWeekly();


    // if (this._agentReport != undefined)
    //   this.GetIdAgent(this._agentReport);
    // else {
    //   this.GetAgentWeekly(0, "");
    // }
  }

  onChangeDateSelection(event: any) {
    localStorage.setItem(
      "agentInfo",
      JSON.stringify(this._currentUser)
    );
    this._DataService.changeDataUserSession(this._currentUser);
  }

  // Pagination methods
  loadPage(pageNumber: number): void {
    if (pageNumber < 0 || pageNumber >= this.totalPages) {
      console.warn('Invalid page number:', pageNumber);
      return;
    }
    
    console.log('Loading page:', pageNumber + 1);
    this.currentPage = pageNumber;
    this.GetAgentWeeklyByPage(pageNumber);
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadPage(this.currentPage + 1);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1);
    }
  }

  goToFirstPage(): void {
    this.loadPage(0);
  }

  goToLastPage(): void {
    this.loadPage(this.totalPages - 1);
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 0;
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(0, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages - 1, startPage + maxPagesToShow - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  private GetAgentWeeklyByPage(page: number): void {
    this._loadingReport = true;

    let t: RequestAgentWeeklyBalance = new RequestAgentWeeklyBalance();
    t.Agent = this._currentUser.Master.Agent;
    t.IdAgent = this._currentUser.Master.IdAgent;
    t.StartDate = this._currentUser.WeekList[this._currentUser.RangeDateSelected].MonDate;
    t.IsDistributor = "true";
    t.TransactionType = Number(this.businessUnitSelected);
    t.AgentDisplayHistory = true;
    t.IdCurrency = 0;
    t.Page = page; // Add page parameter

    this._reportService
      .GetWeeklyBalanceByAgentLevelZero(t)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => (this._loadingReport = false))
      )
      .subscribe({
        next: (data) => {
          try {
          console.log(`📄 Loaded page ${page + 1}:`, data);
          console.log('  Raw AgentList:', data?.AgentList);
          console.log('  AgentList Length:', data?.AgentList?.length);
          
          // CRITICAL: Assign directly without using constructor to avoid data loss
          this._dataReportWeeklyBalance = data as ReportWeeklyBalance;
          
          console.log('  After assignment - AgentList:', this._dataReportWeeklyBalance.AgentList);
          console.log('  After assignment - AgentList Length:', this._dataReportWeeklyBalance.AgentList?.length);
          
          // NO FILTER - Show all agents from the API response
          console.log('  ✅ Showing all agents without filtering');

          // Update pagination info
          if (data?.AgentList?.[0]) {
            this.currentPage = data.AgentList[0].CurrentPage || page;
            this.totalPages = data.AgentList[0].TotalPage || 0;
            console.log(`   Players on page ${this.currentPage + 1}: ${data.AgentList[0].PlayerList?.length || 0}`);
          }
          } catch (error) {
            console.error('AgentWeeklyBalanceByPlayer page build error', error);
          }
        },
        error: (error) => {
          console.error('Error loading page:', page, error);
        }
      });
  }

}//end component
