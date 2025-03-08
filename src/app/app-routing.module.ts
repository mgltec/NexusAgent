import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MasterComponent } from './Master/Master.component';
import { LoginComponent } from './Login/Login.component';
import { PrincipalComponent } from './Content/principal/principal.component';
import { DaySheetClassicComponent } from './Content/Reports/DaySheetClassic/DaySheetClassic.component';
import { AgentPositionComponent } from './Content/Reports/AgentPosition/AgentPosition.component';
import { AgentDistributionComponent } from './Content/Reports/AgentDistribution/AgentDistribution.component';
import { AgentCustomerPerformanceComponent } from './Content/Reports/AgentCustomerPerformance/AgentCustomerPerformance.component';
import { AgentWagersComponent } from './Content/Reports/AgentWagers/AgentWagers.component';
import { AgentWagersTickerComponent } from './Content/Reports/AgentWagersTicker/AgentWagersTicker.component';
import { AgentWeeklyBalanceComponent } from './Content/Reports/AgentWeeklyBalance/AgentWeeklyBalance.component';
import { AgentWeeklyBalanceByPlayerComponent } from './Content/Reports/AgentWeeklyBalanceByPlayer/AgentWeeklyBalanceByPlayer.component';
import { SummaryComponent } from './Content/Reports/Summary/Summary.component';
import { LifetimeComponent } from './Content/Reports/Lifetime/Lifetime.component';
import { PlayerLinesComponent } from './Content/Reports/PlayerLines/PlayerLines.component';
import { ScoresHistoryComponent } from './Content/Reports/ScoresHistory/ScoresHistory.component';
import { AgentPositionDetailsComponent } from './Content/Reports/AgentPositionDetails/AgentPositionDetails.component';
import { LoginHistoryComponent } from './Content/Reports/LoginHistory/LoginHistory.component';
import { ChangesHistoryComponent } from './Content/Reports/ChangesHistory/ChangesHistory.component';
import { AdjustmentHistoryComponent } from './Content/Reports/AdjustmentHistory/AdjustmentHistory.component';
import { PlayerDetailsComponent } from './Content/Reports/PlayerDetails/PlayerDetails.component';
import { DistributionV2Component } from './Content/Reports/DistributionV2/DistributionV2.component';
import { AgentExposureComponent } from './Content/Reports/AgentExposure/AgentExposure.component';
import { AuthGuard } from './Content/Guard/auth.guard';
import { PlayerHistoryComponent } from './Content/Reports/PlayerHistory/PlayerHistory.component';
import { AgentWeeklyBalanceNivelComponent } from './Content/Reports/AgentWeeklyBalanceNivel/AgentWeeklyBalanceNivel.component';
import { WeeklyDaySheetV3Component } from './Content/Reports/WeeklyDaySheetV3/WeeklyDaySheetV3.component';
import { AgentHistoryComponent } from './Content/Reports/AgentHistory/AgentHistory.component';
import { AgentCommissionComponent } from './Content/Reports/AgentCommission/AgentCommission.component';
import { AgentAdjustmentComponent } from './Content/Reports/AgentAdjustment/AgentAdjustment.component';
import { AgentGrossWeekComponent } from './Content/Reports/AgentGrossWeek/AgentGrossWeek.component';
import { AgentWagerListingComponent } from './Content/Reports/AgentWagerListing/AgentWagerListing.component';
import { AgentWeeklyPaymentsComponent } from './Content/Reports/AgentWeeklyPayments/AgentWeeklyPayments.component';
import { AgentSettledFigureComponent } from './Content/Reports/AgentSettledFigure/AgentSettledFigure.component';
import { AgentRedFigureComponent } from './Content/Reports/AgentRedFigure/AgentRedFigure.component';
import { PlayerActionComponent } from './Content/Reports/PlayerAction/PlayerAction.component';
import { PlayerStandingsComponent } from './Content/Reports/PlayerStandings/PlayerStandings.component';
import { PlayerHistoryDefaultComponent } from './Content/Reports/PlayerHistoryDefault/PlayerHistoryDefault.component';
import { PlayerHistoryAdvancedComponent } from './Content/Reports/PlayerHistoryAdvanced/PlayerHistoryAdvanced.component';
import { PlayerTotalsComponent } from './Content/Reports/PlayerTotals/PlayerTotals.component';
import { PlayerAccessComponent } from './Content/Reports/PlayerAccess/PlayerAccess.component';
import { PlayerActivityComponent } from './Content/Reports/PlayerActivity/PlayerActivity.component';
import { PlayerIpAccessComponent } from './Content/Reports/PlayerIpAccess/PlayerIpAccess.component';
import { PlayersInactiveComponent } from './Content/Reports/PlayersInactive/PlayersInactive.component';
import { CasinoDayHandleComponent } from './Content/Reports/CasinoDayHandle/CasinoDayHandle.component';
import { CasinoGameDetailsComponent } from './Content/Reports/CasinoGameDetails/CasinoGameDetails.component';
import { CasinoGameHandsComponent } from './Content/Reports/CasinoGameHands/CasinoGameHands.component';
import { DaySheetPlusComponent } from './Content/Reports/DaySheetPlus/DaySheetPlus.component';
import { DaySheetLiveComponent } from './Content/Reports/DaySheetLive/DaySheetLive.component';
import { AgentCashFlowComponent } from './Content/Reports/AgentCashFlow/AgentCashFlow.component';
import { PlayerOpenBetsComponent } from './Content/Reports/PlayerOpenBets/PlayerOpenBets.component';
import { AgentWeeklyBalanceClassicComponent } from './Content/Reports/AgentWeeklyBalanceClassic/AgentWeeklyBalanceClassic.component';
import { ChangedWagerComponent } from './Content/Reports/ChangedWager/ChangedWager.component';
import { AgentSMSAlertComponent } from './Content/Reports/AgentSMSAlert/AgentSMSAlert.component';
import { IpReportComponent } from './Content/Reports/IpReport/IpReport.component';
import { TelegramBetAlertComponent } from './Content/Reports/TelegramBetAlert/TelegramBetAlert.component';
import { AgentHiddenLeaguesComponent } from './Content/Reports/AgentHiddenLeagues/AgentHiddenLeagues.component';
import { BeatTheLineComponent } from './Content/Reports/BeatTheLine/BeatTheLine.component';
import { AgentTopPlayersComponent } from './Content/Reports/AgentTopPlayers/AgentTopPlayers.component';
import { ActionByPlayerReportComponent } from './Content/Reports/ActionByPlayerReport/ActionByPlayerReport.component';
import { AgentPlayersManagement } from './Models/models';
import { AgentPlayersManagementComponent } from './Content/Reports/AgentPlayersManagement/AgentPlayersManagement.component';
import { LayOffAccountComponent } from './Content/Reports/LayOffAccount/LayOffAccount.component';
import { ResellerProgramComponent } from './Content/Reports/ResellerProgram/ResellerProgram.component';
import { MasterClassicComponent } from './ClassicView/MasterClassic/MasterClassic.component';
import { PrincipalClassicComponent } from './ClassicView/PrincipalClassic/PrincipalClassic.component';
import { PlayerPaymentsComponent } from './ClassicView/Features/player-payments/player-payments.component';
import { FiguresComponent } from './ClassicView/Figures/Figures.component';
import { WagersComponent } from './ClassicView/Wagers/Wagers.component';
import { FinancialComponent } from './ClassicView/Financial/Financial.component';
import { InformationComponent } from './ClassicView/Information/Information.component';
import { AgentsComponent } from './ClassicView/Agents/Agents.component';
import { ManagementComponent } from './ClassicView/Management/Management.component';
import { AddPlayerClassicComponent } from './ClassicView/Features/add-player/add-player.component';
import { AddAgentComponent } from './ClassicView/Features/add-agent/add-agent.component';
import { HoldPercentComponent } from './ClassicView/Features/HoldPercent/HoldPercent.component';
import { WebVsPhoneComponent } from './ClassicView/Features/WebVsPhone/WebVsPhone.component';
import { TopPlayerComponent } from './ClassicView/Features/TopPlayer/TopPlayer.component';
import { CashierComponent } from './Content/Cashier/Cashier.component';
import { ManageProfileLimitesComponent } from './ClassicView/Features/ManageProfileLimites/ManageProfileLimites.component';




