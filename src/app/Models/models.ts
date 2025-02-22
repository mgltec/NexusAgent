

export class AgentLoginDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.Username = initial.Username;
    this.Password = initial.Password;
    this.Ip = initial.Ip;

  }
  public Username: string;
  public Password: string;
  public Ip: string;
}

export class AgentSessionDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.Master = initial.Master;
    this.IdAgentSelected = initial.IdAgentSelected;
    this.AgentSelected = initial.AgentSelected;
    this.RangeDateSelected = initial.RangeDateSelected;
    this.WeekList = initial.WeekList;
  }
  public Master: AgentDto;
  public IdAgentSelected: number;
  public AgentSelected: string;
  public RangeDateSelected: number;
  public WeekList: any[] = [];
}

export class AgentDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.Agent = initial.Agent;
    this.Enable = initial.Enable;
    this.OnlineAccess = initial.OnlineAccess;
    this.IsDistributor = initial.IsDistributor;
    this.IsDistributed = initial.IsDistributed;
    this.IdCurrency = initial.IdCurrency;
    this.IdBook = initial.IdBook;
    this.OnlineMessage = initial.OnlineMessage;
    this.CurrentBalance = initial.CurrentBalance;
    this.ThisWeek = initial.ThisWeek;
    this.LastWeek = initial.LastWeek;
    this.MakeUp = initial.MakeUp;
    this.LastWeekMakeUp = initial.LastWeekMakeUp;
    this.Distributor = initial.Distributor;
    this.IdAgentType = initial.IdAgentType;
    this.AgentType = initial.AgentType;
    this.CommSports = initial.Password;
    this.CommCasino = initial.CommCasino;
    this.CommHorses = initial.CommHorses;
    this.IdAgentPerHead = initial.IdAgentPerHead;
    this.IdLineType = initial.IdLineType;
    this._bErrorCode = initial._bErrorCode;
    this._sErrorMsg = initial._sErrorMsg;
    this._sErrorMsgKey = initial._sErrorMsg;
    this.Password = initial.Password;
  }
  public IdAgent: number;
  public Agent: string;
  public Enable: boolean;
  public OnlineAccess: boolean;
  public IsDistributor: boolean;
  public IsDistributed: boolean;
  public IdCurrency: number;
  public IdBook: number;
  public OnlineMessage: string;
  public CurrentBalance: number;
  public ThisWeek: number;
  public LastWeek: number;
  public MakeUp: number;
  public LastWeekMakeUp: number;
  public Distributor: number;
  public IdAgentType: number;
  public AgentType: string;
  public CommSports: number;
  public CommCasino: number;
  public CommHorses: number;
  public IdAgentPerHead: number;
  public IdLineType: number;
  public _bErrorCode: string;
  public _sErrorMsg: string;
  public _sErrorMsgKey: string;
  public Password: string;
}

export class WeekRangeDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.Start = initial.Start;
    this.End = initial.End;
  }
  public Start: string;
  public End: string;
}


export class RequestAgentPositionDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.LineType = initial.LineType;
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
    this.AllGame = initial.AllGame;
    this.ShowFutures = initial.ShowFutures;
  }
  public IdAgent: number;
  public LineType: string;
  public StartDate: string;
  public EndDate: string;
  public AllGame: number;
  public ShowFutures: boolean;
}

export class ResultAgentPosition {
  constructor(initial?: any) {
    initial = initial || {};
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
    this.ShowFutures = initial.ShowFutures;
    this.ListGame = initial.ListGame;
  }
  public StartDate: string;
  public EndDate: string;
  public ShowFutures: boolean;
  public ListGame: CPositionGame[] = [];
}

export class CPositionGame {
  constructor(initial?: any) {
    initial = initial || {};
    this._idgame = initial._idgame;
    this._idsport = initial._idsport;
    this._gamedatetime = initial._gamedatetime;
    this.ListDetail = initial.ListDetail;
  }
  public _idgame: string;
  public _idsport: string;
  public _gamedatetime: string;
  public ListDetail: CPositionDetail[] = [];
}

export class CPositionDetail {
  constructor(initial?: any) {
    initial = initial || {};
    this._title1 = initial._title1;
    this._title2 = initial._title2;
    this._title3 = initial._title3;
    this._title4 = initial._title4;
    this._title5 = initial._title5;
    this._title6 = initial._title6;
    this._title7 = initial._title7;
    this._title8 = initial._title8;
    this._title9 = initial._title9;
  }
  public _title1: string;
  public _title2: string;
  public _title3: string;
  public _title4: string;
  public _title5: string;
  public _title6: string;
  public _title7: string;
  public _title8: string;
  public _title9: string;

}

