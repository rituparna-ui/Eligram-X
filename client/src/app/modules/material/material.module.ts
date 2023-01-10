import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRippleModule } from '@angular/material/core';

const material = [
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatRippleModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatDatepickerModule,
];

@NgModule({
  imports: material,
  exports: material,
})
export class MaterialModule {}
