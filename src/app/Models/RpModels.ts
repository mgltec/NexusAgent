export class AgentPositionDetailsDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
    this.IdGame = initial.IdGame;
    this.ListDetail = initial.ListDetail;

  }
  public StartDate: string;
  public EndDate: string;
  public IdGame: number;
  public ListDetail: AgentPositionGameDetailsDto[] = [];
}

export class AgentPositionGameDetailsDto {
  constructor(initial?: any) {
    initial = initial || {};
    this._wagertype = initial._wagertype;
    this._numteam = initial._numteam;
    this._idgame = initial._idgame;
    this._parentgame = initial._parentgame;
    this._idleague = initial._idleague;
    this._idsport = initial._idsport;
    this._description = initial._description;
    this._visitorteam = initial._visitorteam;
    this._hometeam = initial._hometeam;
    this._gamedatetime = initial._gamedatetime;
    this._visitornumber = initial._visitornumber;
    this._homenumber = initial._homenumber;
    this._period = initial._period;
    this._placeddate = initial._placeddate;
    this._ticketnumber = initial._ticketnumber;
    this._wageramount = initial._wageramount;
    this._riskamount = initial._riskamount;
    this._winamount = initial._winamount;
    this._play = initial._play;
    this._points = initial._points;
    this._odds = initial._odds;
    this._completedescription = initial._completedescription;
    this._player = initial._player;
    this._password = initial._password;
    this._loginname = initial._loginname;
    this._ip = initial._ip;

  }
  public _wagertype: string;
  public _numteam: string;
  public _idgame: number;
  public _parentgame: string;
  public _idleague: string;
  public _idsport: string;
  public _description: string;
  public _visitorteam: string;
  public _hometeam: string;
  public _gamedatetime: string;
  public _visitornumber: string;
  public _homenumber: string;
  public _period: string;
  public _placeddate: string;
  public _ticketnumber: string;
  public _wageramount: string;
  public _riskamount: string;
  public _winamount: string;
  public _play: string;
  public _points: string;
  public _odds: string;
  public _completedescription: string;
  public _player: string;
  public _password: string;
  public _loginname: string;
  public _ip: string;
}

export class AgentTreeDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.Agent = initial.Agent;
    this.CurrentBalance = initial.CurrentBalance;
    this.IsDistributor = initial.IsDistributor;
    this.Level = initial.Level;
    this.Parent = initial.Parent;
    this.ListDetail = initial.ListDetail;

  }
  public IdAgent: string;
  public Agent: string;
  public CurrentBalance: number;
  public IsDistributor: boolean;
  public Level: number;
  public Parent: string;
  public ListDetail: AgentTreeDto[] = [];
}

export class RequestAgentTreeDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.Agent = initial.Agent;
  }
  public IdAgent: number;
  public Agent: string;
}

export class RequestAgentPositionV2Dto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.AllGames = initial.AllGames;
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
    this.ShowFutures = initial.ShowFutures;
    this.Sport = initial.Sport;
    this.Leagues = initial.Leagues;
    this.RotName = initial.RotName;
  }
  public IdAgent: number;
  public AllGames: number;
  public StartDate: string;
  public EndDate: string;
  public ShowFutures: number;
  public Sport: string;
  public Leagues: string;
  public RotName: string;
}

