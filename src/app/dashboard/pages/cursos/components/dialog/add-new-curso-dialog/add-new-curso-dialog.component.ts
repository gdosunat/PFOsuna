import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Curso } from '../../../models';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { CursosService } from '../../../services/cursos.service';
import { Event } from '@angular/router';

@Component({
  selector: 'app-add-new-curso-dialog',
  templateUrl: './add-new-curso-dialog.component.html',
  styleUrls: ['./add-new-curso-dialog.component.scss']
})
export class AddNewCursoDialogComponent {
  constructor(
      @Inject(MAT_DIALOG_DATA) 
      public data: Curso,  
      private dialogRef: MatDialogRef<AddNewCursoDialogComponent>, 
      private matDialog: MatDialog,
      private cursosService: CursosService
    ) {
    if(data){
      this.nombreControl.setValue(data.nombre),
      this.categoriaControl.setValue(data.categoria),
      this.fechaInicioControl.setValue(new Date(data.fechaInicio)),
      this.fechaFinControl.setValue(new Date(data.fechaFin)),
      this.infoControl.setValue(data.info)
    }
   }

  title = this.data ? "Editar Curso" : "Agregar Curso";
  categorias = this.cursosService.getAllCursoCategorias();

  nombreControl = new FormControl('', [Validators.required, Validators.minLength(5)])
  categoriaControl = new FormControl('', [Validators.required, Validators.minLength(4)])
  fechaInicioControl = new FormControl(new Date(),  [Validators.required])
  fechaFinControl = new FormControl(new Date(), [Validators.required])
  infoControl = new FormControl('', [Validators.required])

  registerForm = new FormGroup({
    nombre: this.nombreControl,
    categoria: this.categoriaControl,
    fechaInicio: this.fechaInicioControl,
    fechaFin: this.fechaFinControl,
    info: this.infoControl
  })

  submitForm(): void {
    if(this.registerForm.valid){
      this.dialogRef.close(this.registerForm.value);
    } else {
        const dialog = this.matDialog.open(ErrorDialogComponent)
      }
  }

  close(){
    this.dialogRef.close();
  }
}