export class RequestAgentPositionDetail {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.IdGame = initial.IdGame;
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
    this.IdCurrency = initial.IdCurrency;
  }
  public IdAgent: number;
  public IdGame: number;
  public StartDate: string;
  public EndDate: string;
  public IdCurrency: number;
}
export class AgentListModel {
  constructor(initial?: any) {
    initial = initial || {};
    this.idAgent = initial.idAgent;
    this.agent = initial.agent;
  }
  public idAgent: number;
  public agent: string;
}

export class AgentDistributionRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.prmIdAgent = initial.prmIdAgent;
    this.prmAgent = initial.prmAgent;
    this.prmStartDate = initial.prmStartDate;
    this.prmIsDetail = initial.prmIsDetail;
    this.prmIdCurrency = initial.prmIdCurrency;
  }
  public prmIdAgent: number;
  public prmAgent: string;
  public prmStartDate: string;
  public prmIsDetail: boolean;
  public prmIdCurrency: string;
}


export class RequestPlayerListModel {
  constructor(initial?: any) {
    initial = initial || {};

    this.idAgent = initial.idAgent;
  }
  public idAgent: number;
}

export class CustomerPerformanceRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.prmidAgent = initial.prmidAgent;
    this.prmidPlayer = initial.prmidPlayer;
    this.prminitDate = initial.prminitDate;
    this.prmendDate = initial.prmendDate;
    this.prmgroup = initial.prmgroup;
  }
  public prmidAgent: number;
  public prmidPlayer: string;
  public prminitDate: string;
  public prmendDate: string;
  public prmgroup: string;
}


export class AgentWagersRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.prmIdAgent = initial.prmIdAgent;
    this.prmIdPlayer = initial.prmIdPlayer;
    this.prmStartDate = initial.prmStartDate;
    this.prmEndDate = initial.prmEndDate;
    this.prmSort = initial.prmSort;
    this.prmUnit = initial.prmUnit;
    this.prmWagerType = initial.prmWagerType;
    this.prmResult = initial.prmResult;
  }
  public prmIdAgent: number;
  public prmIdPlayer: number;
  public prmStartDate: string;
  public prmEndDate: string;
  public prmSort: number;
  public prmUnit: string;
  public prmWagerType: number;
  public prmResult: number;
}

export class AgentWagersTicketRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.prmIdAgent = initial.prmIdAgent;
    this.prmIdPlayer = initial.prmIdPlayer;
    this.prmWagerType = initial.prmWagerType;
    this.prmIdSport = initial.prmIdSport;
    this.prmMenorque = initial.prmMenorque;
    this.prmMayorque = initial.prmMayorque;
  }
  public prmIdAgent: number;
  public prmIdPlayer: number;
  public prmWagerType: number;
  public prmIdSport: string;
  public prmMenorque: number;
  public prmMayorque: number;

}

export class AgentDeleteWagerRightsRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
  }
  public IdAgent: number;
}

export class AgentDeleteWagerRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdWager = initial.IdWager;
    this.IdAgent = initial.IdAgent;
    this.Url = initial.Url;
    this.Ip = initial.Ip;
  }
  public IdWager: string;
  public IdAgent: number;
  public Url: string;
  public Ip: string;
}

export class PlayerLinesRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.idPlayer = initial.idPlayer;
    this.idSport = initial.idSport;
    this.idAgent = initial.idAgent
  }
  public idPlayer: string;
  public idSport: string;
  public idAgent: string;
}

export class ScoresHistoryRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.Date = initial.Date;
    this.IdSport = initial.IdSport;
  }
  public Date: string;
  public IdSport: string;
}

export class PlayerLoginHistoryRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.idAgent = initial.idAgent;
    this.idPlayer = initial.idPlayer;
    this.startDate = initial.startDate;
    this.endDate = initial.endDate;
    this.source = initial.group;
  }
  public idAgent: number;
  public idPlayer: number;
  public startDate: string;
  public endDate: string;
  public source: number;
}

export class PlayerChangesHistoryRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.idAgent = initial.idAgent;
    this.idPlayer = initial.idPlayer;
    this.startDate = initial.startDate;
    this.endDate = initial.endDate;
  }
  public idAgent: number;
  public idPlayer: number;
  public startDate: string;
  public endDate: string;
}


export class PlayerAdjustmentHistoryRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.idAgent = initial.idAgent;
    this.idPlayer = initial.idPlayer;
    this.startDate = initial.startDate;
    this.endDate = initial.endDate;
  }
  public idAgent: number;
  public idPlayer: number;
  public startDate: string;
  public endDate: string;
}


export class AgentDataDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.Agent = initial.Agent;
  }
  public IdAgent: number;
  public Agent: string;
}

export class AgentLimitsDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.maxCreditLimit = initial.maxCreditLimit;
    this.maxWagerLimit = initial.maxWagerLimit;
    this.maxTempCreditLimit = initial.maxTempCreditLimit;
    this.maxOnlineMaxWager = initial.maxOnlineMaxWager;
    this.maxWeekFreeplay = initial.maxWeekFreeplay;
  }
  public maxCreditLimit: number;
  public maxWagerLimit: number;
  public maxTempCreditLimit: number;
  public maxOnlineMaxWager: number;
  public maxWeekFreeplay: number;
}


export class AgentDaySheetNewAgentDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IsPlayer = initial.IsPlayer;
    this.Id = initial.Id;
    this.Name = initial.Name;
    this.Day1 = initial.Day1;
    this.Day2 = initial.Day2;
    this.Day3 = initial.Day3;
    this.Day4 = initial.Day4;
    this.Day5 = initial.Day5;
    this.Day6 = initial.Day6;
    this.Day7 = initial.Day7;
    this.Pending = initial.Pending;
    this.Balance = initial.Balance;
    this.PreviousWeek = initial.PreviousWeek;
    this.TransactionsInWeek = initial.TransactionsInWeek;
    this.SettleFigure = initial.SettleFigure;
    this.Total = initial.Total;
    this.Parent = initial.Parent;
    this.TransactionsCount = initial.TransactionsCount;
    this.Depth = initial.Depth;
    this.Players = initial.Players;
    this.Agents = initial.Agents;
    this.Show = initial.Show;
    this.Opened = initial.Opened;
  }
  public IsPlayer: boolean;
  public Id: number;
  public Name: string;
  public Day1: number;
  public Day2: number;
  public Day3: number;
  public Day4: number;
  public Day5: number;
  public Day6: number;
  public Day7: number;
  public Pending: number;
  public Balance: number;
  public PreviousWeek: number;
  public TransactionsInWeek: number;
  public SettleFigure: number;
  public Total: number;
  public Parent: number;
  public TransactionsCount: number;
  public Depth: number;
  public Opened: boolean;
  public Show: boolean;
  public Players: AgentDaySheetNewAgentDto[] = [];
  public Agents: AgentDaySheetNewAgentDto[] = [];

}

export class DaySheetForNewAgentRequestDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.WeekDate = initial.WeekDate;
    this.ActionType = initial.ActionType;
    this.ReportOrderBy = initial.ReportOrderBy;
  }
  public IdAgent: number;
  public WeekDate: string;
  public ActionType: string;
  public ReportOrderBy: string;
}

export class PlayerHistoryByDayDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.Agent = initial.Agent;
    this.Player = initial.Player;
    this.Result01 = initial.Result01;
    this.Result02 = initial.Result02;
    this.Result03 = initial.Result03;
    this.Result04 = initial.Result04;
    this.Result05 = initial.Result05;
    this.Result06 = initial.Result06;
    this.Result07 = initial.Result07;
    this.Result08 = initial.Result08;
    this.Result09 = initial.Result09;
    this.Result10 = initial.Result10;
  }
  public Agent: string;
  public Player: string;
  public Result01: string;
  public Result02: string;
  public Result03: string;
  public Result04: string;
  public Result05: string;
  public Result06: string;
  public Result07: string;
  public Result08: string;
  public Result09: number;
  public Result10: string;
}

export class GetPlayerHistoryRequesDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.IdPlayer = initial.IdPlayer;
    this.WeekDay = initial.WeekDay;
    this.ReportDayNumber = initial.ReportDayNumber;

  }
  public IdAgent: number;
  public IdPlayer: number;
  public WeekDay: string;
  public ReportDayNumber: number;

}


export class DaySheetClassicRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.WeekDate = initial.WeekDate;
    this.ActionType = initial.ActionType;
    this.OrderByColumn = initial.OrderByColumn;
    this.OrderByDirection = initial.OrderByDirection;
  }
  public IdAgent: number;
  public WeekDate: string;
  public ActionType: string;
  public OrderByColumn: string;
  public OrderByDirection: string;

}

export class DaySheetClassicForHeadersRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.WeekDate = initial.WeekDate;
  }
  public IdAgent: number;
  public WeekDate: string;
}

