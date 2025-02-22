import { LandscapeNoticeComponent } from './Content/ReusableComponents/LandscapeNotice/landscape-notice.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';
import { MasterComponent } from './Master/Master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AgentPositionComponent } from './Content/Reports/AgentPosition/AgentPosition.component';
import { AgentDistributionComponent } from './Content/Reports/AgentDistribution/AgentDistribution.component';
import { AgentCustomerPerformanceComponent } from './Content/Reports/AgentCustomerPerformance/AgentCustomerPerformance.component';
import { SidebarModule } from 'primeng/sidebar';
import { TreeModule } from 'primeng/tree';
import { NgxLoadingModule } from 'ngx-loading';
import { DropdownModule } from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AgentWagersComponent } from './Content/Reports/AgentWagers/AgentWagers.component';
import { AgentWagersTickerComponent } from './Content/Reports/AgentWagersTicker/AgentWagersTicker.component';
import { NgbDropdownModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgentWeeklyBalanceByPlayerComponent } from './Content/Reports/AgentWeeklyBalanceByPlayer/AgentWeeklyBalanceByPlayer.component';
import { AgentWeeklyBalanceComponent } from './Content/Reports/AgentWeeklyBalance/AgentWeeklyBalance.component';
import { PrincipalComponent } from './Content/principal/principal.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ChartModule} from 'primeng/chart';
import {AccordionModule} from 'primeng/accordion';
import {QRCodeModule} from "angularx-qrcode";

import { DataTablesModule } from "angular-datatables";
import { SummaryComponent } from './Content/Reports/Summary/Summary.component';
import { LifetimeComponent } from './Content/Reports/Lifetime/Lifetime.component';
import { PlayerLinesComponent } from './Content/Reports/PlayerLines/PlayerLines.component';
import { ScoresHistoryComponent } from './Content/Reports/ScoresHistory/ScoresHistory.component';
import { AgentPositionDetailsComponent } from './Content/Reports/AgentPositionDetails/AgentPositionDetails.component';
import { LoginHistoryComponent } from './Content/Reports/LoginHistory/LoginHistory.component';
import { ChangesHistoryComponent } from './Content/Reports/ChangesHistory/ChangesHistory.component';
import { AdjustmentHistoryComponent } from './Content/Reports/AdjustmentHistory/AdjustmentHistory.component';
import { PlayerDetailsComponent } from './Content/Reports/PlayerDetails/PlayerDetails.component';
import { EditPlayerComponent } from './Content/ReusableComponents/EditPlayer/EditPlayer.component';
import { PlayerTransactionComponent } from './Content/ReusableComponents/PlayerTransaction/PlayerTransaction.component';
import { AgentTransactionComponent } from './Content/ReusableComponents/AgentTransaction/AgentTransaction.component';
import { DistributionV2Component } from './Content/Reports/DistributionV2/DistributionV2.component';
import { AgentExposureComponent } from './Content/Reports/AgentExposure/AgentExposure.component';
import { AuthGuard } from './Content/Guard/auth.guard';
import { AddPlayerComponent } from './Content/ReusableComponents/AddPlayer/AddPlayer.component';
import { PlayerHistoryComponent } from './Content/Reports/PlayerHistory/PlayerHistory.component';
import { AgentWeeklyBalanceNivelComponent } from './Content/Reports/AgentWeeklyBalanceNivel/AgentWeeklyBalanceNivel.component';
import { WeeklyDaySheetV3Component } from './Content/Reports/WeeklyDaySheetV3/WeeklyDaySheetV3.component';
import { DaySheetClassicComponent } from './Content/Reports/DaySheetClassic/DaySheetClassic.component';
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
import {AddSubAgentComponent } from './Content/ReusableComponents/AddSubAgent/AddSubAgent.component';
import { AgentWeeklyBalanceClassicComponent } from './Content/Reports/AgentWeeklyBalanceClassic/AgentWeeklyBalanceClassic.component';
import { ChangedWagerComponent } from './Content/Reports/ChangedWager/ChangedWager.component';
import { AgentSMSAlertComponent } from './Content/Reports/AgentSMSAlert/AgentSMSAlert.component';
import { IpReportComponent } from './Content/Reports/IpReport/IpReport.component';
import { TelegramBetAlertComponent } from './Content/Reports/TelegramBetAlert/TelegramBetAlert.component';
import { AgentHiddenLeaguesComponent } from './Content/Reports/AgentHiddenLeagues/AgentHiddenLeagues.component';
import { BeatTheLineComponent } from './Content/Reports/BeatTheLine/BeatTheLine.component';
import { GetInitialsPipe } from './Pipes/get-initials.pipe';
import { AgentTopPlayersComponent } from './Content/Reports/AgentTopPlayers/AgentTopPlayers.component';
import { ActionByPlayerReportComponent } from './Content/Reports/ActionByPlayerReport/ActionByPlayerReport.component';
import { ResponsiveTableComponent } from './Content/ReusableComponents/responsive-table/responsive-table.component';
import { AgentPlayersManagementComponent } from './Content/Reports/AgentPlayersManagement/AgentPlayersManagement.component';
import { ResellerProgramComponent } from './Content/Reports/ResellerProgram/ResellerProgram.component';
import { LayOffAccountComponent } from './Content/Reports/LayOffAccount/LayOffAccount.component';
import { QrGeneratorComponent } from './Content/Reports/QrGenerator/QrGenerator.component';


