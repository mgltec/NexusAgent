import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AgentRightDTO, AgentSessionDto } from "../Models/models";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor() {}

  private _AgentRights = new BehaviorSubject<AgentRightDTO[]>(
    JSON.parse(localStorage.getItem("agentRights") || "[]")
  );
  AgentRights = this._AgentRights.asObservable();

  private _MenuOpened = new BehaviorSubject<boolean>(false);
  MenuOpened = this._MenuOpened.asObservable();

  // Update user in session
  private _UserInSession = new BehaviorSubject<AgentSessionDto>(
    new AgentSessionDto()
  );
  UserSession = this._UserInSession.asObservable();

  private _ShowFilters = new BehaviorSubject<boolean>(false);
  ShowFilters = this._ShowFilters.asObservable();

  changeAgentRights(rights: AgentRightDTO[]) {
    this._AgentRights.next(rights);
  }

  changeMenuOpened(opened: boolean) {
    this._MenuOpened.next(opened);
  }

  changeDataUserSession(UserSession: AgentSessionDto) {
    this._UserInSession.next(UserSession);
  }

  methodShowFilters(value: boolean) {
    this._ShowFilters.next(value);
  }

  //---END
}
