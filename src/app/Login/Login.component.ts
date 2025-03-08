import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentLoginDto, AgentSessionDto } from '../Models/models';
import { DataService } from '../Services/data.service';
import { ReportsService } from '../Services/reports.service';
import { UsersService } from '../Services/users.service';
import { HttpClient } from '@angular/common/http';

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
  public sub: any;
  public varUsername: string = '';
  public varPassword: string = '';
  public varOrigen: string = '';
  public varIp: string = '';
  public showLoginForm: boolean = true;

  constructor(private readonly fb: UntypedFormBuilder,
    private router: Router,
    public _userService: UsersService,
    public messageService: MessageService,
    public _DataService: DataService,
    public _reportService: ReportsService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
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
    try {
      this.sub = this.activatedRoute.queryParams.subscribe(params => {
        this.varUsername = params['us'];
        let passEncryp = params?.['ps']?.trim?.();
        let passDecrypt = atob(passEncryp);
        this.varOrigen = params?.['origen'];
        this.varPassword = passDecrypt;
        if (this.varUsername != null && this.varPassword != '') {
          this.showLoginForm = false;
          this.submitFormExt(this.varUsername.trim(), this.varPassword.trim());
        }else{
          document.location.href= this.varOrigen;
        }
      });
    } catch(error){}
  }

  submitForm() {
    if (this.form.valid) {
      // console.log(this.form.getRawValue());
      this._loadingReport = true;

      // const response = this.http.get('https://api.ipify.org', { responseType: 'text' }).toPromise();
      // const ipAddress = response ? response.toString() : '10.0.0.1';
      // localStorage.setItem('ClientIp', ipAddress);

      let login = new AgentLoginDto();
      login.Username = this.f.username.value;
      login.Password = this.f.password.value;
      login.Ip = '10.0.0.1';


      this._userService
        .AgentLogin(login)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
          (data) => {

            console.log("data==>", data)


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

                  this._reportService
                  .GetAgentSettings(objSession.IdAgentSelected)
                  .pipe(takeUntil(this._unsubscribeAll))
                  .subscribe(
                    (data) => {
                      sessionStorage.setItem(
                        "agentSettings",
                        JSON.stringify(data)
                      );
                      if(data && data.Theme === 1){
                        this.router.navigate(["mainbk/principal"]);
                      }else if(data && data.Theme === 2){
                        this.router.navigate(["mainclassic/principal"]);
                      }else{
                        this.router.navigate(["mainbk/principal"]);
                      }
                    },
                    (error) => { }
                  );
                 
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

  async submitFormExt(username: string, password: string): Promise<void> {
      // console.log(this.form.getRawValue());
      // this._loadingReport = true;
      
      const response = await this.http.get('https://api.ipify.org', { responseType: 'text' }).toPromise();
      const ipAddress = response ? response.toString() : '10.0.0.1';
      localStorage.setItem('ClientIp', ipAddress);

      let login = new AgentLoginDto();
      login.Username = username;
      login.Password = password;
      login.Ip = ipAddress;


      this._userService
        .AgentLogin(login)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
          (data) => {
            if (data.Agent == null) {
              this.showMessage("error", "Login Error", data._sErrorMsg);
              setTimeout(()=>{
                if (this.varOrigen != null && this.varOrigen != "undefined" && this.varOrigen != '') window.location.href = this.varOrigen;
                else {   
                  const currentUrl2 = window.location.href;
                  const domainParts = currentUrl2.split('/')[2].split('.');
                  let domain = domainParts.slice(-2).join('.');
                  domain = 'https://' + domain;
                  let _origin: string = domain && domain != '' ? domain : window.location.origin;
                  console.log(_origin)
                  window.location.assign(_origin);
                }
              },1500)
            }
            else {

              let objSession: AgentSessionDto = new AgentSessionDto();

              objSession.Master = data;
              objSession.AgentSelected = data.Agent;
              objSession.IdAgentSelected = data.IdAgent;


              localStorage.setItem('urlOrigen', this.varOrigen);

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

                  this._reportService
                  .GetAgentSettings(objSession.IdAgentSelected)
                  .pipe(takeUntil(this._unsubscribeAll))
                  .subscribe(
                    (data) => {
                      sessionStorage.setItem(
                        "agentSettings",
                        JSON.stringify(data)
                      );
                      if(data && data.Theme === 1){
                        this.router.navigate(["mainbk/principal"]);
                      }else if(data && data.Theme === 2){
                        this.router.navigate(["mainclassic/principal"]);
                      }else{
                        this.router.navigate(["mainbk/principal"]);
                      }
                    },
                    (error) => { }
                  );
                 
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

  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }

}//end component