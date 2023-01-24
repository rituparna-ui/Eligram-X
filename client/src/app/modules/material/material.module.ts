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
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const material = [
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatTabsModule,
  MatMenuModule,
  MatInputModule,
  MatRippleModule,
  MatButtonModule,
  MatSelectModule,
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: material,
  exports: material,
})
export class MaterialModule {}
