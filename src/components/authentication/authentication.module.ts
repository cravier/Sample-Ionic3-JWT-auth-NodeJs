import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AuthenticationComponent } from './authentication';

@NgModule({
  declarations: [
    AuthenticationComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class AuthenticationComponentModule {}
