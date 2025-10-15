
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, of } from "rxjs";
import { AgentDto, AgentLoginDto } from "../Models/models";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}


  AgentLogin(userInfo: AgentLoginDto): Observable<AgentDto> {
    let a: AgentDto = new AgentDto();
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers };
    const apiUrl = environment.webAPI1 + 'AgentExt/AgentLogin';
    return this.httpClient.post(apiUrl, userInfo, options).pipe(
        map((response: any) => response),
        catchError(this.handleError<AgentDto>('AgentLogin', a))
    );
  }// end intranet login

  private handleError<T>(operation = 'operation', result?: T) {
    return (errorResponse: any): Observable<any> => {
  
      console.log(errorResponse)
  
  
        // const errorObj: any;
        // errorObj.status = errorResponse.status == null ? 0 : errorResponse.status;
        // if (errorResponse.error.errors != null && errorResponse.error.errors.detail) {
        //   errorObj.errorMessage = errorResponse.error.errors.detail;
        // }
        return of(errorResponse as any);
    };
  }

}