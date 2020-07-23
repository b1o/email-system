import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './components/email/email.component';
import { MaterialModule } from "../material/material.module";
import { CreateEmailComponent } from './components/create-email/create-email.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EditEmailComponent } from './components/edit-email/edit-email.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [EmailComponent, CreateEmailComponent, EditEmailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [EmailComponent, CreateEmailComponent]
})
export class EmailModule { }