const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'cashier', loadChildren: ()=> import ('./Content/Cashier/Cashier.module').then(c=>c.CashierModule)},
  {
    path: 'mainbk', component: MasterComponent, children: [

      { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard] },
      { path: 'DaysheetClassic', component: DaySheetClassicComponent, canActivate: [AuthGuard] },
      { path: 'agentposition', component: AgentPositionComponent, canActivate: [AuthGuard] },
      { path: 'agentpositiondetails', component: AgentPositionDetailsComponent, canActivate: [AuthGuard] },
      { path: 'agentdistribution', component: AgentDistributionComponent, canActivate: [AuthGuard] },
      { path: 'agentcustomer', component: AgentCustomerPerformanceComponent, canActivate: [AuthGuard] },
      { path: 'agentcustomerperformance', component: AgentCustomerPerformanceComponent, canActivate: [AuthGuard] },
      { path: 'agentwagers', component: AgentWagersComponent, canActivate: [AuthGuard] },
      { path: 'agentwagersticket', component: AgentWagersTickerComponent, canActivate: [AuthGuard] },
      { path: 'weekly', component: AgentWeeklyBalanceComponent, canActivate: [AuthGuard] },
      { path: 'weeklyClassic', component: AgentWeeklyBalanceClassicComponent, canActivate: [AuthGuard] },
      { path: 'weeklylevel', component: AgentWeeklyBalanceNivelComponent, canActivate: [AuthGuard] },
      { path: 'weeklyplayer', component: AgentWeeklyBalanceByPlayerComponent, canActivate: [AuthGuard] },
      { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
      { path: 'lifetime', component: LifetimeComponent, canActivate: [AuthGuard] },
      { path: 'playerlines', component: PlayerLinesComponent, canActivate: [AuthGuard] },
      { path: 'scoreshistory', component: ScoresHistoryComponent, canActivate: [AuthGuard] },
      { path: 'loginhistory', component: LoginHistoryComponent, canActivate: [AuthGuard] },
      { path: 'changeshistory', component: ChangesHistoryComponent, canActivate: [AuthGuard] },
      { path: 'adjustmenthistory', component: AdjustmentHistoryComponent, canActivate: [AuthGuard] },
      { path: 'playerdetails', component: PlayerDetailsComponent, canActivate: [AuthGuard] },
      { path: 'distributionV2', component: DistributionV2Component, canActivate: [AuthGuard] },
      { path: 'agentexposure', component: AgentExposureComponent, canActivate: [AuthGuard] },
      { path: 'agentcashflow', component: AgentCashFlowComponent, canActivate: [AuthGuard] },
      { path: 'playerhistory', component: PlayerHistoryDefaultComponent, canActivate: [AuthGuard] },
      { path: 'weeklydaysheet', component: WeeklyDaySheetV3Component, canActivate: [AuthGuard] },
      { path: 'agenthistory', component: AgentHistoryComponent , canActivate: [AuthGuard] },
      { path: 'agentcommission', component: AgentCommissionComponent , canActivate: [AuthGuard] },
      { path: 'agentadjusment', component: AgentAdjustmentComponent , canActivate: [AuthGuard] },
      { path: 'agentgrossweek', component: AgentGrossWeekComponent , canActivate: [AuthGuard] },
      { path: 'agentwagerlisting', component: AgentWagerListingComponent , canActivate: [AuthGuard] },
      { path: 'agentweeklypayment', component: AgentWeeklyPaymentsComponent , canActivate: [AuthGuard] },
      { path: 'agentsettledfigure', component: AgentSettledFigureComponent , canActivate: [AuthGuard] },
      { path: 'agentredfigure', component: AgentRedFigureComponent, canActivate: [AuthGuard]},
      { path: 'playeraction', component: PlayerActionComponent, canActivate: [AuthGuard]},
      { path: 'playerstanding', component: PlayerStandingsComponent, canActivate: [AuthGuard]},
      { path: 'playerhistorydefault', component: PlayerHistoryDefaultComponent, canActivate: [AuthGuard]},
      { path: 'playerhistoryadvanced', component: PlayerHistoryAdvancedComponent, canActivate: [AuthGuard]},
      { path: 'playertotal', component: PlayerTotalsComponent, canActivate: [AuthGuard]},
      { path: 'playeraccess', component: PlayerAccessComponent, canActivate: [AuthGuard]},
      { path: 'playeractivity', component: PlayerActivityComponent, canActivate: [AuthGuard]},
      { path: 'playeripaccess', component: PlayerIpAccessComponent, canActivate: [AuthGuard]},
      { path: 'inactiveplayers', component: PlayersInactiveComponent, canActivate: [AuthGuard]},
      { path: 'casinodayhandle', component: CasinoDayHandleComponent, canActivate: [AuthGuard]},
      { path: 'casinogamedetails', component: CasinoGameDetailsComponent, canActivate:[AuthGuard]},
      { path: 'casinogamehands', component: CasinoGameHandsComponent, canActivate:[AuthGuard]},
      { path: 'daysheetplus', component: DaySheetPlusComponent, canActivate:[AuthGuard]},
      { path: 'daysheetlive', component: DaySheetLiveComponent, canActivate:[AuthGuard]},
      { path: 'openbets', component: PlayerOpenBetsComponent, canActivate:[AuthGuard]},
      { path: 'changedWager', component: ChangedWagerComponent, canActivate:[AuthGuard]},
      { path: 'smsalert', component: AgentSMSAlertComponent, canActivate:[AuthGuard]},
      { path: 'playerip', component: IpReportComponent, canActivate:[AuthGuard]},
      { path: 'telegram', component: TelegramBetAlertComponent, canActivate:[AuthGuard]},
      { path: 'hiddenleagues', component: AgentHiddenLeaguesComponent, canActivate:[AuthGuard]},
      { path: 'beattheline', component: BeatTheLineComponent, canActivate:[AuthGuard]},
      { path: 'agenttopplayers', component: AgentTopPlayersComponent, canActivate:[AuthGuard]},
      { path: 'actionbyplayers', component: ActionByPlayerReportComponent, canActivate:[AuthGuard]},
      { path: 'agentplayermagment', component: AgentPlayersManagementComponent , canActivate: [AuthGuard] },
      { path: 'layOffAccount', component: LayOffAccountComponent , canActivate: [AuthGuard] },
      { path: 'resellerProgram', component: ResellerProgramComponent , canActivate: [AuthGuard] },
      { path: 'cashier', component: CashierComponent, canActivate: [AuthGuard] },
    ]
  },
  // {
  //   path: 'mainclassic', component: MasterClassicComponent, children: [

  //     { path: 'principal', component: PrincipalClassicComponent, canActivate: [AuthGuard] },
  //     { path: 'playerpayments', component: PlayerPaymentsComponent, canActivate: [AuthGuard] },
  //     { path: 'figures', component: FiguresComponent, canActivate: [AuthGuard] },
  //     { path: 'wagers', component: WagersComponent, canActivate: [AuthGuard] },
  //     { path: 'financial', component: FinancialComponent, canActivate: [AuthGuard] },
  //     { path: 'information', component: InformationComponent, canActivate: [AuthGuard] },
  //     { path: 'agents', component: AgentsComponent, canActivate: [AuthGuard] },
  //     { path: 'addplayer', component: AddPlayerClassicComponent, canActivate: [AuthGuard] },
  //     { path: 'addagent', component: AddAgentComponent, canActivate: [AuthGuard] },
  //     { path: 'management', component: ManagementComponent, canActivate: [AuthGuard] },
  //     { path: 'agentposition', component: AgentPositionComponent, canActivate: [AuthGuard] },
  //     { path: 'agentpositiondetails', component: AgentPositionDetailsComponent, canActivate: [AuthGuard] },
  //     { path: 'agentdistribution', component: AgentDistributionComponent, canActivate: [AuthGuard] },
  //     { path: 'agentcustomer', component: AgentCustomerPerformanceComponent, canActivate: [AuthGuard] },
  //     { path: 'agentcustomerperformance', component: AgentCustomerPerformanceComponent, canActivate: [AuthGuard] },
  //     { path: 'agentwagers', component: AgentWagersComponent, canActivate: [AuthGuard] },
  //     { path: 'agentwagersticket', component: AgentWagersTickerComponent, canActivate: [AuthGuard] },
  //     { path: 'weekly', component: AgentWeeklyBalanceComponent, canActivate: [AuthGuard] },
  //     { path: 'weeklyClassic', component: AgentWeeklyBalanceClassicComponent, canActivate: [AuthGuard] },
  //     { path: 'weeklylevel', component: AgentWeeklyBalanceNivelComponent, canActivate: [AuthGuard] },
  //     { path: 'weeklyplayer', component: AgentWeeklyBalanceByPlayerComponent, canActivate: [AuthGuard] },
  //     { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
  //     { path: 'lifetime', component: LifetimeComponent, canActivate: [AuthGuard] },
  //     { path: 'playerlines', component: PlayerLinesComponent, canActivate: [AuthGuard] },
  //     { path: 'scoreshistory', component: ScoresHistoryComponent, canActivate: [AuthGuard] },
  //     { path: 'loginhistory', component: LoginHistoryComponent, canActivate: [AuthGuard] },
  //     { path: 'changeshistory', component: ChangesHistoryComponent, canActivate: [AuthGuard] },
  //     { path: 'adjustmenthistory', component: AdjustmentHistoryComponent, canActivate: [AuthGuard] },
  //     { path: 'playerdetails', component: PlayerDetailsComponent, canActivate: [AuthGuard] },
  //     { path: 'distributionV2', component: DistributionV2Component, canActivate: [AuthGuard] },
  //     { path: 'agentexposure', component: AgentExposureComponent, canActivate: [AuthGuard] },
  //     { path: 'agentcashflow', component: AgentCashFlowComponent, canActivate: [AuthGuard] },
  //     { path: 'playerhistory', component: PlayerHistoryDefaultComponent, canActivate: [AuthGuard] },
  //     { path: 'weeklydaysheet', component: WeeklyDaySheetV3Component, canActivate: [AuthGuard] },
  //     { path: 'agenthistory', component: AgentHistoryComponent , canActivate: [AuthGuard] },
  //     { path: 'agentcommission', component: AgentCommissionComponent , canActivate: [AuthGuard] },
  //     { path: 'agentadjusment', component: AgentAdjustmentComponent , canActivate: [AuthGuard] },
  //     { path: 'agentgrossweek', component: AgentGrossWeekComponent , canActivate: [AuthGuard] },
  //     { path: 'agentwagerlisting', component: AgentWagerListingComponent , canActivate: [AuthGuard] },
  //     { path: 'agentweeklypayment', component: AgentWeeklyPaymentsComponent , canActivate: [AuthGuard] },
  //     { path: 'agentsettledfigure', component: AgentSettledFigureComponent , canActivate: [AuthGuard] },
  //     { path: 'agentredfigure', component: AgentRedFigureComponent, canActivate: [AuthGuard]},
  //     { path: 'playeraction', component: PlayerActionComponent, canActivate: [AuthGuard]},
  //     { path: 'playerstanding', component: PlayerStandingsComponent, canActivate: [AuthGuard]},
  //     { path: 'playerhistorydefault', component: PlayerHistoryDefaultComponent, canActivate: [AuthGuard]},
  //     { path: 'playerhistoryadvanced', component: PlayerHistoryAdvancedComponent, canActivate: [AuthGuard]},
  //     { path: 'playertotal', component: PlayerTotalsComponent, canActivate: [AuthGuard]},
  //     { path: 'playeraccess', component: PlayerAccessComponent, canActivate: [AuthGuard]},
  //     { path: 'playeractivity', component: PlayerActivityComponent, canActivate: [AuthGuard]},
  //     { path: 'playeripaccess', component: PlayerIpAccessComponent, canActivate: [AuthGuard]},
  //     { path: 'inactiveplayers', component: PlayersInactiveComponent, canActivate: [AuthGuard]},
  //     { path: 'casinodayhandle', component: CasinoDayHandleComponent, canActivate: [AuthGuard]},
  //     { path: 'casinogamedetails', component: CasinoGameDetailsComponent, canActivate:[AuthGuard]},
  //     { path: 'casinogamehands', component: CasinoGameHandsComponent, canActivate:[AuthGuard]},
  //     { path: 'daysheetplus', component: DaySheetPlusComponent, canActivate:[AuthGuard]},
  //     { path: 'daysheetlive', component: DaySheetLiveComponent, canActivate:[AuthGuard]},
  //     { path: 'openbets', component: PlayerOpenBetsComponent, canActivate:[AuthGuard]},
  //     { path: 'changedWager', component: ChangedWagerComponent, canActivate:[AuthGuard]},
  //     { path: 'smsalert', component: AgentSMSAlertComponent, canActivate:[AuthGuard]},
  //     { path: 'playerip', component: IpReportComponent, canActivate:[AuthGuard]},
  //     { path: 'telegram', component: TelegramBetAlertComponent, canActivate:[AuthGuard]},
  //     { path: 'hiddenleagues', component: AgentHiddenLeaguesComponent, canActivate:[AuthGuard]},
  //     { path: 'beattheline', component: BeatTheLineComponent, canActivate:[AuthGuard]},
  //     { path: 'agenttopplayers', component: AgentTopPlayersComponent, canActivate:[AuthGuard]},
  //     { path: 'actionbyplayers', component: ActionByPlayerReportComponent, canActivate:[AuthGuard]},
  //     { path: 'agentplayermagment', component: AgentPlayersManagementComponent , canActivate: [AuthGuard] },
  //     { path: 'layOffAccount', component: LayOffAccountComponent , canActivate: [AuthGuard] },
  //     { path: 'resellerProgram', component: ResellerProgramComponent , canActivate: [AuthGuard] },
  //     { path: 'holdpercent', component: HoldPercentComponent, canActivate: [AuthGuard] },
  //     { path: 'webvsphone', component: WebVsPhoneComponent, canActivate: [AuthGuard] },
  //     { path: 'topplayers', component: TopPlayerComponent, canActivate: [AuthGuard] },
  //     { path: 'manageprofile', component: ManageProfileLimitesComponent, canActivate: [AuthGuard] },
  //     { path: 'cashier', component: CashierComponent, canActivate: [AuthGuard] },
      
  //   ]
  // },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