export class AgentPositionResultV2Dto {
  constructor(initial?: any) {
    initial = initial || {};
    this.idleague = initial.idleague;
    this.League = initial.League;
    this.IdGame = initial.IdGame;
    this.SportOrder = initial.SportOrder;
    this.IdSport = initial.IdSport;
    this.GameDate = initial.GameDate;
    this.PeriodDescription = initial.PeriodDescription;
    this.VisitorNumber = initial.VisitorNumber;
    this.VisitorName = initial.VisitorName;
    this.VisitorPitcher = initial.VisitorPitcher;
    this.HomeNumber = initial.HomeNumber;
    this.HomeName = initial.HomeName;
    this.HomePitcher = initial.HomePitcher;
    this.VSpread = initial.VSpread;
    this.VSpreadMM = initial.VSpreadMM;
    this.HSpread = initial.HSpread;
    this.HSpreadMM = initial.HSpreadMM;
    this.VTotal = initial.VTotal;
    this.VTotalMM = initial.VTotalMM;
    this.HTotal = initial.HTotal;
    this.HTotalMM = initial.HTotalMM;
    this.VLine = initial.VLine;
    this.VLineMM = initial.VLineMM;
    this.HLine = initial.HLine;
    this.HLineMM = initial.HLineMM;
    this.VAmeric = initial.VAmeric;
    this.VAmericMM = initial.VAmericMM;
    this.HAmeric = initial.HAmeric;
    this.HAmericMM = initial.HAmericMM;
    this.Draw = initial.Draw;
    this.DrawMM = initial.DrawMM;
    this.Parlays = initial.Parlays;
    this.Teasers = initial.Teasers;
  }
  public idleague: number;
  public League: string;
  public IdGame: number;
  public SportOrder: number;
  public IdSport: string;
  public GameDate: string;
  public PeriodDescription: string;
  public VisitorNumber: number;
  public VisitorName: string;
  public VisitorPitcher: string;
  public HomeNumber: number;
  public HomeName: string;
  public HomePitcher: string;
  public VSpread: number;
  public VSpreadMM: string;
  public HSpread: number;
  public HSpreadMM: string;
  public VTotal: number;
  public VTotalMM: string;
  public HTotal: number;
  public HTotalMM: string;
  public VLine: number;
  public VLineMM: string;
  public HLine: number;
  public HLineMM: string;
  public VAmeric: number;
  public VAmericMM: string;
  public HAmeric: number;
  public HAmericMM: string;
  public Draw: number;
  public DrawMM: string;
  public Parlays: number;
  public Teasers: number;
}

export class ReportWeeklyBalance {
  constructor(initial?: any) {
    initial = initial || {};
    this.Master = initial.Master;
    this.Agent = initial.Agent;
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
    this.AgentList = initial.agentList;

  }
  public Master: boolean;
  public Agent: string;
  public StartDate: string;
  public EndDate: string;
  public AgentList: ReportWeeklyBalanceAgent[] = [];
}

export class ReportWeeklyBalanceAgent {
  constructor(initial?: any) {
    initial = initial || {};
    this._Agent = initial._Agent;
    this._Distributor = initial._Distributor;
    this._BalFwd = initial._BalFwd;
    this._WeekDay1 = initial._WeekDay1;
    this._WeekDay2 = initial._WeekDay2;
    this._WeekDay3 = initial._WeekDay3;
    this._WeekDay4 = initial._WeekDay4;
    this._WeekDay5 = initial._WeekDay5;
    this._WeekDay6 = initial._WeekDay6;
    this._WeekDay7 = initial._WeekDay7;
    this._ThisWeek = initial._ThisWeek;
    this._Ptms = initial._Ptms;
    this._Balance = initial._Balance;
    this.PlayerList = initial.PlayerList;
    this._TotalActivePlayer = initial._TotalActivePlayer;
    this._TotalPlayers = initial._TotalPlayers;
    this._TotalAtRisk = initial._TotalAtRisk;
    this._TotalAvail = initial._TotalAvail;
    this._IdAgent = initial._IdAgent;
    this._Expanded = initial._Expanded;
  }
  public _Agent: string;
  public _Distributor: boolean;
  public _BalFwd: number;
  public _WeekDay1: number;
  public _WeekDay2: number;
  public _WeekDay3: number;
  public _WeekDay4: number;
  public _WeekDay5: number;
  public _WeekDay6: number;
  public _WeekDay7: number;
  public _ThisWeek: number;
  public _Ptms: number;
  public _Balance: number;
  public _TotalActivePlayer: number;
  public _TotalPlayers: number;
  public _TotalAtRisk: number;
  public _TotalAvail: number;
  public _IdAgent: string;
  public _Expanded: boolean = false;
  public PlayerList: ReportWeeklyBalancePlayer[] = [];
}


