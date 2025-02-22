import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SMSBetAlertRequest, AgentListModel,AgentSessionDto, RequestPlayerListModel, InsertSMSAgentAlertRequest } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-AgentSMSAlert',
  templateUrl: './AgentSMSAlert.component.html',
  styleUrls: ['./AgentSMSAlert.component.css']
})
export class AgentSMSAlertComponent implements OnInit {


  public _loadingReport: boolean = false;
  public display: boolean = false;
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _smsAlertRequest: InsertSMSAgentAlertRequest = new InsertSMSAgentAlertRequest();
  public agentList: any[] = [];
  public playerList: any[] = [];
  public AgentSelected: any;
  public SMSAgentAlertData: any;
  public playerSelected: any;
  public _amount: number = 0;
  public _phoneNumber: string = "";
  public _isActive: boolean = false;

  public _idAgent: string = "";

  public _sumTrans: number = 0;

  constructor(
    private route: ActivatedRoute,
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService
  ) { 

    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  ngOnInit() {
    this._idAgent = this.route.snapshot.queryParamMap.get('idagent') || '';

    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');

        }
      }
      this.GetAgentList();
      this.GetSMSAlerts();



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

    info.idAgent = this.AgentSelected._idagent; //this._currentUser.IdAgentSelected;//parseInt(this.agentSelected);

    this._reportService.GetPlayerList(info)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.playerList = data;
       // console.log(this.playerList);
      }, error => {
      });
  }

  GetSMSAlerts() {
    this._loadingReport = true;

    let t: SMSBetAlertRequest = new SMSBetAlertRequest();

    t.IdAgent = this._currentUser.IdAgentSelected;

    this._reportService.GetSMSAgentsAlerts(this._currentUser, t)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.SMSAgentAlertData = data;
        this._loadingReport = false;
      }, error => {
        this._loadingReport = false;
      });
  }

  InsertPlayerAlert(){
    this._smsAlertRequest.IdPlayer = this.playerSelected.IdPlayer;
    this._smsAlertRequest.PhoneNumber = this._phoneNumber;
    this._smsAlertRequest.WagerAmount = this._amount;
    this._smsAlertRequest.IsActive = true;

    console.log('_smsAlertRequest=====>', this._smsAlertRequest);


    this._reportService.InsertSMSAgentAlert(this._smsAlertRequest)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        console.log(data);

        if(data == 0)
        {
           this.showMessage("success", "Bet Alert", "Player added successfully");
           this._smsAlertRequest = new InsertSMSAgentAlertRequest();
           this.GetSMSAlerts();
        }
        else
        this.showMessage("error", "Bet Alert", "Error adding player alert");
      }, error => {
      });

  }

  UpdateAlertInfo(index:number){
    this._smsAlertRequest.IdPlayer = this.SMSAgentAlertData[index].IdPlayer;
    this._smsAlertRequest.PhoneNumber = this.SMSAgentAlertData[index].PhoneNumber;
    this._smsAlertRequest.WagerAmount = this.SMSAgentAlertData[index].WagerAmount;
    this._smsAlertRequest.IsActive = this.SMSAgentAlertData[index].IsActive;

    this._reportService.UpdateSMSAgentAlert(this._smsAlertRequest)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        console.log(data);

        if(data == 0)
        {
           this.showMessage("success", "Bet Alert", "Player updated successfully");
           this._smsAlertRequest = new InsertSMSAgentAlertRequest();
           this.GetSMSAlerts();
        }
        else
        this.showMessage("error", "Bet Alert", "Error adding player alert");
      }, error => {
      });
  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }

}
