import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AgentSessionDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-QrGenerator',
  templateUrl: './QrGenerator.component.html',
  styleUrls: ['./QrGenerator.component.css']
})
export class QrGeneratorComponent implements OnInit {
  public agentSelected: string = "";
  public agentList: any[] = [];
  public url: string = "https://theparlaycard.com/landing/home?x="
  public value: string = '';
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _unsubscribeAll: Subject<any>;

  @ViewChild('qrcodeElement', { static: false }) qrcodeElement!: any;

  constructor(public _reportService: ReportsService, public _DataService: DataService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._DataService.UserSession.pipe(takeUntil(this._unsubscribeAll)).subscribe((ServiceUserInformation) => {
      this._currentUser = ServiceUserInformation;
      if (this._currentUser.Master == null) {
        if (localStorage.getItem('agentInfo') != null) {
          this._currentUser = JSON.parse(localStorage.getItem('agentInfo') || '{}');
        }
      }
    });
    this.GetAgentPrefixTree();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  selectAgent(){
    this.value = this.url + this.agentSelected;
    console.log(this.value)
  }

  downloadQR() {
    const canvasElement: HTMLCanvasElement = this.qrcodeElement.qrcElement.nativeElement.querySelector('canvas');
    if (canvasElement) {
      const pngUrl = canvasElement.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'ParlayCardQR_'+this.agentSelected+'.png';
      downloadLink.click();
    } else {
      console.error('El canvas del código QR no está disponible.');
    }
 
  }

  redirectQR(){
    const url = this.url + this.agentSelected;
    window.open(url, '_blank');
  }

  GetAgentPrefixTree() {
      this._reportService.GetAgentPrefixTree(this._currentUser,this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe({
        next: data => {
          this.agentList = data;
        },
        error: err => {
          console.log("Error in GetAgentPrefixTree");
        },
        complete: () => {
        
        },
      })
  }

}
