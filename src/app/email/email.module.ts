import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './components/email/email.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [EmailComponent],
  exports: [EmailComponent],
  imports: [CommonModule, MaterialModule],
})
export class EmailModule {}
