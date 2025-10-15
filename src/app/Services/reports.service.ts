
import { Injectable } from "@angular/core";
import { catchError, map, startWith } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, of } from "rxjs";
import { AgentDaySheetNewAgentDto, AgentGrossWeekDto, AgentPlayerHistorySpDto, AgentSessionDto, DaySheetForNewAgentRequestDto, GetPlayerHistoryRequesDto, Node, PlayerActionDto, PlayerChangesHistoryRequest, PlayerHistoryByDayDto, PlayerLinesRequest, PlayerLoginHistoryRequest, PlayerStandingDto, PlayerTotalsDto, RequestAgentPositionDetail, RequestAgentPositionDto, ResultAgentPosition, ScoresHistoryRequest, WeekRangeDto, AgentWeeklyPaymentsResponseDTO, AgentSettledFiguresResponseDTO, GetReportAgentHistoryDto, AgentPlayerAdjustmentResponseSpDTO, AgentCashFlowResponseDto, OpenBetsResult, OpenWagerCurrencies, OpenWagerSports, OpenWagerPlayers, OpenWagerTypes, OpenBetsRequest, RequestWeeklyBalanceClassic, WeeklyBalanceClassic, GetIPLoginDto, GetSubAgentsDto, GetPlayersTelegramSubcribedDto, GetAgentPlayerDto, AgentCommissionDto, DuplicateIpDto, HiddenLeaguesInsertDto, AgentPlayersManagement, AgentRightDTO, DateAgentDTO, ReportAgentPlayerCountDTO, GetAgentHoldPercentRequest, GetAgentHoldPercentResult, GetWebvsPhone, GetPlayerAccessResultDTO, GetPlayerAccessRequestDTO, GetTopPlayerResultDTO, GetTopPlayerRequestDTO, AgentInfoDto, AgentTree2ResultDto, ProfileLimitsResultDto, PlayerInfoDTO, SportDto, PlayerInfoRequestDto, PlayerProfileLimitDTO, ProfileLimitsDto, CloneProfileDTO, AgentPlayerTreeResponseDto, PlayerClassicCloneRequest, AddAgentDto, SaveProfileDTO, AgentSettingsResultDTO, AgentSettingsRequestDto, AgentExposureDetailDto, AgentExposureDetailResultDto } from "../Models/models";
import {
  DaySheetClassicRequest,
  DaySheetClassicForHeadersRequest,
} from "../Models/models";

import {
  AgentListModel,
  AgentDistributionRequest,
  RequestPlayerListModel,
  CustomerPerformanceRequest,
  AgentWagersRequest,
  AgentWagersTicketRequest,
  AgentDeleteWagerRightsRequest,
  AgentDeleteWagerRequest,
  PlayerAdjustmentHistoryRequest,
  AgentAllowTransferRequest,
  AgentAllowSettleFigureColumn,
  PlayerLatestTransactionRequest,
  InsertPlayerTransactionRequest,
  AgentLatestTransactionRequest,
  InsertAgentTransactionRequest,
  AgentInformationRequest,
  EditAgentInformationRequest,
  PlayerBalanceInformationRequest,
  PlayerHistoryRequest,
  PlayerInformationRequest,
  EditPlayerInformationRequest,
  AgentRedFigureRequest,
  PlayerHistoryAdvanceRequest,
  PlayerIPAccessRequest,
  InactivePlayersRequest,
  CasinoDayHandleRequest,
  CasinoGameDetailsRequest,
  CasinoGameHandsRequest,
  DaySheetPlusRequest,
  RowColorListRequest,
  SavePlayerColorRowRequest,
  SavePlayerNoteRequest,
  SavePlayerOnlineMessageRequest,
  GetPlayerMessageRequest,
  DaySheetLiveRequest,
  SMSBetAlertRequest,
  SMSAgentAlertResult,
  InsertSMSAgentAlertRequest,
  WebRowGetListDTO,
  HiddenLeagueRequestDTO,
  HiddenLeagueResponseDTO,
  GetBeatTheLineRequestDto,
  GetBeatTheLineResultDto,
} from "../Models/models";
import { AgentDistDto, SubAgentInsertDTO, AgentLimitsDto, AgentPositionDetailsDto, AgentPositionResultV2Dto, AgentTreeDto, CreatePlayerTransactionDto, DashboardPlayerDataDto, DistributionRequestDto, GetReportPlayerHistory, InsertPlayerDto, PlayerActivityByAgentDto, PlayerAmountListDto, PlayerInfoForEditDto, ReportWeeklyBalance, RequestAgentPositionV2Dto, RequestAgentTreeDto, RequestAgentWeeklyBalance, RequestPlayerActivity, RequestPlayerTransaction, SuperAgentDistribution, WonLostBusinessUnitDto, WeeklyPaymentsRequestDto, AgentSettledFigureRequestDTO, AgentPlayerAdjustmentRequestDTO, RequestCashFlow, PlayerStatisticsResult } from "../Models/RpModels";
import { Router } from "@angular/router";
import { WeekDay } from "@angular/common";
import { TreeNode } from "primeng/api";
import { PlayerDetailsDTO } from "../Models/cashier-models";
//import { Console, info } from "console";