export class ReportWeeklyBalancePlayer {
  constructor(initial?: any) {
    initial = initial || {};
    this._IdPlayer = initial._IdPlayer;
    this._Password = initial._Password;
    this._IdCurrency = initial._IdCurrency;
    this._SettleFigure = initial._SettleFigure;
    this._Player = initial._Player;
    this._BalFwd = initial._BalFwd;
    this._WeekDay1 = initial._WeekDay1;
    this._WeekDay2 = initial._WeekDay2;
    this._WeekDay3 = initial._WeekDay3;
    this._WeekDay4 = initial._WeekDay4;
    this._WeekDay5 = initial._WeekDay5;
    this._WeekDay6 = initial._WeekDay6;
    this._WeekDay7 = initial._WeekDay7;
    this._ThisWeek = initial._ThisWeek;
    this._Ptms = initial._Ptms;
    this._Balance = initial._Balance;
    this._CntDay1 = initial._CntDay1;
    this._CntDay2 = initial._CntDay2;
    this._CntDay3 = initial._CntDay3;
    this._CntDay4 = initial._CntDay4;
    this._CntDay5 = initial._CntDay5;
    this._CntDay6 = initial._CntDay6;
    this._CntDay7 = initial._CntDay7;
    this._AmountAtRisk = initial._AmountAtRisk;
    this._AvailableBalance = initial._AvailableBalance;
  }
  public _IdPlayer: number;
  public _Password: string;
  public _IdCurrency: number;
  public _SettleFigure: number;
  public _Player: string;
  public _BalFwd: number;
  public _WeekDay1: number;
  public _WeekDay2: number;
  public _WeekDay3: number;
  public _WeekDay4: number;
  public _WeekDay5: number;
  public _WeekDay6: number;
  public _WeekDay7: number;
  public _ThisWeek: number;
  public _Ptms: number;
  public _Balance: number;
  public _CntDay1: number;
  public _CntDay2: number;
  public _CntDay3: number;
  public _CntDay4: number;
  public _CntDay5: number;
  public _CntDay6: number;
  public _CntDay7: number;
  public _AmountAtRisk: number;
  public _AvailableBalance: number;
}

export class RequestAgentWeeklyBalance {
  constructor(initial?: any) {
    initial = initial || {};
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
    this.IsDistributor = initial.IsDistributor;
    this.Agent = initial.Agent;
    this.IdAgent = initial.IdAgent;
    this.TransactionType = initial.TransactionType;
    this.AgentDisplayHistory = initial.AgentDisplayHistory;
    this.IdCurrency = initial.IdCurrency;

  }
  public StartDate: string;
  public EndDate: string;
  public IsDistributor: string;
  public Agent: string;
  public IdAgent: number;
  public TransactionType: number;
  public AgentDisplayHistory: boolean;
  public IdCurrency: number;

}

export class DashboardPlayerDataDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.PlayerLose = initial.PlayerLose;
    this.ActivePlayers = initial.ActivePlayers;

  }
  public PlayerLose: string;
  public ActivePlayers: string;
}

export class WonLostBusinessUnitDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.Units = initial.Units;
    this.Totals = initial.Totals;

  }
  public Units: WonLostBusinessUnit[] = [];
  public Totals: WonLostBusinessUnitTotals;
}


export class WonLostBusinessUnit {
  constructor(initial?: any) {
    initial = initial || {};
    this.Business = initial.Business;
    this.Mon = initial.Mon;
    this.Tue = initial.Tue;
    this.Wed = initial.Wed;
    this.Thu = initial.Thu;
    this.FRI = initial.FRI;
    this.SAT = initial.SAT;
    this.SUN = initial.SUN;
    this.Total = initial.Total;

  }
  public Business: string;
  public Mon: number;
  public Tue: number;
  public Wed: number;
  public Thu: number;
  public FRI: number;
  public SAT: number;
  public SUN: number;
  public Total: number;
}

export class WonLostBusinessUnitTotals {
  constructor(initial?: any) {
    initial = initial || {};
    this.TMON = initial.TMON;
    this.TTUE = initial.TTUE;
    this.TWED = initial.TWED;
    this.TTHU = initial.TTHU;
    this.TFRI = initial.TFRI;
    this.TSAT = initial.TSAT;
    this.TSUN = initial.TSUN;
    this.GTotal = initial.GTotal;

  }
  public TMON: number;
  public TTUE: number;
  public TWED: number;
  public TTHU: number;
  public TFRI: number;
  public TSAT: number;
  public TSUN: number;
  public GTotal: number;
}

export class PlayerActivityByAgentDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.Agent = initial.Agent;
    this.ActivePlayers = initial.ActivePlayers;
    this.Total = initial.Total;

  }
  public Agent: string;
  public ActivePlayers: PlayerActivityDetailDto[] = [];
  public Total: PlayerActivityDetailDto = new PlayerActivityDetailDto;
}

