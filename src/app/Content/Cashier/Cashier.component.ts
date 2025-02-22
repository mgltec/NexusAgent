import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerDetailsDTO } from 'src/app/Models/cashier-models';
import { AgentSessionDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-cashier',
  templateUrl: './Cashier.component.html',
  styleUrls: ['./Cashier.component.scss'],
})
export class CashierComponent implements OnInit {
  activeTab: string = 'creditCard';
  currentUser: AgentSessionDto = new AgentSessionDto();
  PlayerDetails: PlayerDetailsDTO = new PlayerDetailsDTO();
  IdPlayer: number = 0;
  public _unsubscribeAll: Subject<any>;
  invoice: any;

  constructor(private reportService: ReportsService, private _DataService: DataService, private router: Router, private route: ActivatedRoute) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this.currentUser = ServiceUserInformation;
      if (this.currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this.currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
        }
      }
      this.GetTransactions();

      this.route.queryParams.subscribe(params => {
        if (params['invoice']) {
          try {
            this.invoice = JSON.parse(params['invoice']);
            if (!this.invoice.IdPlayer) {
              this.router.navigate(['/mainbk/principal']);
            }
          } catch (error) {
            this.router.navigate(['/mainbk/principal']);
          }
        } else {
          this.router.navigate(['/mainbk/principal']); 
        }
      });
      
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  GetTransactions() {
    let idAgent = 0;
    switch (this.currentUser.IdAgentSelected) {
      case 3868:
        idAgent = 290;
        break
      case 515:
        idAgent = 3178;
        break
      case 5355:
        idAgent = 6110;
        break
      default:
        idAgent = this.currentUser.IdAgentSelected;
    }
    this.reportService.GetPlayerAgentByIdAgent(this.currentUser, idAgent).subscribe({
      next: data => {
        this.PlayerDetails = data;
      },
      error: err => {},
      complete: () => {},
    });
  }
}
