import { Component, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentRightDTO, AgentSessionDto, AgentSettingsRequestDto, AgentSettingsResultDTO } from 'src/app/Models/models';
import { PlayerStatisticsResult } from 'src/app/Models/RpModels';
import { DataService } from 'src/app/Services/data.service';
import { PhoneDirectoryService } from 'src/app/Services/phoneDirectory.service';
import { ReportsService } from 'src/app/Services/reports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-MasterClassic',
  templateUrl: './MasterClassic.component.html',
  styleUrls: ['./MasterClassic.component.scss'],
})
export class MasterClassicComponent implements OnInit, OnDestroy {
  public _unsubscribeAll: Subject<any>;
  public isDesktop: boolean = false;
  public menuOpened: boolean = false;
  public _currentUser: AgentSessionDto = new AgentSessionDto();
  public agentRights: AgentRightDTO[] = [];
  public currentBalance: number = 0;
  public isCollapsed: boolean = false;
  modalInvoice:boolean = false;
  public playerStatistics?: PlayerStatisticsResult;
  public loadingServiceBalance: boolean = false;
  modalSettings: boolean = false;
  themeSelected: number = 1;
  public settings: AgentSettingsResultDTO = new AgentSettingsResultDTO();
  private zopimScript: any;
  public _isPhone: boolean = false;
  phoneDomain: string = "";
  phoneImage: string = "";
  isOpen: boolean = false;

  items: MenuItem[] = [];

  constructor(
    public _reportService: ReportsService,
    public _DataService: DataService,
    private router: Router,
    public messageService: MessageService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private phoneDirectoryService: PhoneDirectoryService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
    this.removeScript();
  }

  @HostListener("window:resize")
  onWindowResize() {
    const newIsDesktop = window.matchMedia("(min-width: 1024px)").matches;
    

    // Solo cambia el estado si hay un cruce del límite de 1024px
    if (newIsDesktop !== this.isDesktop) {
    this.isDesktop = newIsDesktop;
    
    if (!this.isDesktop) {
      this.isOpen = false;
      console.log("Pasó a móvil (menor a 1024px)");
    } else {
      this.isOpen = true;
      console.log("Pasó a escritorio (mayor a 1024px)");
    }
  }
  }

  ngOnInit() {
    this.items = [
      {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/mainclassic/principal'
      },
      {
          label: 'Management',
          routerLink: '/mainclassic/agentplayermagment'
      },
      {
          label: 'Figures',
          routerLink: '/mainclassic/figures'
      },
      {
          label: 'Wagers',
          routerLink: '/mainclassic/wagers'
      },
      {
          label: 'Financial',
          routerLink: '/mainclassic/financial'
      },
      {
          label: 'Information',
          routerLink: '/mainclassic/information'
      },
      {
          label: 'Agents',
          routerLink: '/mainclassic/agents'
      }
  ];

    this.isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    this.isOpen = window.matchMedia("(min-width: 1024px)").matches;
    this._DataService.MenuOpened.subscribe((opened) => {
      this.menuOpened = opened;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });

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
        this.currentBalance = this._currentUser.Master.CurrentBalance;
        this.GetAgentBalance();
      }else{
        this.currentBalance = this._currentUser.Master.CurrentBalance;
        this.GetAgentBalance();
      }
    }); //end dataservice call
    
    if(this._currentUser && this._currentUser.Master.OnlineMessage !== ''){
       Swal.fire({
         title: "Agent Message",
         text: this._currentUser.Master.OnlineMessage,
         icon: "info"
       });
    } 

    if(sessionStorage.getItem('agentSettings') != null){
      this.settings = JSON.parse(sessionStorage.getItem('agentSettings') || '{}');
      this.themeSelected = this.settings.Theme;
      console.log(this.settings)
    }
    this.getPhoneNumber();
    this.loadScript();
    this.setPhoneImage();
  }

  closeMenu() {
    this.renderer.removeClass(document.body, "modal-opened");
    document.documentElement.style.setProperty("--body-overflow", "initial");
    this._DataService.changeMenuOpened(false);
  }

  logout() {
    if (localStorage.getItem("agentInfo")) {

      let origen = localStorage.getItem('urlOrigen');
      console.log('origen: ' + origen);
      
      localStorage.clear();

      if (origen != null && origen != "undefined" && origen != '') window.location.href = origen;
      else {   
        const currentUrl2 = window.location.href;
        const domainParts = currentUrl2.split('/')[2].split('.');
        let domain = domainParts.slice(-2).join('.');
        domain = 'https://' + domain;
        let _origin: string = domain && domain != '' ? domain : window.location.origin;
        console.log(_origin)
        window.location.assign(_origin);
        // let returnUrl = "/login";
        // this.router.navigate([returnUrl]);
      }

      // this.authService.doLogout().then(res => {
      //   window.location.href = '/login';
      // }, err => {
      //   console.log(err);
      // });
    }
  }

  get InvoiceUrl() {
     let idAgent = 0;
     switch (this._currentUser.IdAgentSelected) {
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
        idAgent = this._currentUser.IdAgentSelected;
    }
    
    return `https://billing.5itedev.com/index.html?d=${idAgent}&is=True`;
  }

  GetAgentBalance() {
    this.loadingServiceBalance = true;

    this._reportService
      .GetAgentBalance(this._currentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data) {
            this.playerStatistics = data;
          }
          this.loadingServiceBalance = false;
        },
        (error) => {
          this.loadingServiceBalance = false;
        }
      );
  }

  InsertOrUpdateAgentSettings() {
    let req = new AgentSettingsRequestDto();
    req.IdAgent = this._currentUser.IdAgentSelected;
    req.Theme = this.themeSelected;

    this._reportService
      .InsertOrUpdateAgentSettings(this._currentUser,req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if(data === 0){
            this.settings.Theme = this.themeSelected;
            sessionStorage.setItem('agentSettings', JSON.stringify(this.settings))
            console.log(this.settings)
            if(this.themeSelected === 2){
              this.router.navigate(['/mainclassic/principal'])
            }else{
              this.router.navigate(['/mainbk/principal'])
            }
            this.showMessage("success", "Success", "Theme successfully changed");
          }else{
            this.showMessage("error", "Error", "An error has ocurred");
          }
        },
        (error) => {}
      );
  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }

  loadScript() {
    this.zopimScript = this.renderer.createElement('script');
    this.zopimScript.type = 'text/javascript';
    this.zopimScript.src = '//v2.zopim.com/?3DO7vu0cq31puFgiqgHB0REzIwdoYxXi'; 
    this.zopimScript.async = true;
    this.renderer.appendChild(document.body, this.zopimScript);  
  }

  removeScript() {
    const zopim = (window as any).$zopim; 
    if (zopim) {
      zopim.livechat.window.hide(); 
    }

    if (this.zopimScript) {
      this.renderer.removeChild(document.body, this.zopimScript);
      this.zopimScript = null; 
    }

  }

  getPhoneNumber(): void {
    this.phoneDomain = this.phoneDirectoryService.getPhoneByDomain();
  }

  private setPhoneImage() {
    const currentUrl =  window.location.hostname.replace('www.', '');
    if (currentUrl.includes('sportsfanwagers')) {
      this.phoneImage = 'phone-number-sport.png';
    } else {
      this.phoneImage = 'phone-number-others.png';
    }
  }

}
