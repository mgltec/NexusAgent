import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/Services/reports.service';
import { AgentSessionDto, AgentPlayerTreeResponseDto, PlayerClassicCloneRequest } from 'src/app/Models/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerClassicComponent implements OnInit {
  @Output() stepChange = new EventEmitter();

  public agentSelected: any;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public _unsubscribeAll: Subject<any>;
  public agentList: any = [];

  public playerSelected: any;
  public playerList: AgentPlayerTreeResponseDto[] = [];

  public selectedPlayerId: any;
  public idAgent: any;
  public name: string = "";
  public lastName: string = "";
  public player: string = "";
  public password: string = "";


  public confirmPassword: string = '';


  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public _reportService: ReportsService,
    public _DataService: DataService,
    public messageService: MessageService
  ) {
    this._unsubscribeAll = new Subject();
    this.registerForm = this.fb.group({
      name: [''],
      lastName: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
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

      this.GetAgentTree2();
      this.GetPlayerList();
      /****************************DATATABLE OPTIONS*************************************** */
    }); //end dataservice call

  }

  changeStep(n: number) {
    // Aquí emites el valor del siguiente paso
    this.stepChange.emit(n); // Cambia esto según el paso que quieras actualizar
  }

  GetAgentTree2() {
    this._reportService.GetAgentTree2(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.agentList = data;
      }, error => {

      });
  }


  GetPlayerList() {
    this._reportService.AgentGetAllPlayersTree(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.playerList = data;
        // this.playerSelected = data[0];
      }, error => {

      });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let req: PlayerClassicCloneRequest = new PlayerClassicCloneRequest();
      req.IdAgent = this.idAgent.IdAgent;
      req.LastName = this.lastName;
      req.Name = this.name;
      req.Password = this.password;
      req.Player = this.player;
      req.SelectedPlayerId = this.selectedPlayerId.IdPlayer;
      if (this.confirmPassword == this.password) {
        this._reportService.AddPlayerClassic(this._currentUser, req)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(data => {
            if(data > 0){
              this.showMessage("success", "Player successfully created", "");
              this.GetPlayerList();
            }else{
              this.showMessage("error", "An error has occurred", "");
            }
          }, error => {

          });
      }
      else{
        console.log('password does not match')
      }

    } else {
      console.log('Formulario inválido');
    }
  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }

}
