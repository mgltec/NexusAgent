import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentSessionDto } from 'src/app/Models/models';
import { InsertPlayerDto } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-AddPlayer',
  templateUrl: './AddPlayer.component.html',
  styleUrls: ['./AddPlayer.component.css']
})
export class AddPlayerComponent implements OnInit, OnDestroy {

  @Input() IdAgent?: number;
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public LineTypeList: any[] = [];
  public ProfileList: any[] = [];
  public LimitProfileList: any[] = [];
  public PlayerInformation: InsertPlayerDto = new InsertPlayerDto();
  public LineTypeSelected: number = 0;;
  public ProfileSelected: number = 0;;
  public ProfileLimitsSelected: number = 0;
  public AgentDetails: any;

  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService) {
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
      this.GetAgentDetails();
      this.GetLineTypeByAgent();
      this.GetPlayerProfileByAgent();
      this.GetPlayerProfileLimitsByAgent();

    }); //end dataservice call

  }//end Oninit

  GetLineTypeByAgent() {
    this._reportService.GetLineTypeByAgent(this._currentUser, Number(this.IdAgent))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.LineTypeList = data;
        this.LineTypeSelected = this.LineTypeList[0].IdLineType;
        console.log(data);
      }, error => {
      });
  }

  GetPlayerProfileByAgent() {
    this._reportService.GetPlayerProfileByAgent(this._currentUser, Number(this.IdAgent))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.ProfileList = data;
        this.ProfileSelected = this.ProfileList[0].IdProfile;
        console.log(data);
      }, error => {
      });
  }

  GetPlayerProfileLimitsByAgent() {
    this._reportService.GetPlayerProfileLimitsByAgent(this._currentUser, Number(this.IdAgent))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.LimitProfileList = data;
        this.ProfileLimitsSelected = this.LimitProfileList[0].IdProfileLimits;
        console.log(data);
      }, error => {
      });
  }

  GetAgentDetails() {
    this._reportService.GetAgentDetails(this._currentUser, Number(this.IdAgent))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.AgentDetails = data;
        console.log(this.AgentDetails);
      }, error => {
      });
  }

  InsertPlayer(){
    this.PlayerInformation.IdBook = this.AgentDetails.IdBook;
    this.PlayerInformation.IdProfile = this.ProfileSelected;
    this.PlayerInformation.IdProfileLimits = this.ProfileLimitsSelected;
    this.PlayerInformation.IdLineType = this.LineTypeSelected;
    this.PlayerInformation.IdAgent = this.AgentDetails.IdAgent;

    console.log(this.PlayerInformation);


    this._reportService.InsertPlayer(this._currentUser, this.PlayerInformation)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        console.log(data);


        if(data == 0)
        {
           this.showMessage("success", "New Player", "Player created successfully");
           this.PlayerInformation = new InsertPlayerDto();
        }
        else
        this.showMessage("error", "New Player", "Error creating new player");
      }, error => {
      });

  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }



}//end component
