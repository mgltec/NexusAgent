import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AgentListModel, AgentSessionDto, HiddenLeagueRequestDTO, HiddenLeagueResponseDTO, HiddenLeaguesInsertDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-AgentHiddenLeagues',
  templateUrl: './AgentHiddenLeagues.component.html',
  styleUrls: ['./AgentHiddenLeagues.component.scss']
})
export class AgentHiddenLeaguesComponent implements OnInit {
  public _loadingReport: boolean = false;
  public display: boolean = false;
  public _unsubscribeAll: Subject<any>;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _hiddenLeaguesRequest: HiddenLeagueRequestDTO = new HiddenLeagueRequestDTO();
 // public _OriginalhiddenLeagues: HiddenLeagueResponseDTO[] = [];
  public _NewHiddenLeagues: HiddenLeagueResponseDTO[] =[];

  public agentList: any[] = [];
  public AgentSelected: any;
  public _idAgent: string = "";

  public webRowsList: any[] = [];
  public WebRowSelected: any;

  public selectAll: boolean = false;
  public applyAllAgents: boolean = false;
  public checkedItems: any[] = [];


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
      this.GetWebRows();
      //this.GetSMSAlerts();



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

  GetWebRows() {
    this._reportService.GetWebRows(this._currentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.webRowsList = data;
      }, error => {
      });
  }

  GetHiddenLeaguesValues() {
    this._hiddenLeaguesRequest.IdAgent = this.AgentSelected._idagent;
    this._hiddenLeaguesRequest.IdWebRow = this.WebRowSelected.IdWebRow;
    this._reportService.GetHiddenLeaguesValues(this._currentUser, this._hiddenLeaguesRequest)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
      //  this._OriginalhiddenLeagues = Object.assign([], data);
        this._NewHiddenLeagues = Object.assign([], data);
        // this._hiddenLeaguesResponse.forEach(element => {
        //   if(element.Enable)
        //   this._hiddenLeagueInsertDTO.push(element);
          
        // });
      }, error => {
      });
  }

  CheckAllOptions(){
    
    for (let i = 0; i < this._NewHiddenLeagues.length; i++) {
      if(this.selectAll)
      {
      this._NewHiddenLeagues[i].Enable = this.selectAll;
    //  this.SelectLeaguesForHide(i);
      }
      else{
        this._NewHiddenLeagues[i].Enable = this.selectAll;
    //    this.SelectLeaguesForHide(i);
        
      }
    }
  }

  // SelectLeaguesForHide(index:number){
  //   //console.log("_hiddenLeaguesResponse===>",this._hiddenLeaguesResponse)
  //   if(this._hiddenLeaguesResponse[index].Enable){
      
  //     // const datosCliente: HiddenLeagueResponseDTO = {
  //     //   IdAgent: this.AgentSelected._idagent,
  //     //   IdLeague: this._hiddenLeaguesResponse[index].IdLeague,
  //     //   Enable: this._hiddenLeaguesResponse[index].Enable,
  //     //   Description: "",
        
  //     // };
  //     console.log("if===>",this._hiddenLeagueInsertDTO)
  //     this._hiddenLeagueInsertDTO.push(this._hiddenLeaguesResponse[index]);
  //   }
  //   else{
  //     const itemIndex = this._hiddenLeagueInsertDTO.findIndex(item => item.IdLeague === this._hiddenLeaguesResponse[index].IdLeague);
  //     if(itemIndex !== -1){
  //       console.log("else===>",this._hiddenLeagueInsertDTO)
  //       this._hiddenLeagueInsertDTO[itemIndex].Enable = false;
  //     }
  //   }
  //   console.log("_hiddenLeagueInsertDTO====>", this._hiddenLeagueInsertDTO)
  // }

  InsertHiddenLeagues(){

    this._loadingReport = true;
    let a: HiddenLeaguesInsertDto = new HiddenLeaguesInsertDto();
    a.NewHidden = this._NewHiddenLeagues;
    a.IdAgent = this.AgentSelected._idagent;
    a.IdWebRow = this.WebRowSelected.IdWebRow;

    if(!this.applyAllAgents){
      this._reportService.HiddenLeagues_Insert(this._currentUser, a)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        console.log(data);

        if(data == 0)
        {
          Swal.fire({
            title: 'Agent site',
            text: 'Save hidden leagues successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
           
           this.GetHiddenLeaguesValues();
        }
        else
        {
          Swal.fire({
            title: 'Agent site',
            text: 'Error saving data',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }

        this._loadingReport = false;
      }, error => {
        this._loadingReport = false;
      });
    }
    else{
      this._reportService.HiddenLeagues_InsertMasive(this._currentUser, a)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        console.log(data);

        if(data == 0)
        {
          Swal.fire({
            title: 'Agent site',
            text: 'Save hidden leagues successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
           
           this.GetHiddenLeaguesValues();
        }
        else
        {
          Swal.fire({
            title: 'Agent site',
            text: 'Error saving data',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }

        this._loadingReport = false;
      }, error => {
        this._loadingReport = false;
      });
    }
    
  }




  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }

}
