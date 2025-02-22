import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BankList, PlayerDetailsDTO, zPayPaymentRequest } from 'src/app/Models/cashier-models';
import { AgentSessionDto, PlayerDto, PlayerTransferDto } from 'src/app/Models/models';
import { CashierService } from 'src/app/Services/Cashier.service';
import { DataService } from 'src/app/Services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zelle',
  templateUrl: './zelle.component.html',
  styleUrls: ['./zelle.component.css'],
})
export class ZelleComponent implements OnInit {
  currentUser: AgentSessionDto = new AgentSessionDto();
  banks: BankList = {} as BankList;
  form: FormGroup = {} as FormGroup;
  playerInfoSub: Subscription | undefined;
  playerInfo: PlayerTransferDto = new PlayerTransferDto();
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
      this.getBanks();

      // if (this.currentUser?.IdPlayer) {
      //   this.form.patchValue({
      //     zPayPayorId: this.currentUser.IdPlayer,
      //   });
      //   console.log('FORM VALUE', this.form.value);
      // }
    });
  }

  getBanks() {
    this.cashierService.GetBanks().subscribe(response => {
      this.banks = response;
    });
  }

  loadForms() {
    this.form = this.fb.group({
      //zPayPayorId: [''],
      zPayAmount: ['', Validators.required],
      zPayBankId: ['', Validators.required],
      zPayFirst: ['', Validators.required],
      zPayLast: ['', Validators.required],
      zPayEmail: ['', Validators.required],
      //zPayPhone: ['', Validators.required],
      //zPayIpAddress: [localStorage.getItem('ClientIp')],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  submit() {
    if (this.form?.valid) {
      this.cashierService.SubmitZellePayment(this.PlayerDetails, new zPayPaymentRequest(this.form.get('zPayAmount')?.value, this.form.get('zPayBankId')?.value, this.form.get('zPayFirst')?.value, this.form.get('zPayLast')?.value, this.form.get('zPayEmail')?.value)).subscribe(response => {
        if (response.Status == 'submitted') {
          Swal.fire({
            icon: 'success',
            confirmButtonText: 'Close',
            html: `
            <div>
                <h2 style="color: green;">Payment Submitted</h2>
                <p>Please confirm your payment on Zelle using the memo</p>
                <ul>
                    <li>Memo: ` + response.Memo + `</li>
                    <li>Amount: ` + response.Amount + `</li>
                </ul>
            </div>
        `,
          });
        } else {
          Swal.fire({
            title: 'Zelle Payment Error',
            text: response.Error,
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
