import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {EmailModule} from '../email/email.module';
import {EmailComposePageComponent} from './email-compose-page/email-compose-page.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [EmailComposePageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    EmailModule,
    FormsModule
  ],
})
export class EmailComposeModule {
}
