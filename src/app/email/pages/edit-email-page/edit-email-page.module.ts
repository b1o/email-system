import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {EditEmailComponent} from "../../components/edit-email/edit-email.component";
import {EmailModule} from "../../email.module";

const routes: Route[] = [
  { path: ':id', component: EditEmailComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmailModule,
    RouterModule.forChild(routes)
  ]
})
export class EditEmailPageModule { }
