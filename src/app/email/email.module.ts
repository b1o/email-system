import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './components/email/email.component';
import { MaterialModule } from '../material/material.module';
import { CreateEmailComponent } from './components/create-email/create-email.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmailComponent, CreateEmailComponent],
  exports: [EmailComponent, CreateEmailComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class EmailModule {}
