import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the MainServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MainServiceProvider {
  link: any;

  constructor(public http: Http, private events: Events) {
    this.link = 'http://localhost:1338/api';
  }

  loadHomeData() {
      let link = this.link + "/getFakeData";
      return new Promise(resolve => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(link,  {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
              resolve(data);
            }
            ,(err)=>{
              this.events.publish('app:toast', "Error while trying to load data");
            }
          );
      });
    }

}
