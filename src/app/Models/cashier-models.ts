export class CryptoMethodDTO {
  Id: number = 0;
  Name: string = '';
  Short: string = '';
  Active: boolean = false;
  Label: string = '';
}

export class ACHTransactionRequestDto {
  public Type: string = ''; //C - Credit, D - Debit
  public Currency: string; //USD - CAD
  public IPAddress: string;
  public RoutingNumber: string;
  public AccountNumber: string;
  public AccountType: string; //‘PC’- Personal Checking, ‘PS’- Personal Savings, ‘CC’ – Commercial Checking
  public Amount: number;

  constructor() {
    this.Type = '';
    this.Currency = '';
    this.IPAddress = '';
    this.RoutingNumber = '';
    this.AccountNumber = '';
    this.AccountType = '';
    this.Amount = 0;
  }
}

export class ErrorACH {
  public Code: string;
  public FieldName: string;
  public Description: string;

  constructor(Code: string, FieldName: string, Description: string) {
    this.Code = Code;
    this.FieldName = FieldName;
    this.Description = Description;
  }
}

export class ACHTransactionResponseDto {
  public Status: string;
  public Message: string;
  public Errors: ErrorACH[];

  constructor(Status: string, Message: string, Errors: ErrorACH[]) {
    this.Status = Status;
    this.Message = Message;
    this.Errors = Errors;
  }
}

export class CreditCardRequestDto {
  Player: string;
  NameOnCard: string;
  CardNumber: string;
  ExpiryDate: string;
  Cvv: string;
  Amount: number;
  Email: string;
  Phone: string;
  Address: string;
  ccCountry: string;
  ccState: string;
  City: string;
  Zip: string;

  constructor(player: string, nameOnCard: string, cardNumber: string, expiryDate: string, cvv: string, amount: number, email: string, phone: string, address: string, ccCountry: string, ccState: string, city: string, zip: string) {
    this.Player = player;
    this.NameOnCard = nameOnCard;
    this.CardNumber = cardNumber;
    this.ExpiryDate = expiryDate;
    this.Cvv = cvv;
    this.Amount = amount;
    this.Email = email;
    this.Phone = phone;
    this.Address = address;
    this.ccCountry = ccCountry;
    this.ccState = ccState;
    this.City = city;
    this.Zip = zip;
  }
}

export class TransactionResponse {
  Status: string;
  Message: string;

  constructor(status: string, message: string) {
    this.Status = status;
    this.Message = message;
  }
}

export class PaymentResult {
  Result: string = '';
  Status: string = '';
  Id: number = 0;
  Address: string = '';
  Coin_Amount: number = 0;
  Btc_Amount: number = 0;
  Invoice_Url: string = '';
  Date: string = '';
  Detail: string = '';

  constructor() {
    this.Result = '';
    this.Status = '';
    this.Id = 0;
    this.Address = '';
    this.Coin_Amount = 0;
    this.Btc_Amount = 0;
    this.Invoice_Url = '';
    this.Date = '';
    this.Detail = '';
  }
}

/**
 * Represents a payment with various details.
 */
export class zPayPaymentRequest {
  amount: number;
  bank_id: string
  first: string;
  last: string;
  email: string;

  constructor(amount: number, bank_id: string, first: string, last: string, email: string) {
    this.amount = amount;
    this.bank_id = bank_id;
    this.first = first;
    this.last = last;
    this.email = email;
  }
}

/**
 * Represents the response for a payment.
 */
export class zPayPaymentResponse {
    
  PaymentId: string;
    Memo: string;
    Amount: number;
    ZelleEmail: string;
    ConfirmationMethods: string[];
    Status: string;
    BankId: string;
    Email: string;
    First: string;
    Last: string;
    ApiMode: string;

  /**
   * The error message.
   */
  Error: string;

  /**
   * The error code.
   */
  ErrorCode: string;

  constructor() {
    // Initialize all properties with default values or null.
    this.PaymentId = '';
    this.Memo = '';
    this.Amount = 0;
    this.ZelleEmail = '';
    this.ConfirmationMethods = [];
    this.Status = '';
    this.BankId = '';
    this.Email = '';
    this.First = '';
    this.Last = '';
    this.ApiMode = '';

    this.Error = '';
    this.ErrorCode = '';
  }
}

/**
 * Represents the address response. Assuming it's already defined.
 */
class AddressResponse {
  // AddressResponse properties
}

/**
 * Address class for details.
 */
class Address {
  // Address properties
}

/**
 * Agent class for details.
 */
class Agent {
  // Agent properties
}

export class Bank {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

export class BankList {
  'bank-list': Bank[];

  constructor(banks: Bank[]) {
    this['bank-list'] = banks;
  }
}

export class StatesDto {
  idISOCountry: string = '';
  idISOState: string = '';
  State: string = '';
}

export class CountriesDto {
  idISO2Country: string = '';
  idISOCountry: string = '';
  Country: string = '';
}

export class PlayerDetailsDTO{
  IdPlayer: number = 0;
  Player: string = "";
  Password: string = "";
}