import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../homepage/user";

@Injectable({
  providedIn: 'root'
})

export class MountainsService {

  constructor(
    private http: HttpClient,
  ) { }


  getIP(){
    return this.http.get<IP[]>('http://api.ipify.org/?format=json');

  }

  // getIP(): Observable<any>{
  //   return this.http.get('http://api.ipify.org/');
  //
  // }

  getMountains(): Observable<any> {
    return this.http.get("http://172.18.69.107:8080/demo-1.0-SNAPSHOT/web/mountains/list")
  }
  guessAll(myGuess,myID): Observable<any> {
    return this.http.put("http://172.18.69.107:8080/demo-1.0-SNAPSHOT/web/user",
      {
        tab: myGuess,
        id: myID
      },
      {
        headers: new HttpHeaders({
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': "*",
        }), observe: 'response'
      })
  }
  findMe(ip):Observable<any> {
    return this.http.get("http://172.18.69.107:8080/demo-1.0-SNAPSHOT/web/user/findme?ip="+ip,{ observe :'response'})
  }
  refuse(myID): Observable<any> {
    return this.http.put("http://172.18.69.107:8080/demo-1.0-SNAPSHOT/web/user/reject",{
      id:myID
    },{
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': "*",
      }), observe: 'response'
    })
  }
}class IP{
  ip: string;
}
