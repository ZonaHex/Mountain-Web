import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User} from "./user";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(
    private http: HttpClient
  ) { }
  createUser(data:User): Observable<any> {
    return this.http.post<User>("http://172.18.69.107:8080/demo-1.0-SNAPSHOT/web/user/create",data,{ observe:'response'})
  }
  findMe(ip):Observable<any> {
    return this.http.get("http://172.18.69.107:8080/demo-1.0-SNAPSHOT/web/user/findme?ip="+ip,{ observe :'response'})
}

  guessAll(myGuess:string,myIP:string): Observable<any>{
    return this.http.put("http://172.18.69.107:8080/demo-1.0-SNAPSHOT/web/user",
      {
        tab:myGuess,
        ip:myIP},
      {headers: new HttpHeaders({
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': "*",
        }),observe:'response'
      })
  }
}