@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        LandscapeNoticeComponent,
        MasterComponent,
        DaySheetClassicComponent,
        AgentPositionComponent,
        AgentDistributionComponent,
        AgentCustomerPerformanceComponent,
        AgentWagersComponent,
        AgentWagersTickerComponent,
        AgentWeeklyBalanceComponent,
        AgentWeeklyBalanceByPlayerComponent,
        AgentWeeklyBalanceNivelComponent,
        PrincipalComponent,
        SummaryComponent,
        LifetimeComponent,
        PlayerLinesComponent,
        ScoresHistoryComponent,
        AgentPositionDetailsComponent,
        LoginHistoryComponent,
        ChangesHistoryComponent,
        AdjustmentHistoryComponent,
        PlayerDetailsComponent,
        EditPlayerComponent,
        PlayerTransactionComponent,
        DistributionV2Component,
        AgentExposureComponent,
        AddPlayerComponent,
        PlayerHistoryComponent,
        WeeklyDaySheetV3Component,
        AgentHistoryComponent,
        AgentCommissionComponent,
        AgentAdjustmentComponent,
        AgentGrossWeekComponent,
        AgentWagerListingComponent,
        AgentWeeklyPaymentsComponent,
        AgentSettledFigureComponent,
        AgentRedFigureComponent,
        PlayerActionComponent,
        PlayerStandingsComponent,
        PlayerHistoryDefaultComponent,
        PlayerHistoryAdvancedComponent,
        PlayerTotalsComponent,
        PlayerAccessComponent,
        PlayerActivityComponent,
        PlayerIpAccessComponent,
        PlayersInactiveComponent,
        CasinoDayHandleComponent,
        CasinoGameDetailsComponent,
        CasinoGameHandsComponent,
        DaySheetPlusComponent,
        DaySheetLiveComponent,
        AgentCashFlowComponent,
        PlayerOpenBetsComponent,
        AddSubAgentComponent,
        AgentWeeklyBalanceClassicComponent,
        ChangedWagerComponent,
        AgentSMSAlertComponent,
        IpReportComponent,
        TelegramBetAlertComponent,
        AgentHiddenLeaguesComponent,
        BeatTheLineComponent,
        GetInitialsPipe,
        AgentTopPlayersComponent,
        ActionByPlayerReportComponent,
        AgentTransactionComponent,
        ResponsiveTableComponent,
        AgentPlayersManagementComponent,
        ResellerProgramComponent,
        LayOffAccountComponent,
        QrGeneratorComponent
    ],
    bootstrap: [AppComponent], imports: [CommonModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastModule,
        CommonModule,
        TableModule,
        SidebarModule,
        TreeModule,
        NgxLoadingModule,
        DropdownModule,
        DialogModule,
        NgbModule,
        DataTablesModule,
        ButtonModule,
        AutoCompleteModule,
        NgbDropdownModule,
        ChartModule,
        QRCodeModule,
        AccordionModule], providers: [MessageService, NgbModal, AuthGuard, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