export class AgentAllowTransferRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;

  }
  public IdAgent: number;
}

export class AgentAllowSettleFigureColumn {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;

  }
  public IdAgent: number;
}

export class PlayerLatestTransactionRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdPlayer = initial.IdPlayer;

  }
  public IdPlayer: number;
}


export class InsertPlayerTransactionRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IDPlayer = initial.IDPlayer;
    this.Detail = initial.Detail;
    this.Amount = initial.Amount;
    this.Type = initial.Type;
  }
  public IDPlayer: number;
  public Detail: string;
  public Amount: number;
  public Type: string;
}

export class PlayerBalanceInformationRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdPlayer = initial.IdPlayer;

  }
  public IdPlayer: number;
}



export class AgentLatestTransactionRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;

  }
  public IdAgent: number;
}

export class InsertAgentTransactionRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IDAgent = initial.IDAgent;
    this.Description = initial.Description;
    this.Amount = initial.Amount;
    this.Type = initial.Type;
    this.Date = initial.Date;
    this.PreviousBalance = initial.PreviousBalance;
  }
  public IDAgent: number;
  public Description: string;
  public Amount: number;
  public Type: string;
  public Date: string;
  public PreviousBalance: string;
}


export class AgentInformationRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;

  }
  public IdAgent: number;
}


export class EditAgentInformationRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IDAgent = initial.IDAgent;
    this.Agent = initial.Agent;
    this.Password = initial.Password;
    this.Name = initial.Name;
    this.Address1 = initial.Address1;
    this.Address2 = initial.Address2;
    this.City = initial.City;
    this.State = initial.State;
    this.Country = initial.Country;
    this.Zip = initial.Zip;
    this.Phone = initial.Phone;
    this.Fax = initial.Fax;
    this.Email = initial.Email;
    this.OnlineMessage = initial.OnlineMessage;

  }
  public IDAgent: number;
  public Agent: string;
  public Password: string;
  public Name: string;
  public Address1: string;
  public Address2: string;
  public City: string;
  public State: string;
  public Country: string;
  public Zip: string;
  public Phone: string;
  public Fax: string;
  public Email: string;
  public OnlineMessage: string;
}


export class PlayerHistoryRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IDAgent = initial.IDAgent;
    this.IDPlayer = initial.IDPlayer;
    this.Begin = initial.Begin;
    this.End = initial.End;
  }
  public IDAgent: number;
  public IDPlayer: number;
  public Begin: string;
  public End: string;
}



export class PlayerInformationRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdPlayer = initial.IdPlayer;

  }
  public IdPlayer: number;
}


export class EditPlayerInformationRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdPlayer = initial.IdPlayer;
    this.Status = initial.Status;
    this.EnableSports = initial.EnableSports;
    this.OnlineAccess = initial.OnlineAccess;
    this.EnableCasino = initial.EnableCasino;
    this.EnableHorses = initial.EnableHorses;
    this.EnableCards = initial.EnableCards;
    this.Name = initial.Name;
    this.LastName = initial.LastName;
    this.SettledFigure = initial.SettledFigure;
    this.Password = initial.Password;
    this.OnlinePassword = initial.OnlinePassword;
    this.CreditLimit = initial.CreditLimit;
    this.OnlineMaxWager = initial.OnlineMaxWager;
    this.OnlineMinWager = initial.OnlineMinWager;
    this.MaxWager = initial.MaxWager;
    this.MinWager = initial.MinWager;
    this.TempCredit = initial.TempCredit;
    this.TempCreditExpire = initial.TempCreditExpire;

  }
  public IdPlayer: number;
  public Status: string;
  public EnableSports: boolean;
  public OnlineAccess: boolean;
  public EnableCasino: boolean;
  public EnableHorses: boolean;
  public EnableCards: boolean;
  public Name: string;
  public LastName: string;
  public SettledFigure: number;
  public Password: string;
  public OnlinePassword: string;
  public CreditLimit: number;
  public OnlineMaxWager: number;
  public OnlineMinWager: number;
  public MaxWager: number;
  public MinWager: number;
  public TempCredit: number;
  public TempCreditExpire: string;
}

export class AgentRedFigureRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.Week = initial.DateInit;
  }
  public IdAgent: number;
  public Week: string;
}

export class PlayerHistoryAdvanceRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.IdPlayer = initial.IdPlayer;
    this.Begin = initial.Begin;
    this.End = initial.End;
  }
  public IdAgent: number;
  public IdPlayer: any = null;
  public Begin: string;
  public End: string;

}

