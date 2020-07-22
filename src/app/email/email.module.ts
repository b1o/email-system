import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './components/email/email.component';
import { MaterialModule } from '../material/material.module';
import { ComposeEmailComponent } from './components/compose-email/compose-email.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [EmailComponent, ComposeEmailComponent],
  exports: [EmailComponent, ComposeEmailComponent],
    imports: [CommonModule, MaterialModule, FormsModule],
})
export class EmailModule {}