export class PlayerActivityDetailDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdPlayer = initial.IdPlayer;
    this.Player = initial.Player;
    this.Phone = initial.Phone;
    this.Online = initial.Online;
    this.DGSRacingPhone = initial.DGSRacingPhone;
    this.DGSRacingOnline = initial.DGSRacingOnline;
    this.Casino = initial.Casino;
    this.EZLive = initial.EZLive;
    this.VigLiveDealer = initial.VigLiveDealer;
  }
  public IdPlayer: number;
  public Player: string;
  public Phone: number;
  public Online: number;
  public DGSRacingPhone: number;
  public DGSRacingOnline: number;
  public Casino: number;
  public EZLive: number;
  public VigLiveDealer: number;
}

export class RequestPlayerActivity {
  constructor(initial?: any) {
    initial = initial || {};
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
    this.Agent = initial.Agent;
    this.IdAgent = initial.IdAgent;
    this.IdPlayer = initial.IdPlayer;
    this.PrmType = initial.PrmType;
    this.IdSubAgent = initial.IdSubAgent;
    this.SubAgent = initial.SubAgent;

  }
  public StartDate: string;
  public EndDate: string;
  public Agent: string;
  public IdAgent: number;
  public IdPlayer: number;
  public PrmType: number;
  public SubAgent: string;
  public IdSubAgent: number;
}

export class RequestCashFlow {
  constructor(initial?: any) {
    initial = initial || {};
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
    this.IdAgent = initial.IdAgent;
    this.TransactionType = initial.TransactionType;

  }
  public StartDate: string;
  public EndDate: string;
  public IdAgent: number;
  public TransactionType: number;
}

// export class PlayerAmountsDto {
//   constructor(initial?: any) {
//     initial = initial || {};
//     this.Agent = initial.Agent;
//     this.Player = initial.Player;
//     this.Total = initial.Total;
//     this.IdPlayer = initial.IdPlayer;

//   }
//   public Agent: string;
//   public Player: string;
//   public Total: number;
//   public IdPlayer: number;
// }

export class sp_GetTopWinningLosingPlayerResult {
  IdAgent: number = 0;
  Agent: string = "";
  IdPlayer: number = 0;
  Player: string = "";
  Lose: number = 0;
  Win: number = 0;
  Net: number = 0;
  NetP: number = 0;
}

export class GetActionByPlayersReportDto {
  IdPlayer: number = 0;
  Player: string = "";
  Name: string = "";
  Passwrod: string = "";
  Agent: string = "";
  Straight: number = 0;
  Parlay: number = 0;
  Teaser: number = 0;
  Reverses: number = 0;
  Horses: number = 0;
  Others: number = 0;
  Adj: number = 0;
  HorseAdj: number = 0;
  Casino: number = 0;
  Total: number = 0;
}


export class PlayerAmountListDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.WinList = initial.WinList;
    this.LosList = initial.LosList;

  }
  public WinList: GetActionByPlayersReportDto[] = [];
  public LosList: GetActionByPlayersReportDto[] = [];
}

export class RequestPlayerTransaction {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdPlayer = initial.IdPlayer;
    this.startDate = initial.startDate;
    this.endDate = initial.endDate;

  }
  public IdPlayer: string;
  public startDate: string;
  public endDate: number;
}


export class PlayerInfoForEditDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.Address1 = initial.Address1;
    this.Address2 = initial.Address2;
    this.City = initial.City;
    this.Country = initial.Country;
    this.Email = initial.Email;
    this.EnableCasino = initial.EnableCasino;
    this.EnableHorses = initial.EnableHorses;
    this.EnableSports = initial.EnableSports;
    this.LastName = initial.LastName;
    this.MaxWager = initial.MaxWager;
    this.MinWager = initial.MinWager;
    this.Name = initial.Name;
    this.OnlineAccess = initial.OnlineAccess;
    this.OnlineMaxWager = initial.OnlineMaxWager;
    this.OnlineMessage = initial.OnlineMessage;
    this.OnlineMinWager = initial.OnlineMinWager;
    this.OnlinePassword = initial.OnlinePassword;
    this.Password = initial.Password;
    this.Phone = initial.Phone;
    this.State = initial.State;
    this.Temp_Credit = initial.Temp_Credit;
    this.Zip = initial.Zip;
    this.CreditLimit = initial.CreditLimit;
    this.Status = initial.Status;
    this.Soft_Limit_ = initial.Soft_Limit_;
    this.Action_Pts_Max = initial.Action_Pts_Max;
    this.Time_Zone_id = initial.Time_Zone_id;
    this.IDPlayer = initial.IDPlayer;
    this.Player = initial.Player;

  }
  public Address1: string;
  public Address2: string;
  public City: string;
  public Country: string;
  public Email: string;
  public EnableCasino: boolean;
  public EnableHorses: boolean;
  public EnableSports: boolean;
  public LastName: string;
  public MaxWager: number;
  public MinWager: number;
  public Name: string;
  public OnlineAccess: boolean;
  public OnlineMaxWager: number;
  public OnlineMessage: string;
  public OnlineMinWager: number;
  public OnlinePassword: string;
  public Password: string;
  public Phone: string;
  public State: string;
  public Temp_Credit: number;
  public Zip: string;
  public CreditLimit: number;
  public Status: string;
  public Soft_Limit_: number;
  public Action_Pts_Max: number;
  public Time_Zone_id: number;
  public IDPlayer: number;
  public Player: string;

}


