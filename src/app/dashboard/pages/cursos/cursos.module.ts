import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog/error-dialog.component';
import { AddNewCursoDialogComponent } from './components/dialog/add-new-curso-dialog/add-new-curso-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CursosComponent,
    DialogComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    AddNewCursoDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class CursosModule { }