export class PlayerIPAccessRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.Player = initial.Player;
    this.Begin = initial.Begin;
    this.End = initial.End;
  }
  public Player: string;
  public Begin: string;
  public End: string;

}

export class InactivePlayersRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
  }
  public IdAgent: number;
}


export class CasinoDayHandleRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.Player = initial.Player;
    this.Date = initial.Date;
  }
  public Player: string;
  public Date: string;
}

export class CasinoGameDetailsRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.Player = initial.Player;
    this.Date = initial.Date;
  }
  public Player: string;
  public Date: string;
}

export class CasinoGameHandsRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.Player = initial.Player;
    this.Date = initial.Date;
  }
  public Player: string;
  public Date: string;
}

export class DaySheetPlusRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.WeekDate = initial.WeekDate;
    this.ActionType = initial.ActionType;
    this.OrderByColumn = initial.OrderByColumn;
    this.OrderByDirection = initial.OrderByDirection;
  }
  public IdAgent: number;
  public WeekDate: string;
  public ActionType: string;
  public OrderByColumn: string;
  public OrderByDirection: string;

}

export class RowColorListRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IDAgent = initial.IDAgent;

  }
  public IDAgent: number;

}

export class SavePlayerColorRowRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IDAgent = initial.IDAgent;
    this.IDPlayer = initial.IDPlayer;
    this.Color = initial.Color;

  }
  public IDAgent: number;
  public IDPlayer: number;
  public Color: string;

}

export class SavePlayerNoteRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IDAgent = initial.IDAgent;
    this.IDPlayer = initial.IDPlayer;
    this.Note = initial.Note;

  }
  public IDAgent: number;
  public IDPlayer: number;
  public Note: string;

}

export class InsertSMSAgentAlertRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdPlayer = initial.IdPlayer;
    this.PhoneNumber = initial.PhoneNumber;
    this.IsActive = initial.IsActive;
    this.WagerAmount = initial.WagerAmount;

  }
  public IdPlayer: number;
  public PhoneNumber: string;
  public IsActive: boolean;
  public WagerAmount: number;

}

export class SavePlayerOnlineMessageRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IDPlayer = initial.IDPlayer;
    this.Message = initial.Note;

  }
  public IDPlayer: number;
  public Message: string;

}

export class GetPlayerMessageRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IDPlayer = initial.IDPlayer;

  }
  public IDPlayer: number;

}

export class SMSBetAlertRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;

  }
  public IdAgent: number;

}

export class SMSAgentAlertResult {
  IdAgent: number = 0;
  IdPlayer: number = 0;
  PhoneNumber: string = "";
  IsActive: boolean = false;
  WagerAmount: number = 0;
  Player: string = "";
}

export class DaySheetLiveRequest {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.WeekDate = initial.WeekDate;
    this.ActionType = initial.ActionType;
    this.OrderByColumn = initial.OrderByColumn;
    this.OrderByDirection = initial.OrderByDirection;
  }
  public IdAgent: number;
  public WeekDate: string;
  public ActionType: string;
  public OrderByColumn: string;
  public OrderByDirection: string;

}

export class Node {
  Agent: string = "";
  IdAgent: number = 0;
  children: Node[] = [];
  expanded: boolean = true;
}

export class PlayerStandingDto {
  Agent: string = "";
  IdAgent: number = 0;
  TotalThisWeek: number = 0;
  TotalAtRisk: number = 0;
  TotalCurrentBalance: number = 0;
  TotalSport: number = 0;
  TotalHorses: number = 0;
  TotalCasino: number = 0;
  Players: PlayerStandingSpDto[] = [];
}

export class AgentCashFlowResponseDto {
  Agent: string = "";
  IdAgent: number = 0;
  Player: string = "";
  IdPlayer: number = 0;
  LastModification: string = "";
  PlacedDate: string = "";
  PaymentMethod: string = "";
  Reference: string = "";
  Description: string = "";
  Credits: number = 0;
  Debits: number = 0;
  Amount: number = 0;
  Fee: number = 0;
  Bonus: number = 0;
  Type: string = "";
  TransType: string = "";
  IdTransaction: number = 0;
  Idx: number = 0;
}

export class PlayerStandingSpDto {
  Agent: string = "";
  IdAgent: number = 0;
  Player: string = "";
  IdPlayer: number = 0;
  Password: number = 0;
  CreditLimit: number = 0;
  AmountAtRisk: number = 0;
  CurrentBalance: number = 0;
  ThisWeekSports: number = 0;
  ThisWeekHorses: number = 0;
  ThisWeekCasino: number = 0;
  TCurrentBalance: number = 0;
  Symbol: number = 0;
  Currency: number = 0;
}

