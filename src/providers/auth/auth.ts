import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {  Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {
  link: any;

  constructor(public http: Http, private events: Events) {
    this.link = 'http://localhost:1338/auth';
  }

  login(cred){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.link + "/login", cred, {headers: headers})
          .map(res => res.json())
          .subscribe(
            data => {resolve(data)},
            error=> {
              this.events.publish('app:toast', JSON.parse(error._body).message);
            }
          )
      })
  }
}
