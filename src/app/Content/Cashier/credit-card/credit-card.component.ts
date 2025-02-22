import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CountriesDto, PlayerDetailsDTO, StatesDto } from 'src/app/Models/cashier-models';
import { AgentSessionDto, PlayerDto, PlayerTransferDto } from 'src/app/Models/models';
import { CashierService } from 'src/app/Services/Cashier.service';
import { DataService } from 'src/app/Services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
})
export class CreditCardComponent implements OnInit {
  playerInfoSub: Subscription | undefined;
  playerInfo: PlayerTransferDto = new PlayerTransferDto();
  currentUser: AgentSessionDto = new AgentSessionDto();
  form: FormGroup = {} as FormGroup;
  countries: CountriesDto[] = [];
  states: StatesDto[] = [];
  selectedCountry: string = '';
  @Input() PlayerDetails!: PlayerDetailsDTO;

  constructor(
    private fb: FormBuilder,
    private cashierService: CashierService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadForms();

    this.dataService.UserSession.subscribe(message => {
      this.currentUser = message;

      if (this.currentUser == null) {
        console.log('current user null');

        if (localStorage.getItem('agentInfo') != null) {
          this.currentUser = JSON.parse(localStorage.getItem('agentInfo')!);
        }
      }

      // this.playerInfoSub = this.dataService.PlayerInfo.subscribe(data => {
      //   if (data) {
      //     this.playerInfo = data;
      //   }
      // });
      //this.GoToCashier();
      //this.checkWindowSize();
    }); //end dataservice call
    this.loadCountries();
  }

  loadCountries() {
    this.cashierService.GetCountries().subscribe(response => {
      this.countries = response;
      this.loadStates(this.countries[232].idISOCountry);
      this.form.patchValue({
        ccCountry: this.countries[232].idISOCountry,
      });
    });
  }

  loadStates(country: string) {
    this.cashierService.GetStates(country).subscribe(response => {
      this.states = response.sort((a, b) => a.State.localeCompare(b.State, undefined, { sensitivity: 'base' }));
      this.form.patchValue({
        ccState: this.states[0].idISOState,
      });
      console.log('FORM PATCH', this.form);
    });
  }

  loadForms() {
    this.form = this.fb.group({
      Player: [''],
      NameOnCard: ['', Validators.required],
      CardNumber: ['', Validators.required],
      ExpiryDate: ['', Validators.required],
      Cvv: ['', Validators.required],
      Amount: ['', Validators.required],
      Email: [''],
      Phone: [''],
      Address: [''],
      ccCountry: [''],
      ccState: [''],
      City: [''],
      Zip: [''],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  submit() {
    if (this.form?.valid) {
      this.cashierService.CrditCardPayment(this.PlayerDetails, this.form.value).subscribe(response => {
        if (response.Status == 'success') {
          Swal.fire({
            title: 'Credit Card Payment',
            text: 'Payment Successful!',
            icon: 'success',
            confirmButtonText: 'Close',
          });
        } else {
          Swal.fire({
            title: 'Credit Card Payment Error',
            text: response.Message.toUpperCase(),
            icon: 'error',
            confirmButtonText: 'Close',
          });
        }
      });
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