export class PlayerActionDto {
  Agent: string = "";
  TStraightbet: number = 0;
  TParlay: number = 0;
  TTeaser: number = 0;
  TReverse: number = 0;
  TCasino: number = 0;
  THorses: number = 0;
  TOtherWagers: number = 0;
  TOtherAdjustment: number = 0;
  THorseAdjustment: number = 0;
  TTotal: number = 0;
  Players: PlayerActionSpDto[] = [];
  Table: any = [];
  PcPlayed: number = 0;
  PcHits: number = 0;
  PcHAmount: number = 0;
}

export class PlayerActionSpDto {
  Agent: string = "";
  IdPlayer: string = "";
  Straightbet: number = 0;
  Parlay: number = 0;
  Teaser: number = 0;
  Reverse: number = 0;
  Casino: number = 0;
  OtherWagers: number = 0;
  OtherAdjustment: number = 0;
  HorseAdjustment: number = 0;
  Total: number = 0;
  Password: string = "";
  Horses: number = 0;
}

export class PlayerTotalsDto {
  IdAgent: number = 0;
  Agent: string = "";
  TRiskOpen: number = 0;
  TRiskGraded: number = 0;
  TWin: number = 0;
  TLose: number = 0;
  TNet: number = 0;
  Players: PlayerTotalsSpDto[] = [];
}

export class PlayerTotalsSpDto {
  Agent: string = "";
  IdAgent: number = 0;
  IdPlayer: number = 0;
  Player: string = "";
  LastWager: string = "";
  TotalRiskOpen: number = 0;
  TotalRiskGraded: number = 0;
  Win: number = 0;
  Lose: number = 0;
  Net: number = 0;
  Currency: string = "";
  CurrentBalance: number = 0;
}


export class AgentGrossWeekDto {
  IdAgent: number = 0;
  Agent: string = "";
  TBalFwd: number = 0;
  TPmts: number = 0;
  TCasino: number = 0;
  TSports: number = 0;
  THorses: number = 0;
  TTotalWeek: number = 0;
  Players: AgentGrossWeekSpDto[] = [];
}

export class AgentGrossWeekSpDto {
  Agent: string = "";
  IdAgent: number = 0;
  IdPlayer: number = 0;
  Player: string = "";
  BalFwd: number = 0;
  Pmts: number = 0;
  casinoweek: number = 0;
  sportsweek: number = 0;
  horsesweek: number = 0;
  TotalWeek: number = 0;
}

export class AgentPlayerHistorySpDto {
  TempId: number = 0;
  Agent: string = "";
  Player: string = "";
  IdTrans: number = 0;
  PhoneLine: number = 0;
  PlacedDate: string = "";
  CompleteDesc: string = "";
  RiskAmount: number = 0;
  WinAmount: number = 0;
  Result: number = 0;
  TicketNumber: number = 0;
  LoginName: string = "";
  Amount: number = 0;
  IdWagerDetail: number = 0;
  IdSport: string = "";
  DetailDesc: string = "";
}

export class AgentPlayerHistoryScoreDto {
  IdGame: number = 0;
  VisitorTeam: string = "";
  HomeTeam: string = "";
  VisitorScore: number = 0;
  HomeScore: number = 0;
  CompleteDescription: string = "";
  Result: number = 0;
}

export class AgentWeeklyPaymentsResponseDTO {
  Agent: string = "";
  Player: string = "";
  Day1: number = 0;
  Day2: number = 0;
  Day3: number = 0;
  Day4: number = 0;
  Day5: number = 0;
  Day6: number = 0;
  Day7: number = 0;

}

export class AgentSettledFiguresResponseDTO {
  Agent: string = "";
  Players: SettledFiguresSpResponseDTO[] = [];
}

export class SettledFiguresSpResponseDTO {
  IdPlayer: number = 0;
  Player: string = "";
  IdCurrency: number = 0;
  Agent: string = "";
  SettledFigure: number = 0;
  TotalWeek: number = 0;
  Pmts: number = 0;
  BalFwd: number = 0;
  CurrentBalance: number = 0;

}

export class AgentPlayerAdjustmentResponseDTO {
  Agent: string = "";
  Total: number = 0;
  Players: AgentPlayerAdjustmentResponseSpDTO[] = [];
}

