import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CountriesDto, PlayerDetailsDTO, StatesDto } from 'src/app/Models/cashier-models';
import { AgentSessionDto, PlayerDto, PlayerTransferDto } from 'src/app/Models/models';
import { CashierService } from 'src/app/Services/Cashier.service';
import { DataService } from 'src/app/Services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ach',
  templateUrl: './ach.component.html',
  styleUrls: ['./ach.component.css'],
})
export class AchComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private cashierService: CashierService,
    private dataService: DataService
  ) {}
  @Input() PlayerDetails!: PlayerDetailsDTO;
  playerInfoSub: Subscription | undefined;
  playerInfo: PlayerTransferDto = new PlayerTransferDto();
  currentUser: AgentSessionDto = new AgentSessionDto();
  form: FormGroup = {} as FormGroup;
  countries: CountriesDto[] = [];
  states: StatesDto[] = [];
  Type = [
    { value: 'C', display: 'Credit' },
    { value: 'D', display: 'Debit' },
  ];

  AccountType = [
    { value: 'PC', display: 'Personal Checking' },
    { value: 'PS', display: 'Personal Savings' },
    { value: 'CC', display: 'Commercial Checking' },
  ];

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
      this.loadCountries();
    }); //end dataservice call
  }

  loadCountries() {
    this.cashierService.GetCountries().subscribe(response => {
      this.countries = response;
      this.loadStates(this.countries[232].idISOCountry);
      this.form.patchValue({
        achCountry: this.countries[232].idISOCountry,
      });
    });
  }

  loadStates(country: string) {
    this.cashierService.GetStates(country).subscribe(response => {
      this.states = response.sort((a, b) => a.State.localeCompare(b.State, undefined, { sensitivity: 'base' }));

      this.form.patchValue({
        achState: this.states[0].idISOState,
        achBankState: this.states[0].idISOState,
      });
    });
  }

  loadForms() {
    this.form = this.fb.group({
      Type: [this.Type[0].value],
      Currency: ['USD'],
      IPAddress: [localStorage.getItem('ClientIp')],
      RoutingNumber: ['', Validators.required],
      AccountNumber: ['', Validators.required],
      AccountType: [this.AccountType[0].value],
      Amount: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Street: ['', Validators.required],
      Email: [''],
      Phone: ['', Validators.required],
      achCountry: ['', Validators.required],
      dob: ['', Validators.required],
      BankName: [''],
      BankCity: [''],
      achState: [''],
      BankPhone: [''],
      achBankState: [''],
      City: ['', Validators.required],
      Zip: ['', Validators.required],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  achSubmit() {
    debugger;
    if (this.form?.valid) {
      this.cashierService.ACHCardPayment(this.PlayerDetails, this.form.value).subscribe(response => {
        if (response.Status == 'Success') {
          Swal.fire({
            title: 'ACH Transaction',
            text: 'Payment Successful!',
            icon: 'success',
            confirmButtonText: 'Close',
          });
        } else {
          let errorString = '<ul>';
          response.Errors.forEach(error => {
            errorString += '<li>' + error.FieldName + ': ' + error.Description + '</li>';
          });
          errorString += '</ul>';
          Swal.fire({
            title: 'ACH Transaction Error',
            html: errorString,
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
