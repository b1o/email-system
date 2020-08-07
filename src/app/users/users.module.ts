import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListPageComponent } from './components/users-list-page/users-list-page.component';
import {Route, RouterModule} from "@angular/router";
import { CreateUserPageComponent } from './components/create-user-page/create-user-page.component';
import {MaterialModule} from "../material/material.module";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

const routes: Route[] = [
  { path: '', component: UsersListPageComponent},
  { path: 'create', component: CreateUserPageComponent}
]

@NgModule({
  declarations: [UsersListPageComponent, CreateUserPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    FormsModule
  ]
})
export class UsersModule { }
