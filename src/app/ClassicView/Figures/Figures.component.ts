import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AgentRightDTO, AgentSessionDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { PhoneDirectoryService } from 'src/app/Services/phoneDirectory.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-Figures',
  templateUrl: './Figures.component.html',
  styleUrls: ['./Figures.component.css']
})
export class FiguresComponent implements OnInit {
  public agentRights: AgentRightDTO[] = [];
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  constructor(
    public _reportService: ReportsService,
    public _DataService: DataService,
    public messageService: MessageService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  ngOnInit() {
    this._DataService.UserSession.subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;

      this._DataService.AgentRights.subscribe((rights) => {
        this.agentRights = rights;
      });

      if (
        this._currentUser.Master == null ||
        this._currentUser.IdAgentSelected == 0
      ) {
        if (localStorage.getItem("agentInfo") != null) {
          this._currentUser = JSON.parse(
            localStorage.getItem("agentInfo") || "{}"
          );
        }
      }
    }); 
  }

  hasRight(idRight: number): boolean {
    return this.agentRights.some((right) => right.IdRight === idRight);
  }

}
