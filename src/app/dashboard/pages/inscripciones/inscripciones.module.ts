import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AddNewInscripcionDialogComponent } from './components/dialog/add-new-inscripcion-dialog/add-new-inscripcion-dialog.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog/error-dialog.component';
import { InscripcionDetailsComponent } from './components/inscripcion-details/inscripcion-details.component';

const routes: Routes = [
  {
    path: '',
    component: InscripcionesComponent
  },
  {
    path: ':id',
    component:  InscripcionDetailsComponent
  }
]

@NgModule({
  declarations: [
    InscripcionesComponent,
    AddNewInscripcionDialogComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    InscripcionDetailsComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule,
    PipesModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    PipesModule,
    MatDividerModule,
    RouterModule.forChild(routes)
  ]
})
export class InscripcionesModule { }
