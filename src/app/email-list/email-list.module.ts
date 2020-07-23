import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailListPageComponent } from './email-list-page/email-list-page.component';
import {Route, RouterModule} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import {EmailModule} from "../email/email.module";

const routes: Route[] = [
  { path: '', component: EmailListPageComponent }
]

@NgModule({
  declarations: [EmailListPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    EmailModule,
    RouterModule.forChild(routes)
  ]
})
export class EmailListModule { }
