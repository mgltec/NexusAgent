import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentLoginDto, AgentSessionDto } from '../Models/models';
import { DataService } from '../Services/data.service';
import { ReportsService } from '../Services/reports.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: UntypedFormGroup;
  public _unsubscribeAll: Subject<any>;
  public _loadingReport: boolean = false;
  toasts: any[] = [];

  constructor(private readonly fb: UntypedFormBuilder,
    private router: Router,
    public _userService: UsersService,
    public messageService: MessageService,
    public _DataService: DataService,
    public _reportService: ReportsService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this._unsubscribeAll = new Subject();
  }

  get f() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  ngOnInit() {
  }

  submitForm() {
    if (this.form.valid) {
      // console.log(this.form.getRawValue());
      this._loadingReport = true;

      let login = new AgentLoginDto();
      login.Username = this.f.username.value;
      login.Password = this.f.password.value;
      login.Ip = "10.1.1.1";


      this._userService
        .AgentLogin(login)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
          (data) => {
            if (data.Agent == null) {
              this.showMessage("error", "Login Error", data._sErrorMsg);
            }
            else {

              let objSession: AgentSessionDto = new AgentSessionDto();

              objSession.Master = data;
              objSession.AgentSelected = data.Agent;
              objSession.IdAgentSelected = data.IdAgent;


              this._reportService
              .GetWeeks(objSession)
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe(
                (data) => {
                  
                  //this.weekList = data;
                  objSession.WeekList = data;
                  objSession.RangeDateSelected = 0;
        
                  localStorage.setItem(
                    "agentInfo",
                    JSON.stringify(objSession)
                  );
                  this._DataService.changeDataUserSession(objSession);
                  this.router.navigate(["mainbk/agentplayermagment"]);
                },
                (error) => { }
              );



              // localStorage.setItem(
              //   "agentInfo",
              //   JSON.stringify(objSession)
              // );
              // this._DataService.changeDataUserSession(objSession);
              // this.router.navigate(["mainbk/principal"]);
            }
            this._loadingReport = false;
          },
          (error) => { this._loadingReport = false; }
        );

    } else {
      console.log('There is a problem with the form');
    }
  } //end submit form

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }

}//end component
