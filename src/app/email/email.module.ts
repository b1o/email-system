import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './components/email/email.component';
import { MaterialModule } from '../material/material.module';
import { CreateEmailComponent } from './components/create-email/create-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditEmailPageComponent } from './pages/edit-email-page/edit-email-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromEmails from './reducers/email-reducer';

@NgModule({
  declarations: [EmailComponent, CreateEmailComponent, EditEmailPageComponent],
  exports: [EmailComponent, CreateEmailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('emails', fromEmails.reducer),
  ],
})
export class EmailModule {}
