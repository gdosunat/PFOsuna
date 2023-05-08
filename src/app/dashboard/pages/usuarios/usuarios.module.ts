import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import { AddNewUsuarioDialogComponent } from './components/dialog/add-new-usuario-dialog/add-new-usuario-dialog.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog/error-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    UsuariosComponent,
    AddNewUsuarioDialogComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    DialogComponent
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
    MatCardModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsuariosComponent
      }
    ])
  ]
})
export class UsuariosModule { }
