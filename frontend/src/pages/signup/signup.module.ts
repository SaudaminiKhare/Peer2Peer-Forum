import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
    // MaterializeDirective
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    TranslateModule.forChild(),
    // MaterializeModule
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule { }
