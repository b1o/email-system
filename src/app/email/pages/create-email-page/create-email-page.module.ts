import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {CreateEmailComponent} from "../../components/create-email/create-email.component";
import {EmailModule} from "../../email.module";

const routes: Route[] = [
  { path: '', component: CreateEmailComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmailModule,
    RouterModule.forChild(routes)
  ]
})
export class CreateEmailPageModule { }
