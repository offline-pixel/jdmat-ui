import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogComponent } from '../../_pages/dialog/dialog.component';
import { SnackbarComponent } from '../../_pages/_reusable/snackbar/snackbar.component';

/** */
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const material = [
  MatSlideToggleModule, MatButtonModule, MatGridListModule, MatTableModule,
  MatIconModule, MatPaginatorModule, MatDialogModule, MatSelectModule,
  MatFormFieldModule, MatRippleModule, MatInputModule, MatDividerModule, MatCheckboxModule
  ,MatProgressSpinnerModule, 
]

@NgModule({
  declarations: [ DialogComponent, SnackbarComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...material
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...material,
    DialogComponent
  ]
})
export class SharedModule { }
