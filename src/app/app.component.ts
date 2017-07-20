import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthenticationComponent } from '../components/authentication/authentication';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;
  pageLogin: {title: string, component: any};

  loading: any;
  user: any;

  loggedin: boolean = false;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    public events: Events,
    public toastCtrl: ToastController) {
    this.initEvents();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage}
    ];

    this.pageLogin = { title: 'Login', component: AuthenticationComponent};

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.testAuth();
      this.rootPage = this.initComp();
    });
  }

  initEvents(){
    // Events
    this.events.subscribe('app:showloading', () => {
      this.presentLoading();
    });

    this.events.subscribe('app:hideloading', () => {
      this.hideLoading();
    });

    this.events.subscribe('app:toast', (message) => {
      this.presentToast(message);
    });

    this.events.subscribe('app:setUser', (data)=>{
      this.initUserLogged(data);
    })

    this.events.subscribe('app:testAuth', ()=>{
      this.testAuth();
    })

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait while loading ...",
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  initUserLogged(data){
    this.loggedin = true;
    this.user = data;
    localStorage.setItem('jbb-data', JSON.stringify(data));
    this.nav.setRoot(HomePage);
  }

  testAuth(){

    let data = localStorage.getItem('jbb-data');
    if(!data){
      this.nav.setRoot(AuthenticationComponent);
    } else {
      this.user = JSON.parse(data);
    }
  }

  initComp(){
    let data = localStorage.getItem('jbb-data');
    if(!data){
      return AuthenticationComponent;
    } else {
      this.user = JSON.parse(data);
      return HomePage;
    }
  }


  triggerLoggedOff(){
    localStorage.removeItem('jbb-data');
    this.user=null;
    this.nav.setRoot(AuthenticationComponent);
  }

}
