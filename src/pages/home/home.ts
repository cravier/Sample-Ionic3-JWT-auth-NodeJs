import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { MainServiceProvider } from '../../providers/main-service/main-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MainServiceProvider]
})
export class HomePage {
  public items: any;

  constructor(public events: Events, public navCtrl: NavController,private mainServiceProvider: MainServiceProvider) {
    events.publish('app:testAuth');
    this.loadData();
  }


  loadData(){
    this.events.publish('app:showloading');
    this.mainServiceProvider.loadHomeData()
    .then(data => {
      this.items = data;
    }).then(()=>{
        this.events.publish('app:hideloading');
    }),(err) => {
          console.log("Erreur");
    };
  }

}
