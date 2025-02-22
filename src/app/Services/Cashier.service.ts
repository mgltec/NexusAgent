import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ACHTransactionRequestDto, ACHTransactionResponseDto, BankList, CountriesDto, CreditCardRequestDto, CryptoMethodDTO, PaymentResult, StatesDto, TransactionResponse, zPayPaymentRequest, zPayPaymentResponse } from '../Models/cashier-models';
import { AuthenticationDto, PlayerDto, PlayerTransactionDTO } from '../Models/models';
import { handleError } from './error';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CashierService {
  constructor(private httpClient: HttpClient) {}

  GetToken(auth: AuthenticationDto) {
    return {
      headers: new HttpHeaders({
        Authorization: `Token ${btoa(`${auth.AccountName}:${atob(auth.Password)}`)}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  GetPlayerAvailableBalance(player: any): Observable<number> {
    const url = `${environment.webAPI1}Cashier/GetPlayerAvailableBalance?idPlayer=${player.IdPlayer}`;
    return this.httpClient
      .get<number>(
        url,
        this.GetToken({
          AccountName: player.Player,
          Password: player.Password,
          Token: '',
        })
      )
      .pipe(catchError(handleError));
  }

  GetAllPlayerTransactions(player: any, idPlayer: number, type: string): Observable<PlayerTransactionDTO[]> {
    const url = `${environment.webAPI1}Cashier/GetAllPlayerTransactions?idPlayer=${idPlayer}&type=${type}`;
    return this.httpClient
      .get<PlayerTransactionDTO[]>(
        url,
        this.GetToken({
          AccountName: player.Player,
          Password: player.Password,
          Token: '',
        })
      )
      .pipe(catchError(handleError));
  }

  GetAllActiveMethods(): Observable<CryptoMethodDTO[]> {
    const url = `${environment.webAPI1}Cashier/GetAllActiveMethods`;
    return this.httpClient.get<CryptoMethodDTO[]>(url).pipe(catchError(handleError));
  }

  CancelPlayerTransaction(player: any, idTransaction: number): Observable<CryptoMethodDTO[]> {
    const url = `${environment.webAPI1}Cashier/CancelPlayerTransaction?idPlayer=${player.IdPlayer}&idTransaction=${idTransaction}`;
    return this.httpClient
      .get<CryptoMethodDTO[]>(
        url,
        this.GetToken({
          AccountName: player.Player,
          Password: player.Password,
          Token: '',
        })
      )
      .pipe(catchError(handleError));
  }

  InsertTransaction(player: PlayerDto, transaction: PlayerTransactionDTO): Observable<PlayerTransactionDTO> {
    const url = `${environment.webAPI1}Cashier/InsertTransaction`;
    return this.httpClient
      .post<PlayerTransactionDTO>(
        url,
        transaction,
        this.GetToken({
          AccountName: player.Player,
          Password: player.Password,
          Token: '',
        })
      )
      .pipe(catchError(handleError));
  }

  CrditCardPayment(player: any, transaction: CreditCardRequestDto): Observable<TransactionResponse> {
    const url = `${environment.webAPI1}Cashier/CreditCard`;
    return this.httpClient
      .post<TransactionResponse>(
        url,
        transaction,
        this.GetToken({
          AccountName: player.Player,
          Password: player.Password,
          Token: '',
        })
      )
      .pipe(catchError(handleError));
  }

  ACHCardPayment(player: any, transaction: ACHTransactionRequestDto): Observable<ACHTransactionResponseDto> {
    const url = `${environment.webAPI1}Cashier/ACHTransaction`;
    return this.httpClient
      .post<ACHTransactionResponseDto>(
        url,
        transaction,
        this.GetToken({
          AccountName: player.Player,
          Password: player.Password,
          Token: '',
        })
      )
      .pipe(catchError(handleError));
  }

  CryptoPayment(player: any, amount: number, coin: string): Observable<PaymentResult> {
    const url = `${environment.webAPI1}Cashier/RequestAddress?amount=${amount}&coin=${coin}`;
    return this.httpClient
      .post<PaymentResult>(
        url,
        {},
        this.GetToken({
          AccountName: player.Player,
          Password: player.Password,
          Token: '',
        })
      )
      .pipe(catchError(handleError));
  }

  CryptoPayout(player: any, amount: number, coin: string, address: string): Observable<PaymentResult> {
    const url = `${environment.webAPI1}Cashier/RequestPayout?amount=${amount}&coin=${coin}&address=${address}`;
    return this.httpClient
      .post<PaymentResult>(
        url,
        {},
        this.GetToken({
          AccountName: player.Player,
          Password: player.Password,
          Token: '',
        })
      )
      .pipe(catchError(handleError));
  }

  GetCountries(): Observable<CountriesDto[]> {
    const url = `${environment.webAPI1}Cashier/getcountrycodes`;
    return this.httpClient.get<CountriesDto[]>(url).pipe(catchError(handleError));
  }

  GetStates(country: string): Observable<StatesDto[]> {
    const url = `${environment.webAPI1}Cashier/getStates?countryCode=${country}`;
    return this.httpClient.get<StatesDto[]>(url).pipe(catchError(handleError));
  }

  GetBanks(): Observable<BankList> {
    const url = `${environment.webAPI1}Cashier/GetBanks`;
    return this.httpClient.get<BankList>(url).pipe(catchError(handleError));
  }

  SubmitZellePayment(player: any, request: zPayPaymentRequest): Observable<zPayPaymentResponse> {
    const url = `${environment.webAPI1}Cashier/SubmitPayment`;
    return this.httpClient
      .post<zPayPaymentResponse>(
        url,
        request,
        this.GetToken({
          AccountName: player.Player,
          Password: player.Password,
          Token: '',
        })
      )
      .pipe(catchError(handleError));
  }
}
