import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { PlayerInfoForEditDto } from "src/app/Models/RpModels";
import { AgentRightDTO } from "src/app/Models/models";
import { DataService } from "src/app/Services/data.service";
import { ReportsService } from "src/app/Services/reports.service";
import { MasterComponent } from "../../../Master/Master.component";

@Component({
  selector: "app-EditPlayer",
  templateUrl: "./EditPlayer.component.html",
  styleUrls: ["./EditPlayer.component.css"],
})
export class EditPlayerComponent implements OnInit, OnDestroy {
  @Input() player?: string;
  @Input() idplayer?: string;

  public PlayerName: string = "";
  public agentRights: AgentRightDTO[] = [];

  public _unsubscribeAll: Subject<any>;
  public _PlayerData: PlayerInfoForEditDto = new PlayerInfoForEditDto();
  public _AccountStatus: boolean = false;
  @ViewChild(MasterComponent, { static: false })
  masterComponent!: MasterComponent;

  constructor(
    public messageService: MessageService,
    public _reportService: ReportsService,
    public _DataService: DataService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  ngOnInit() {
    console.log("player=dd=>", this.player);
    this._DataService.AgentRights.subscribe((rights) => {
      this.agentRights = rights;
    });
    this.GetPlayerInformation();
  }

  GetPlayerInformation() {
    // this._loadingPlayerInfo = true;
    this._reportService
      .GetPlayerInfoForEdit(Number(this.idplayer))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this._PlayerData = data;
          this._AccountStatus = this._PlayerData.Status == "E" ? true : false;
          console.log(data);
          //this._loadingPlayerInfo = false;
        },
        (error) => {
          //this._loadingPlayerInfo = false;
        }
      );
  }

  UpdatePlayerInformation() {
    // this._loadingPlayerInfo = true;

    this._PlayerData.Status = this._AccountStatus == true ? "E" : "D";
    this._PlayerData.OnlinePassword = this._PlayerData.Password.toUpperCase();
    this._PlayerData.Password = this._PlayerData.Password.toUpperCase();
    this._reportService
      .UpdatePlayerInformation(this._PlayerData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          //    console.log(data);

          if (data == 0)
            this.showMessage("success", "Update Player", "Update Successfully");
          else
            this.showMessage(
              "error",
              "Login Error",
              "Error updating player information"
            );
          //this._loadingPlayerInfo = false;
        },
        (error) => {
          //this._loadingPlayerInfo = false;
        }
      );
  }

  hasRight(idRight: number): boolean {
    return this.agentRights.some((right) => right.IdRight === idRight);
  }

  showMessage(sever: string, summ: string, det: string) {
    //"success", "info", "warn" and "error".
    this.messageService.add({ severity: sever, summary: summ, detail: det });
  }
}
