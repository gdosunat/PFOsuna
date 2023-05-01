import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { ReactiveFormsModule } from '@angular/forms';


import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog/error-dialog.component';
import { AddNewStudentDialogComponent } from './components/dialog/add-new-student-dialog/add-new-student-dialog.component';
import { AlumnoDetailsComponent } from './components/alumno-details/alumno-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AlumnosComponent,
    DialogComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    AddNewStudentDialogComponent,
    AlumnoDetailsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    PipesModule,
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlumnosComponent
      },
      {
        path: ':id',
        component: AlumnoDetailsComponent
      }
    ])
  ]
})
export class AlumnosModule { }
