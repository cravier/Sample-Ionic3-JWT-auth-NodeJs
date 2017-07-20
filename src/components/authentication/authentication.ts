import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';
import { NavController,Events } from 'ionic-angular';

/**
 * Generated class for the AuthenticationComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'authentication',
  templateUrl: 'authentication.html'
})
export class AuthenticationComponent {
  public data: any;

  constructor(public navCtrl: NavController,private authprovider:AuthProvider, private events: Events) {
    this.data = {
      username :  '',
      password: ''
    }
  }

  signin(){
    this.authprovider.login(this.data)
      .then(
        data => this.handleLoginSuccess(data)
      ).catch(()=>{
        console.log("catched auth")
      }
    )
  }

  handleLoginSuccess(data) {
    this.events.publish('app:setUser', data);
  }

  checkLoginDisable(){
    if(this.data.username.length == 0 || this.data.password.length == 0){
      return false;
    }
    return true;
  }
}