export class CreatePlayerTransactionDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdPlayer = initial.IdPlayer;
    this.Reference = initial.Reference;
    this.Amount = initial.Amount;
    this.Description = initial.Description;
    this.Fee = initial.Fee;
    this.Bonus = initial.Bonus;
    this.IdPaymentMethod = initial.IdPaymentMethod;
    this.TransactionType = initial.TransactionType;
    this.IdAdjustmentType = initial.IdAdjustmentType;

  }
  public IdPlayer: number;
  public Reference: string;
  public Amount: number;
  public Description: string;
  public Fee: number;
  public Bonus: number;
  public IdPaymentMethod: number;
  public TransactionType: string;
  public IdAdjustmentType: number;
}



export class SuperAgentDistribution {
  constructor(initial?: any) {
    initial = initial || {};
    this.ListDistri = initial.ListDistri;
    this.SuperTotalBalance = initial.SuperTotalBalance;
    this.SuperTotalSubsComm = initial.SuperTotalSubsComm;
    this.SuperTotalPackComm = initial.SuperTotalPackComm;
    this.SuperTotalDistribution = initial.SuperTotalDistribution;

  }
  public ListDistri: AgentDistDto[] = [];
  public SuperTotalBalance: number;
  public SuperTotalSubsComm: number;
  public SuperTotalPackComm: number;
  public SuperTotalDistribution: number;
}


export class AgentDistDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.Agent = initial.Agent;
    this.AgentType = initial.AgentType;
    this.Distribution = initial.Distribution;
    this.PackComm = initial.PackComm;
    this.PackPorcen = initial.PackPorcen;
    this.SubsComm = initial.SubsComm;
    this.TotalBalance = initial.TotalBalance;
    // this.WonLoss = initial.WonLoss;
    // this.OldMakeUp = initial.OldMakeUp;
    // this.NewMakeUp = initial.NewMakeUp;
    // this.Commission = initial.Commission;
    // this.BegOfWeek = initial.BegOfWeek;
    // this.EndWeek = initial.EndWeek;
    this.agents = initial.agents;
  }
  public Agent: string;
  public AgentType: string;
  public Distribution: number;
  public PackComm: number;
  public PackPorcen: number;
  public SubsComm: number;
  public TotalBalance: number;
  // public WonLoss: number;
  // public OldMakeUp: number;
  // public NewMakeUp: number;
  // public Commission: number;
  // public BegOfWeek: number;
  // public EndWeek: number;
  public agents: AgentDistDto[] = [];
}

export class InsertPlayerDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdLineType = initial.IdLineType;
    this.IdAgent = initial.IdAgent;
    this.IdProfile = initial.IdProfile;
    this.IdProfileLimits = initial.IdProfileLimits;
    this.IdBook = initial.IdBook;
    this.Player = initial.Player;
    this.Password = initial.Password;
    this.CreditLimit = initial.CreditLimit;
    this.OnlineMaxWager = initial.OnlineMaxWager;
    this.OnlineMinWager = initial.OnlineMinWager;
    this.MaxWager = initial.MaxWager;
    this.MinWager = initial.MinWager;
  }
  public IdLineType: number;
  public IdAgent: number;
  public IdProfile: number;
  public IdProfileLimits: number;
  public IdBook: number;
  public Player: string;
  public Password: string;
  public CreditLimit: number;
  public OnlineMaxWager: number;
  public OnlineMinWager: number;
  public MaxWager: number;
  public MinWager: number;
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

