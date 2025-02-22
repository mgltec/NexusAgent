import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddAgentDto, AgentSessionDto } from 'src/app/Models/models';
import { DataService } from 'src/app/Services/data.service';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {

  @Output() stepChange = new EventEmitter();

  agentForm: FormGroup;
  public agentList: any = []; 
  public _currentUser: AgentSessionDto = new AgentSessionDto;
  public _unsubscribeAll: Subject<any>;

  constructor(private fb: FormBuilder, private _reportService: ReportsService, private _DataService: DataService, public messageService: MessageService) {
    this.agentForm = this.fb.group({
      masterAgent: ['', Validators.required], 
      agentUsername: ['', Validators.required], 
      password: ['', Validators.required], 
      confirmPassword: ['', Validators.required],
      makeUp: [0],
      commPercent: [0],
      name: [''],
      lastName: [''],
      lineType: [''],
      carryOver: [false],
      distributor: [ false],
    });

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

       this.GetAgentTree2()
        /****************************DATATABLE OPTIONS*************************************** */
    }); //end datas
  }

  changeStep(n:number) {
    // Aquí emites el valor del siguiente paso
    this.stepChange.emit(n); // Cambia esto según el paso que quieras actualizar
  }

  onSubmit() {
    if (this.agentForm.valid) {
      if(this.agentForm.get('password')?.value === this.agentForm.get('confirmPassword')?.value){        
        this.SaveAgent();
      }else{
        this.showMessage("error", "Passwords do not match", "");
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  prueba(){
    console.log(this.agentForm)
  }

  GetAgentTree2() {
    this._reportService.GetAgentTree2(this._currentUser, this._currentUser.IdAgentSelected)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.agentList = data;
        console.log(data)
      }, error => {

      });
  }

  onAgentChange(selectedIdAgent: any) {
    this.agentForm.patchValue({
      masterAgent: selectedIdAgent.IdAgent
    });
  }
  

  SaveAgent() {
    let req: AddAgentDto = new AddAgentDto();
    req.agentUser = this.agentForm.get('agentUsername')?.value || ''; // Acceso a los valores del formulario
    req.name = this.agentForm.get('name')?.value || '';
    req.lastName = this.agentForm.get('lastName')?.value || '';
    req.password = this.agentForm.get('password')?.value || '';
    req.prmIdAgent = this.agentForm.get('masterAgent')?.value || 0;
    req.makeUp = this.agentForm.get('makeUp')?.value || 0;
    req.commPercent = this.agentForm.get('commPercent')?.value || 0;
    req.ckCarryBalance = this.agentForm.get('carryOver')?.value || false;
    req.ckDistributor = this.agentForm.get('distributor')?.value || false;
    req.idLineType = this._currentUser.Master.IdLineType;  
    this._reportService.SaveAgent(this._currentUser, req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        if(data === -1){
          this.showMessage("error", "Agent already exists", "");
        }else if(data===-2){
          this.showMessage("error", "An error has occurred", "");
        }else{
          this.showMessage("success", "Agent successfully created", "");
          this.GetAgentTree2();
        }
      }, error => {

      });
  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }

}
