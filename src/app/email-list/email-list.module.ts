import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailListPageComponent} from './email-list-page/email-list-page.component';
import {Route, RouterModule} from '@angular/router';
import {EmailModule} from '../email/email.module';
import {MaterialModule} from '../material/material.module';
import {EmailComposePageComponent} from '../email-compose/email-compose-page/email-compose-page.component';
import {EmailComposeModule} from '../email-compose/email-compose.module';

const routes: Route[] = [
  {path: '', component: EmailListPageComponent},
  {path: 'email/compose', component: EmailComposePageComponent}];

@NgModule({
  declarations: [EmailListPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    EmailModule,
    RouterModule.forChild(routes),
    EmailComposeModule
  ],
})
export class EmailListModule {
}