export class GetReportPlayerHistory {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.IdPlayer = initial.IdPlayer;
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
    this.HistWeek = initial.HistWeek;
    this.Page = initial.Page;
    this.RecPecPage = initial.RecPecPage;
    this.NextQ = initial.NextQ;

  }
  public IdAgent: number;
  public IdPlayer: number;
  public StartDate: string;
  public EndDate: string;
  public HistWeek: number;
  public Page: number;
  public RecPecPage: number;
  public NextQ: string;
}


export class DistributionRequestDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.DateInit = initial.DateInit;
  }
  public IdAgent: number;
  public DateInit: string;
}

export class WeeklyPaymentsRequestDto {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.DateWeek = initial.DateWeek;
  }
  public IdAgent: number;
  public DateWeek: string;
}
export class AgentSettledFigureRequestDTO {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.DateWeek = initial.DateWeek;
  }
  public IdAgent: number;
  public DateWeek: string;
}

export class AgentPlayerAdjustmentRequestDTO {
  constructor(initial?: any) {
    initial = initial || {};
    this.IdAgent = initial.IdAgent;
    this.StartDate = initial.StartDate;
    this.EndDate = initial.EndDate;
  }
  public IdAgent: number;
  public StartDate: string;
  public EndDate: string;
}

export class SubAgentInsertDTO
{
  constructor(initial?: any) {
    initial = initial || {};
    this.IdUser = initial.IdUser;
    this.Distributor = initial.Distributor;
    this.Agent = initial.Agent;
    this.Name = initial.Name;
    this.Password = initial.Password;
  }
    public IdUser: number;
    public Distributor: number
    public Agent: string
    public Name: string
    public Password: string
}



export class PlayerStatisticsResult {
  public errorMessage: string;
  public IdPlayer: number;
  public CurrentBalance: number;
  public AmountAtRisk: number;
  public AvailBalance: number;
  public BonusPoints?: number;  // Note the use of ? for nullable type.
  public YTDWin: number;
  public YTDLose: number;
  public LifeTimeWin: number;
  public LifeTimeLose: number;
  public LifeTimeNetCasino: number;
  public LifeTimeNetHorses: number;
  public ThisWeekSports: number;
  public LastWeekSports: number;
  public ThisWeekCasino: number;
  public LastWeekCasino: number;
  public ThisWeekHorses: number;
  public LastWeekHorses: number;
  public LastCall?: Date;   // Note the use of ? for nullable type.
  public AccountOpened: Date;
  public LastWager?: Date;  // Note the use of ? for nullable type.
  public LastGrade?: Date;  // Note the use of ? for nullable type.
  public LifeTimeFreePlays: number;
  public LifeTimeBonus: number;
  public LifeTimeFees: number;
  public LastModification: Date;
  public PlayerAccount: string;
  public Agent: string;
  
  constructor(initial?: any) {
    initial = initial || {};
    this.errorMessage = initial.errorMessage;
    this.IdPlayer = initial.IdPlayer;
    this.CurrentBalance = initial.CurrentBalance;
    this.AmountAtRisk = initial.AmountAtRisk;
    this.AvailBalance = initial.AvailBalance;
    this.BonusPoints = initial.BonusPoints;
    this.YTDWin = initial.YTDWin;
    this.YTDLose = initial.YTDLose;
    this.LifeTimeWin = initial.LifeTimeWin;
    this.LifeTimeLose = initial.LifeTimeLose;
    this.LifeTimeNetCasino = initial.LifeTimeNetCasino;
    this.LifeTimeNetHorses = initial.LifeTimeNetHorses;
    this.ThisWeekSports = initial.ThisWeekSports;
    this.LastWeekSports = initial.LastWeekSports;
    this.ThisWeekCasino = initial.ThisWeekCasino;
    this.LastWeekCasino = initial.LastWeekCasino;
    this.ThisWeekHorses = initial.ThisWeekHorses;
    this.LastWeekHorses = initial.LastWeekHorses;
    this.LastCall = initial.LastCall;
    this.AccountOpened = initial.AccountOpened;
    this.LastWager = initial.LastWager;
    this.LastGrade = initial.LastGrade;
    this.LifeTimeFreePlays = initial.LifeTimeFreePlays;
    this.LifeTimeBonus = initial.LifeTimeBonus;
    this.LifeTimeFees = initial.LifeTimeFees;
    this.LastModification = initial.LastModification;
    this.PlayerAccount = initial.PlayerAccount;
    this.Agent = initial.Agent;
}
}
