import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentSessionDto } from 'src/app/Models/models';
import { SubAgentInsertDTO } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';


@Component({
  selector: 'app-AddSubAgent',
  templateUrl: './AddSubAgent.component.html',
  styleUrls: ['./AddSubAgent.component.css']
})
export class AddSubAgentComponent implements OnInit,OnDestroy {

  @Input() IdAgent?: number;
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public AgentInformation: SubAgentInsertDTO = new SubAgentInsertDTO();
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

    }); //end dataservice call

  }//end Oninit

 

  GetAgentDetails() {
    this._reportService.GetAgentDetails(this._currentUser, Number(this.IdAgent))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.AgentDetails = data;
        console.log(this.AgentDetails);
      }, error => {
      });
  }

  InsertSubAgent(){
    this.AgentInformation.IdUser = this._currentUser.Master.IdAgent;
    this.AgentInformation.Distributor = Number(this.IdAgent);
    this.AgentInformation.Name = this.AgentInformation.Agent;

    this._reportService.InsertSubAgent(this._currentUser, this.AgentInformation)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        console.log(data);


        if(data == 0)
        {
           this.showMessage("success", "New Player", "Player created successfully");
           this.AgentInformation = new SubAgentInsertDTO();
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

}