export class AgentPlayerAdjustmentResponseSpDTO {
  tempId: number = 0;
  IdAccount: number = 0;
  IdTrasaction: number = 0;
  Type: string = "";
  Agent: string = "";
  Player: string = "";
  Date: string = "";
  Reference: string = "";
  Description: string = "";
  TransactionType: number = 0;
  Amount: number = 0;
  PlacedDate: string = "";
  User: string = "";
  RecLeft: string = "";

}

export class GetReportAgentHistoryDto {
  IdAgentAccounting: number = 0;
  IdAgent: number = 0;
  IdTransaction: number = 0;
  TransactionType: string = "";
  Description: string = "";
  Amount: number = 0;
  MoneyChange: number = 0;
  LastModification: string = "";
  LoginName: string = "";
  Balance: number = 0;
}

//***************************************/

export class OpenBetsResult {
  Player: string = "";
  Agent: string = "";
  Details: OpenBetsDetailsResult[] = [];
}

export class OpenBetsDetailsResult {
  Placed: string = "";
  UserPhone: string = "";
  RiskWin: string = "";
  Ticket: string = "";
  TicketDetails: OpenBetWagerDetails[] = [];
}

export class OpenBetWagerDetails {
  GameDate: string = "";
  Sport: string = "";
  Description: string = "";
}

export class OpenWagerCurrencies {
  IdCurrency: number = 0;
  Currency: string = "";
}

export class OpenWagerSports {
  IdSport: string = "";
}

export class OpenWagerPlayers {
  IdPlayer: number = 0;
  Agent: string = "";
  Player: string = "";
  Len: number = 0;
}

export class OpenWagerTypes {
  WagerType: number = 0;
  Description: string = "";
}

export class OpenBetsRequest {
  IdAgent: number = 0;
  IdPlayer: number = -1;
  WagerType: number = -1;
  IdSport: string = "ALL";
}

export class RequestWeeklyBalanceClassic {
  DateInit: string = "";
  IdAgent: number = 0;
  Agent: string = "";
  TransactionType: number = -1;
}

export class WeeklyBalanceClassic {
  Agent: string = "";
  IsDistribuitor: boolean = false;
  TBalFwd: number = 0;
  TMon: number = 0;
  TTue: number = 0;
  TWed: number = 0;
  TThu: number = 0;
  TFri: number = 0;
  TSat: number = 0;
  TSun: number = 0;
  TThisWeek: number = 0;
  TPmts: number = 0;
  TBalance: number = 0;
  TSettFig: number = 0;
  DateInit: string = "";
  DateEnd: string = "";
  Players: WeeklyBalancePlayers[] = [];
}

export class WeeklyBalancePlayers {
  Player: number = 0;
  BalFwd: number = 0;
  Mon: number = 0;
  Tue: number = 0;
  Wed: number = 0;
  Thu: number = 0;
  Fri: number = 0;
  Sat: number = 0;
  Sun: number = 0;
  ThisWeek: number = 0;
  Pmts: number = 0;
  Balance: number = 0;
  SettFig: number = 0;

}

export class PlayerIpLoginDto {
  IdPlayer: number = 0;
  Player: string = "";
  IdAgent: number = 0;
  Agent: string = "";
  Ip: string = "";
  LoginTotal: number = 0;
  Country: any;
}

export class DuplicateIpDto {
  Ip: string = "";
  Players: PlayerIpLoginDto[] = [];
}


export class GetIPLoginDto {
  IdAgent: number = 0;
  Agent: string = "";
  Players: PlayerIpLoginDto[] = [];

}

export class GetAgentPlayerDto {
  IdPlayer: number = 0;
  Player: string = "";
}

export class GetPlayersTelegramSubcribedDto {
  Id: number = 0;
  IdPlayer: number = 0;
  Player: string = "";
  IdTelegramChat: number = 0;
}

export class GetSubAgentsDto {
  AgentId: number = 0;
  Agent: string = "";
}

export class WebRowGetListDTO {
  IdWebRow: number = 0;
  Description: string = "";
}

export class HiddenLeagueRequestDTO {
  IdWebRow: number = 0;
  IdAgent: number = 0;
}

export class HiddenLeagueResponseDTO {
  IdAgent: number = 0;
  IdLeague: number = 0;
  Description: string = "";
  Enable: boolean = false;
  ShowHiddenLeagueAt: number = 0;
  ApplyTempAlways: boolean = false;
}

export class HiddenLeaguesInsertDto {
  IdWebRow: number = 0;
  IdAgent: number = 0;
  NewHidden: HiddenLeagueResponseDTO[] = [];
}

// export class HiddenLeagueInsertDTO {
//   IdAgent: number = 0;
//   IdLeague: number = 0;
//   Enable: boolean = false;
// }