@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private httpClient: HttpClient, private router: Router) { }


  GetWeekRange(): Observable<WeekRangeDto> {
    let a: WeekRangeDto = new WeekRangeDto();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/ThisWeek';
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<WeekRangeDto>('GetWeekRange', a))
    );
  }// end intranet login

  GetAgentPosition(data: RequestAgentPositionDto): Observable<ResultAgentPosition> {
    let a: ResultAgentPosition = new ResultAgentPosition();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetReportAgentPosition';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentPosition', a))
    );
  }// end intranet login

  GetAgentPositionDetails(data: RequestAgentPositionDetail): Observable<AgentPositionDetailsDto> {
    let a: any;// = new ResultAgentPosition();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetReportAgentPositionDetail';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentPositionDetails', a))
    );
  }// end intranet login

  GetAgentsList(t: AgentListModel): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });

    console.log("AgentList", t);

    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetReportAgentList';
    return this.httpClient.post(apiUrl, t, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<AgentListModel>('GetAgentsList', a))
    );

  }

  GetPlayerList(t: RequestPlayerListModel): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentAllPlayers';
    return this.httpClient.post(apiUrl, t, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<RequestPlayerListModel>('GetPlayerList', a))
    );

  }

  AgentGetAllPlayersTree(CurrentUser: AgentSessionDto,IdAgent: Number): Observable<AgentPlayerTreeResponseDto[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/AgentGetAllPlayersTree?idAgent=' + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<RequestPlayerListModel>('AgentGetAllPlayersTree', a))
    );

  }

  AddPlayerClassic(CurrentUser: AgentSessionDto, t: PlayerClassicCloneRequest): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/AddPlayerClassic';
    return this.httpClient.post(apiUrl, t, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<PlayerClassicCloneRequest>('AddPlayerClassic', a))
    );

  }

  GetAgentDistribution(data: AgentDistributionRequest): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetReportAgentDistribution';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentPositionDetails', a))
    );

  }

  GetWeeks(CurrentUser: AgentSessionDto): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetWeeks';
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetWeeks', a))
    );
  }


  GetCustomerPerfromance(data: CustomerPerformanceRequest): Observable<any> {
    let a: any;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetCustomerPerformance';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetCustomerPerfromance', a))
    );
  }

  // GetAgenTree(data: RequestAgentTreeDto): Observable<AgentTreeDto[]> {
  //   let a: any;


  //   console.log("Req AT:", data);

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  //   });
  //   const options = { headers };
  //   const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentTree';
  //   return this.httpClient.post(apiUrl, data, options).pipe(
  //     map((response: any) => response),
  //     catchError(this.handleError<any>('GetAgenTree', a))
  //   );
  // }

  // GetAgentTree(IdAgent: number): Observable<any[]> {
  //   let a: any;
  //   const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentTree?IdAgent=' + IdAgent;
  //   return this.httpClient.get(apiUrl).pipe(
  //     map((response: any) => response),
  //     catchError(this.handleError<any[]>('GetAgentTree', a))
  //   );
  // }

  GetAgentTree(IdAgent: number): Observable<Node> {
    let a: any;
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentTree?IdAgent=' + IdAgent;
    return this.httpClient.get<Node>(apiUrl)
      .pipe(catchError(this.handleError<any[]>('GetAgentTree', a))
      )
  } // end Method

  InsertAgentExclusion(IdAgent: number): Observable<any> {
    let a: any;
    const apiUrl = environment.webAPI1 + 'AgentExt/InsertAgentExclusion?idAgent=' + IdAgent;
    return this.httpClient.get<any>(apiUrl)
      .pipe(catchError(this.handleError<any[]>('GetAgentTree', a))
      )
  } // end Method

  DeleteAgentExclusion(IdAgent: number): Observable<any> {
    let a: any;
    const apiUrl = environment.webAPI1 + 'AgentExt/DeleteAgentExclusion?idAgent=' + IdAgent;
    return this.httpClient.get<any>(apiUrl)
      .pipe(catchError(this.handleError<any[]>('GetAgentTree', a))
      )
  } // end Method

  GetAgentWagers(data: AgentWagersRequest): Observable<any[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetWagerListing';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentWagers', a))
    );
  }

  GetAgentWagersTicket(data: AgentWagersTicketRequest): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetWagerTicker';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentWagersTicket', a))
    );
  }

  GetAgentBalance(CurrentUser: AgentSessionDto): Observable<PlayerStatisticsResult | null> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentBalance?IdAgent=' + CurrentUser.IdAgentSelected;
    console.log(apiUrl);
    return this.httpClient.get<PlayerStatisticsResult | null>(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentBalance', a))
    );
  }


  GetIdAgent(agent: string): Observable<number> {
    let a: any;
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentId/' + agent;
    return this.httpClient.get(apiUrl).pipe(
      map((response: any) => response),
      catchError(this.handleError<number>('GetAgentTree', a))
    );
  }

  GetReportAgentPositionV2(data: RequestAgentPositionV2Dto): Observable<AgentPositionResultV2Dto[]> {
    let a: any = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetReportAgentPositionV2';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetReportAgentPositionV2', a))
    );
  }// end intranet login

  GetWeeklyBalanceByAgent(data: RequestAgentWeeklyBalance): Observable<ReportWeeklyBalance> {
    let a: any = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetWeeklyBalanceStandarHistoryDay';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetWeeklyBalanceByAgent', a))
    );
  }// end intranet login


  GetWeeklyBalanceByAgentLevelZero(data: RequestAgentWeeklyBalance): Observable<ReportWeeklyBalance> {
    let a: any = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetWeeklyBalanceStandarHistoryLevelZero';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetWeeklyBalanceByAgent', a))
    );
  }// end intranet login

  // GetWeeklyBalanceDet(data: RequestAgentWeeklyBalance): Observable<ReportWeeklyBalance> {
  //   let a: any = [];
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  //   });
  //   const options = { headers };
  //   const apiUrl = environment.webAPI1 + 'AgentExt/GetWeeklyBalanceStandarHistoryByAgentName';
  //   return this.httpClient.post(apiUrl, data, options).pipe(
  //     map((response: any) => response),
  //     catchError(this.handleError<any>('GetWeeklyBalanceByAgent', a))
  //   );
  // }// end intranet login


  GetAgentDeleteWagersRights(data: AgentDeleteWagerRightsRequest): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentDeleteWagersRights';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentDeleteWagersRights', a))
    );
  }


  DeleteWager(data: AgentDeleteWagerRequest): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/DeleteWagers';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('DeleteWager', a))
    );
  }

  GetDashboardPlayerData_deprecated(data: RequestAgentWeeklyBalance): Observable<DashboardPlayerDataDto> {
    let a: any = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };

    const apiUrl = environment.webAPI1 + 'AgentExt/GetDashboardPlayerData';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDashboardPlayerData', a))
    );
  }

  GetDashboardPlayerAdvanceData(data: DaySheetForNewAgentRequestDto): Observable<DashboardPlayerDataDto> {
    let a: any = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };

    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentDaySheetForNewAgentDashboardReport';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDashboardPlayerData', a))
    );
  }

  GetWonLossByBusinessUnit(data: RequestAgentWeeklyBalance): Observable<WonLostBusinessUnitDto> {
    let a: any = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetWonLossByBusinessUnit';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDashboardPlayerData', a))
    );
  }

  GetActivePlayerByAgent(data: RequestPlayerActivity): Observable<PlayerActivityByAgentDto[]> {
    let a: any = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerActivity';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDashboardPlayerData', a))
    );
  }



  GetPlayerLines(data: PlayerLinesRequest): Observable<any> {
    //console.log(data);
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetOpenGamesByPlayer';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerLines', a))
    );
  }

  GetScoreHistory(data: ScoresHistoryRequest): Observable<any> {
    //(data);
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetGameScores';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetScoreHistory', a))
    );
  }

  GetPlayerLoginHistory(data: PlayerLoginHistoryRequest): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerLoginHistory';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerLoginHistory', a))
    );
  }

  GetPlayerChangesHistory(data: PlayerChangesHistoryRequest): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerChangesHistory';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetTopPlayerListWinLos', a))
    );
  }

  GetTopPlayerListWinLos(data: RequestAgentWeeklyBalance): Observable<PlayerAmountListDto> {
    let a: any = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetTopWinningLosingPlayers';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerChangesHistory', a))
    );
  }

  GetPlayerAdjustmentHistory(data: PlayerAdjustmentHistoryRequest): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerAdjustmentHistory';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerChangesHistory', a))
    );
  }

  GetPlayerInformation(IdPlayer: number): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerInformation?IdPlayer=' + IdPlayer;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerInformation', a))
    );
  }

  GetPlayerTransactions(data: RequestPlayerTransaction): Observable<any[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerTransactions';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerTransactions', a))
    );
  }

  GetBalanceHistory(data: RequestPlayerTransaction): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetBalanceHistory';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerTransactions', a))
    );
  }

  GetPlayerInfoForEdit(idplayer: number): Observable<PlayerInfoForEditDto> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerInformationForEdit?IdPlayer=' + idplayer;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerTransactions', a))
    );
  }

  GetplayerOpenBets(idplayer: number): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'Player/GetPlayerOpenBets?prmIdPlayer=' + idplayer;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerTransactions', a))
    );
  }

  UpdatePlayerInformation(data: PlayerInfoForEditDto): Observable<number> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/UpdatePlayerInformation';
    return this.httpClient.post(apiUrl, data, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('UpdatePlayerInformation', a))
    );
  }

  CreateTransaction(CurrentUser: AgentSessionDto, info: CreatePlayerTransactionDto): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/CreatePlayerTransaction';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('CreateTransaction', a))
    );
  }

  GetSummaryReport(CurrentUser: AgentSessionDto, info: RequestAgentWeeklyBalance): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetSummaryReport';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('CreateTransaction', a))
    );
  }

  GetAgentDistributionV2(IdAgent: number, StarDate: string): Observable<SuperAgentDistribution> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/AgentDistributionV2/' + IdAgent + '/' + StarDate;
    console.log(apiUrl);
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerTransactions', a))
    );
  }

  /* GetAgentDistributionV3Tangusma(IdAgent: number, StarDate: string): Observable<SuperAgentDistribution> {
     let a: any;
 
     let i : DistributionRequestDto = new DistributionRequestDto();
     i.IdAgent = IdAgent;
     i.DateInit = StarDate;
 
     //console.log(i);
 
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
     });
     const options = { headers };
     const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentDistributionTangusma';
     //console.log(apiUrl);
     return this.httpClient.post(apiUrl, i, options).pipe(
       map((response: any) => response),
       catchError(this.handleError<any>('GetPlayerTransactions', a))
     );
   }*/

  /* GetAgentDistributionV3SubTangusma(IdAgent: number, StarDate: string): Observable<SuperAgentDistribution> {
     let a: any;
 
     let i : DistributionRequestDto = new DistributionRequestDto();
     i.IdAgent = IdAgent;
     i.DateInit = StarDate;
 
     //console.log(i);
 
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
     });
     const options = { headers };
     const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentDistributionTangusmaSub';
     //console.log(apiUrl);
     return this.httpClient.post(apiUrl, i, options).pipe(
       map((response: any) => response),
       catchError(this.handleError<any>('GetPlayerTransactions', a))
     );
   }*/

  GetAllPlayerfromAgentNoDetails(CurrentUser: AgentSessionDto): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAllPlayersByAgentNoDetails?IdAgent=' + CurrentUser.IdAgentSelected;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('CreateTransaction', a))
    );
  }

  GetDataForChart(CurrentUser: AgentSessionDto): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetDataForChart?IdAgent=' + CurrentUser.IdAgentSelected + "&fromDate=" + CurrentUser.WeekList[CurrentUser.RangeDateSelected].MonDate;
    console.log(apiUrl);
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetAgentExposure(CurrentUser: AgentSessionDto, IdSport: string): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentExposure?IdAgent=' + CurrentUser.IdAgentSelected + "&IdSport=" + IdSport;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetAgentLimitsForPlayers(IdAgent: number): Observable<AgentLimitsDto> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetAgentLimitsByIdAgent/" + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  InsertPlayer(CurrentUser: AgentSessionDto, info: InsertPlayerDto): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/PlayerInsert';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('CreateTransaction', a))
    );
  }

  InsertSubAgent(CurrentUser: AgentSessionDto, info: SubAgentInsertDTO): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/SubAgent_Insert';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('CreateTransaction', a))
    );
  }

  GetLineTypeByAgent(CurrentUser: AgentSessionDto, IdAgent: number): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetLineTypeByAgent?IdAgent=' + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetLineTypeByAgent', a))
    );
  }

  GetPlayerProfileByAgent(CurrentUser: AgentSessionDto, IdAgent: number): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerProfileByAgent?IdAgent=' + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerProfileByAgent', a))
    );
  }

  GetPlayerProfileLimitsByAgent(CurrentUser: AgentSessionDto, IdAgent: number): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerProfileLimitsByAgent?IdAgent=' + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerProfileLimitsByAgent', a))
    );
  }

  GetAgentDetails(CurrentUser: AgentSessionDto, IdAgent: number): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentDetails?IdAgent=' + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerProfileLimitsByAgent', a))
    );
  }

  GetPlayerHistory(CurrentUser: AgentSessionDto, Info: GetReportPlayerHistory): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerHistoryReport';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerProfileLimitsByAgent', a))
    );
  }


  GetNewWeeklyBasedDaySheet(Info: DaySheetForNewAgentRequestDto): Observable<AgentDaySheetNewAgentDto> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentDaySheetForNewAgentReport';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetNewWeeklyBasedDaySheet', a))
    );
  }


  GetPlayerHistoryByDay(Info: GetPlayerHistoryRequesDto): Observable<PlayerHistoryByDayDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerHistory';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetNewWeeklyBasedDaySheet', a))
    );
  }

  GetPlayerLifeTimeNet(IdPlayer: number): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      //'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerLifeTimeNet?idPlayer=' + IdPlayer;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerLifeTimeNet', a))
    );
  }


  GetDaySheetClassic(Info: DaySheetClassicRequest): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetDaySheetClassic';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDaySheetClassic', a))
    );
  }


  GetAgentAllowTransfer(Info: AgentAllowTransferRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentallowTransfer';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentAllowTransfer', a))
    );
  }

  GetAgentAllowSettleFigureColumn(Info: AgentAllowSettleFigureColumn): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentallowSettleFigureColumn';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentAllowSettleFigureColumn', a))
    );
  }

  GetDatesForHeaders(Info: DaySheetClassicForHeadersRequest): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetDatesForHeaders';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDaySheetClassic', a))
    );
  }

  GetDaySheetClassicBreadkown(Info: DaySheetClassicRequest): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/DaysheetClassicBreadkown';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDaySheetClassicBreadkown', a))
    );
  }

  GetPlayerLatestTransaction(Info: PlayerLatestTransactionRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerLatestTransactions';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerLatestTransaction', a))
    );
  }




  InsertPlayerTransaction(Info: InsertPlayerTransactionRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/InsertPlayerTransactionDaySheet';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('InsertPlayerTransaction', a))
    );
  }


  GetAgentLatestTransaction(Info: AgentLatestTransactionRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentLatestTransactions';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentLatestTransaction', a))
    );
  }


  InsertAgentTransaction(Info: InsertAgentTransactionRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/InsertAgentTransaction';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('InsertPlayerTransaction', a))
    );
  }


  GetAgentInformation(Info: AgentInformationRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentInformation';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentInformation', a))
    );
  }

  GetAgentStatistic(idAgent: number): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentStatistic?idAgent=' + idAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentInformation', a))
    );
  }

  EditAgentInformation(Info: EditAgentInformationRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/EditAgentInfomation';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('EditAgentInfomation', a))
    );
  }


  GetPlayerHistoryDaySheet(Info: PlayerHistoryRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerHistoryDaySheet';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerHistoryDaySheet', a))
    );
  }

  GetDaysheetPlayerInformation(Info: PlayerInformationRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetDaysheetPlayerInformation';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDaysheetPlayerInformation', a))
    );
  }

  EditDaySheetPlayerInfomation(Info: EditPlayerInformationRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/EditDaySheetPlayerInfomation';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('DaysheetEditPlayerInformation', a))
    );
  }


  GetAgentRedFigure(Info: AgentRedFigureRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentRedFigure';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentRedFigure', a))
    );
  }


  GetCurrency(): Observable<any> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetCurrencyList';
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetCurrency', a))
    );
  }// end intranet login


  GetPlayerHistoryAdvanced(Info: PlayerHistoryAdvanceRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerHistoryAdvanced';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerHistoryAdvanced', a))
    );
  }

  GetPlayerIPAccess(Info: PlayerIPAccessRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerIPAccess';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerIPAccess', a))
    );
  }

  GetInactivePlayers(Info: InactivePlayersRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetInactivePlayers';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetInactivePlayers', a))
    );
  }

  GetCasinoDayHandle(Info: CasinoDayHandleRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetCasinoDayHandle';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetCasinoDayHandle', a))
    );
  }


  GetCasinoGameDetails(Info: CasinoGameDetailsRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetCasinoGameDetails';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetCasinoDayHandle', a))
    );
  }

  GetCasinoHands(Info: CasinoGameHandsRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetCasinoGameHands';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetCasinoDayHandle', a))
    );
  }

  GetDaySheetPlus(Info: DaySheetPlusRequest): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetDaySheetPlus';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDaysheetPlus', a))
    );
  }

  GetDaySheetColorList(Info: RowColorListRequest): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetDaySheetRowColorList';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDaySheetRowColorList', a))
    );
  }


  SavePlayerDaysheetColorRow(Info: SavePlayerColorRowRequest): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/SavePlayerDaysheetColorRow';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('SavePlayerDaysheetColorRow', a))
    );
  }

  SavePlayerDaysheetNote(Info: SavePlayerNoteRequest): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/SavePlayerDaysheetNote';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('SavePlayerDaysheetNote', a))
    );
  }

  SavePlayerDaysheetOnlineMessage(Info: SavePlayerOnlineMessageRequest): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/SavePlayerDaysheetOnlineMessage';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('SavePlayerDaysheetOnlineMessage', a))
    );
  }

  GetPlayerMessages(Info: GetPlayerMessageRequest): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerMessages';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerMessages', a))
    );
  }

  GetDaySheetLive(Info: DaySheetLiveRequest): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetDaySheetLive';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDaySheetLive', a))
    );
  }

  GetDaySheetLiveBreadkown(Info: DaySheetLiveRequest): Observable<any[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/DaysheetLiveBreadkown';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDaySheetLiveBreadkown', a))
    );
  }

  GetPlayerStanding(CurrentUser: AgentSessionDto, info: RequestPlayerActivity): Observable<PlayerStandingDto[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerStanding';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerStanding', a))
    );
  }

  GetCashFlow(CurrentUser: AgentSessionDto, info: RequestCashFlow): Observable<AgentCashFlowResponseDto[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/AgentCashFlow';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('AgentCashFlow', a))
    );
  }

  GetPlayerTotals(CurrentUser: AgentSessionDto, info: RequestPlayerActivity): Observable<PlayerTotalsDto[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerTotals';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerTotals', a))
    );
  }

  GetPlayerActions(CurrentUser: AgentSessionDto, info: RequestPlayerActivity): Observable<PlayerActionDto[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerActions';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerActions', a))
    );
  }

  GetAgentGrossWeek(CurrentUser: AgentSessionDto, info: RequestPlayerActivity): Observable<AgentGrossWeekDto[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentGrossWeek';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentGrossWeek', a))
    );
  }

  GetAgentPlayerHistory(CurrentUser: AgentSessionDto, info: RequestPlayerActivity): Observable<AgentPlayerHistorySpDto[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentPlayerHistory';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentPlayerHistory', a))
    );
  }
  GetAgentWeeklyPayment(CurrentUser: AgentSessionDto, info: WeeklyPaymentsRequestDto): Observable<AgentWeeklyPaymentsResponseDTO[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/AgentWeeklyPayments';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentWeeklyPayment', a))
    );
  }
  GetAgentSettledFigure(CurrentUser: AgentSessionDto, info: AgentSettledFigureRequestDTO): Observable<AgentSettledFiguresResponseDTO[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/AgentSettledFigure';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentSettledFigure', a))
    );
  }

  GetAgentPlayerAdjustment(CurrentUser: AgentSessionDto, info: AgentPlayerAdjustmentRequestDTO): Observable<AgentPlayerAdjustmentResponseSpDTO[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/AgentPlayerAdjustment';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('AgentPlayerAdjustment', a))
    );
  }


  GetAgentHistory(CurrentUser: AgentSessionDto, info: RequestPlayerActivity): Observable<GetReportAgentHistoryDto[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentHistory';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentHistory', a))
    );
  }

  GetOpenWagers(CurrentUser: AgentSessionDto, info: OpenBetsRequest): Observable<OpenBetsResult[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetOpenWagers';
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetOpenWagers', a))
    );
  }

  GetOpenWagerCurrencies(CurrentUser: AgentSessionDto, idAgent: number): Observable<OpenWagerCurrencies[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetOpenWagerCurrencies?idAgent=' + idAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetOpenWagerCurrencies', a))
    );
  }

  GetOpenBetsIdSports(CurrentUser: AgentSessionDto, idAgent: number): Observable<OpenWagerSports[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetOpenBetsIdSports?idAgent=' + idAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetOpenBetsIdSports', a))
    );
  }

  GetOpenWagerPlayers(CurrentUser: AgentSessionDto, idAgent: number): Observable<OpenWagerPlayers[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetOpenWagerPlayers?idAgent=' + idAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetOpenWagerPlayers', a))
    );
  }

  GetOpenBetsWagertypes(CurrentUser: AgentSessionDto, idAgent: number): Observable<OpenWagerTypes[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetOpenBetsWagertypes?idAgent=' + idAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetOpenBetsWagertypes', a))
    );
  }

  GetWeeklyBalanceClassic(CurrentUser: AgentSessionDto, t: RequestWeeklyBalanceClassic): Observable<WeeklyBalanceClassic[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetWeeklyBalanceClassic';
    return this.httpClient.post(apiUrl, t, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetWeeklyBalanceClassic', a))
    );
  }

  GetSMSAgentsAlerts(CurrentUser: AgentSessionDto, t: SMSBetAlertRequest): Observable<SMSAgentAlertResult[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetSMSAgentsAlerts';
    return this.httpClient.post(apiUrl, t, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetSMSAgentsAlerts', a))
    );
  }

  InsertSMSAgentAlert(Info: InsertSMSAgentAlertRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/InsertSMSAgentAlert';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('InsertSMSAgentAlert', a))
    );
  }

  GetPlayersLoginIpData(CurrentUser: AgentSessionDto, info: RequestPlayerActivity): Observable<GetIPLoginDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetPlayersLoginIpData";
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetDuplicateIps(CurrentUser: AgentSessionDto, info: RequestPlayerActivity): Observable<DuplicateIpDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetDuplicateIps";
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDuplicateIps', a))
    );
  }

  UpdateSMSAgentAlert(Info: InsertSMSAgentAlertRequest): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/UpdateSMSAgentAlert';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('UpdateSMSAgentAlert', a))
    );
  }

  GetIpServiceInfo(ip: string): Observable<any> {

    let a: any;
    const apiUrl = "https://api.ipapi.com/api/"+ip+"?access_key=38fbe3e057d3b47649748975920bb5d2";
    return this.httpClient.get(apiUrl).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }


  GetAgents(CurrentUser: AgentSessionDto, IdAgent: number): Observable<GetSubAgentsDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetAgents?idAgent=" + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetTelegramInfo(CurrentUser: AgentSessionDto, IdAgentSelected: number): Observable<number> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetTelegramInfo?IdAgentSelected=" + IdAgentSelected;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetPlayersTelegramSubcribed(CurrentUser: AgentSessionDto, TelegramChatId: number): Observable<GetPlayersTelegramSubcribedDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetPlayersTelegramSubcribed?TelegramChatId=" + TelegramChatId;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetAgentPlayers(CurrentUser: AgentSessionDto, IdAgent: number): Observable<GetAgentPlayerDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetAgentPlayers?IdAgent=" + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetWebRows(CurrentUser: AgentSessionDto): Observable<WebRowGetListDTO[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentLeagues/GetWebRows";
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetHiddenLeaguesValues(CurrentUser: AgentSessionDto, Info: HiddenLeagueRequestDTO): Observable<HiddenLeagueResponseDTO[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentLeagues/HiddenLeagues_GetLeague';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('HiddenLeagues_GetLeague', a))
    );
  }

  HiddenLeagues_Insert(CurrentUser: AgentSessionDto, ObjValues: HiddenLeaguesInsertDto): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
       'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentLeagues/HiddenLeagues_Insert';
    return this.httpClient.post(apiUrl, ObjValues, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('HiddenLeagues_GetLeague', a))
    );
  }

  HiddenLeagues_InsertMasive(CurrentUser: AgentSessionDto, ObjValues: HiddenLeaguesInsertDto): Observable<any> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentLeagues/HiddenLeagues_InsertMasive';
    return this.httpClient.post(apiUrl, ObjValues, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('HiddenLeagues_GetLeague', a))
    );
  }

  GetBeatTheLine(CurrentUser: AgentSessionDto, Info: GetBeatTheLineRequestDto): Observable<GetBeatTheLineResultDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetBeatTheLine';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetBeatTheLine', a))
    );
  }


  GetAgentCommission(CurrentUser: AgentSessionDto, info: RequestPlayerActivity): Observable<AgentCommissionDto> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetReportAgentCommission";
    return this.httpClient.post(apiUrl, info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetAgentPlayerManagement(CurrentUser: AgentSessionDto, IdAgent: number): Observable<AgentPlayersManagement[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetPlayerManagementReport?idAgent=" + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetAgentRights(CurrentUser: AgentSessionDto, IdAgent: number): Observable<AgentRightDTO[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetAgentRights?idAgent=" + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetDataForChart', a))
    );
  }

  GetAgentPlayerCount(CurrentUser: AgentSessionDto, Info: DateAgentDTO): Observable<ReportAgentPlayerCountDTO[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/AgentPlayerCount';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentPlayerCount', a))
    );
  }

  GetAgentHoldPercent(CurrentUser: AgentSessionDto, Info: GetAgentHoldPercentRequest): Observable<GetAgentHoldPercentResult[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetAgentHoldPercent';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentHoldPercent', a))
    );
  }

  GetWebvsPhone(CurrentUser: AgentSessionDto, Info: DateAgentDTO): Observable<GetWebvsPhone[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetWebvsPhone';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetWebvsPhone', a))
    );
  }

  GetPlayerAccess(CurrentUser: AgentSessionDto, Info: GetPlayerAccessRequestDTO): Observable<GetPlayerAccessResultDTO[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetPlayerAccess';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerAccess', a))
    );
  }

  GetTopPlayer(CurrentUser: AgentSessionDto, Info: GetTopPlayerRequestDTO): Observable<GetTopPlayerResultDTO[]> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/GetTopPlayer';
    return this.httpClient.post(apiUrl, Info, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetTopPlayer', a))
    );
  }

  GetPlayerAgentByIdAgent(CurrentUser: AgentSessionDto, IdAgent: number): Observable<PlayerDetailsDTO> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "Cashier/GetPlayerAgentByIdAgent?idAgent=" + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerAgentByIdAgent', a))
    );
  }

  
  GetAgentBalanceGeneral(CurrentUser: AgentSessionDto, IdAgent: number): Observable<AgentInfoDto> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetAgentBalanceGeneral?idAgent=" + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerAgentByIdAgent', a))
    );
  }

  GetAgentTree2(CurrentUser: AgentSessionDto, IdAgent: number): Observable<AgentTree2ResultDto> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetAgentTree2?idAgent=" + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentTree2', a))
    );
  }

  GetPlayerInfoWithIdPlayer(CurrentUser: AgentSessionDto,idPlayer: number): Observable<PlayerInfoDTO> {
    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'Guest/GetPlayerInfoWithIdPlayer?idPlayer='+idPlayer;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerInfo', a))
    );
  }

  GetSports(CurrentUser: AgentSessionDto): Observable<SportDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "Guest/GetSports";
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetSports', a))
    );
  }

  PlayerProfileLimits_GetByAgent(CurrentUser: AgentSessionDto, IdAgent: number): Observable<ProfileLimitsResultDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/PlayerProfileLimits_GetByAgent?idAgent=" + IdAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('PlayerProfileLimits_GetByAgent', a))
    );
  }

  ChangeProfilePlayer(CurrentUser: AgentSessionDto, req: PlayerProfileLimitDTO): Observable<number> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/ChangeProfilePlayer";
    return this.httpClient.post(apiUrl,req, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('ChangeProfilePlayer', a))
    );
  }

  GetPlayerProfileLimits(CurrentUser: AgentSessionDto, idPlayer: number, idSport: string, online:boolean | null, flag: boolean |null): Observable<ProfileLimitsDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetPlayerProfileLimits?idPlayer="+ idPlayer + "&idSport="+ idSport + "&online=" + online + "&flag=" + flag;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetPlayerProfileLimits', a))
    );
  }

  CloneProfile(CurrentUser: AgentSessionDto, req: CloneProfileDTO): Observable<number> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/CloneProfile";
    return this.httpClient.post(apiUrl,req, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('CloneProfile', a))
    );
  }

  SaveProfile(CurrentUser: AgentSessionDto, req: SaveProfileDTO): Observable<number> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/SaveProfile";
    return this.httpClient.post(apiUrl,req, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('SaveProfile', a))
    );
  }

  SaveAgent(CurrentUser: AgentSessionDto, req: AddAgentDto): Observable<number> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/SaveAgent";
    return this.httpClient.post(apiUrl,req, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('SaveAgent', a))
    );
  }

  GetAgentSettings(idAgent: number): Observable<AgentSettingsResultDTO> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // 'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetAgentSettings?idAgent="+ idAgent;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentSettings', a))
    );
  }

  InsertOrUpdateAgentSettings(CurrentUser: AgentSessionDto, req: AgentSettingsRequestDto): Observable<number> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/InsertOrUpdateAgentSettings";
    return this.httpClient.post(apiUrl, req, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('InsertOrUpdateAgentSettings', a))
    );
  }

  GetAgentExposureDetail(CurrentUser: AgentSessionDto,req: AgentExposureDetailDto): Observable<AgentExposureDetailResultDto[]> {

    let a: any;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "bearer " + CurrentUser.Master.Password + '.' + CurrentUser.Master.IdAgent,
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + "AgentExt/GetAgentExposureDetail";
    return this.httpClient.post(apiUrl,req, options).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('GetAgentExposureDetail', a))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (errorResponse: any): Observable<any> => {

      console.log(errorResponse)

      if (localStorage.getItem('agentInfo')) {
        localStorage.clear();

        let returnUrl = "/login";
        this.router.navigate([returnUrl]);
      }

      // const errorObj: any;
      // errorObj.status = errorResponse.status == null ? 0 : errorResponse.status;
      // if (errorResponse.error.errors != null && errorResponse.error.errors.detail) {
      //   errorObj.errorMessage = errorResponse.error.errors.detail;
      // }
      return of(errorResponse as any);
    };
  }

}
