import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MODULES = [
  MatListModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
})
export class MaterialModule {}