export class GetBeatTheLineRequestDto {
  IdAgent: number = 0;
  IdPlayer: number = 0;
  DateFrom: string = "";
  DateTo: string = "";
  BeaterOnly: boolean = false;
}

export class GetBeatTheLineResultDto {
  IdPlayer: number = 0;
  Player: string = "";
  IdWager: number = 0;
  PlacedDate: string = "";
  WagerType: string = "";
  Sport: string = "";
  GameDate: string = "";
  Description: string = "";
  Line: string = "";
  CloseLine: string = "";
  Result: string = "";
  BetResult: string = "";
}

export class AgentCommissionDto {
  TPDay1: number = 0;
  TPDay2: number = 0;
  TPDay3: number = 0;
  TPDay4: number = 0;
  TPDay5: number = 0;
  TPDay6: number = 0;
  TPDay7: number = 0;
  TCDay1: number = 0;
  TCDay2: number = 0;
  TCDay3: number = 0;
  TCDay4: number = 0;
  TCDay5: number = 0;
  TCDay6: number = 0;
  TCDay7: number = 0;
  Pmts: number = 0;
  Balance: number = 0;
  TotalPlayerActive: number = 0;
  SubAgents: AgentCommAgentDto[] = [];
}

export class AgentCommAgentDto {
  Agent: string = "";
  TDay1: number = 0;
  TDay2: number = 0;
  TDay3: number = 0;
  TDay4: number = 0;
  TDay5: number = 0;
  TDay6: number = 0;
  TDay7: number = 0;
  TWeek: number = 0;
  Commission: number = 0;
  NewMakeUp: number = 0;
  Players: AgentCommPlayerDto[] = [];

}

export class AgentCommPlayerDto {
  IdPlayer: number = 0;
  Player: string = "";
  BalFwd: number = 0;
  Password: string = "";
  Day1: number = 0;
  Day2: number = 0;
  Day3: number = 0;
  Day4: number = 0;
  Day5: number = 0;
  Day6: number = 0;
  Day7: number = 0;
  Week: number = 0;
  Pmts: number = 0;
  Balance: number = 0;
  Settled: number = 0;
}

export class PlayersManagementV2Dto {
  IdPlayer: number = 0;
  IdLineType: number = 0;
  IdOffice: number = 0;
  IdAgent: number = 0;
  IdCurrency: number = 0;
  Player: string = "";
  Password: string = "";
  Status: string = "";
  CreditLimit: number = 0;
  NoLimit: number = 0;
  TempCredit: number = 0;
  OnlineMaxWager: number = 0;
  OnlineMinWager: number = 0;
  MaxWager: number = 0;
  MinWager: number = 0;
  EnableHorses: boolean = false;
  EnableSports: boolean = false;
  EnableCasino: boolean = false;
  Agent: string = "";
  LastWager: string = "";
  SettledFigure: number = 0;
  CurrentBalance: number = 0;
  LifeTimeWin: number = 0;
  LifeTimeLose: number = 0;
}

export class PlayersManagementDto {
  IdPlayer: number = 0;
  IdLineType: number = 0;
  IdOffice: number = 0;
  IdAgent: number = 0;
  IdCurrency: number = 0;
  Player: string = "";
  Password: string = "";
  Status: string = "";
  CreditLimit: number = 0;
  NoLimit: number = 0;
  TempCredit: number = 0;
  OnlineMaxWager: number = 0;
  OnlineMinWager: number = 0;
  MaxWager: number = 0;
  MinWager: number = 0;
  EnableHorses: boolean = false;
  EnableSports: boolean = false;
  EnableCasino: boolean = false;
  Agent: string = "";
  LastWager: string = "";
  SettledFigure: number = 0;
}


export class AgentPlayersManagement {
  Agent: string = "";
  IdAgent: number = 0;
  Players: PlayersManagementDto[] = [];
}

export class AgentPlayersManagementV2 {
  Agent: string = "";
  IdAgent: number = 0;
  Players: PlayersManagementV2Dto[] = [];
}

export interface AgentRightDTO {
  IdForm: number;
  IdRight: number;
  Description: string;
  System: string;
  FormName: string;
}

export class AgentPrefixDTO{
  IdAgent: number = 0;
  Agent: string = "";
  AgentLevel: number = 0;
}

export class PlayerActionReport{
  Player: string = "";
  Password: string = "";
  Parlay: number = 0;
  AmountPcPlayed: number = 0;
  PcHits: number = 0;
  PcHitsAmount: number = 0;
}