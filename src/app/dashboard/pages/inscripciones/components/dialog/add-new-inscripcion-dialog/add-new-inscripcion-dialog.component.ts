import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inscripcion } from '../../../models';
import { AlumnosService } from 'src/app/dashboard/pages/alumnos/services/alumnos.service';
import { CursosService } from 'src/app/dashboard/pages/cursos/services/cursos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Alumno } from '../../../../alumnos/models/';
import { Curso } from 'src/app/dashboard/pages/cursos/models';

@Component({
  selector: 'app-add-new-inscripcion-dialog',
  templateUrl: './add-new-inscripcion-dialog.component.html',
  styleUrls: ['./add-new-inscripcion-dialog.component.scss']
})
export class AddNewInscripcionDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: Inscripcion,  
    private dialogRef: MatDialogRef<AddNewInscripcionDialogComponent>, 
    private matDialog: MatDialog,
    private alumnosService: AlumnosService,
    private cursosService: CursosService
  ) {
  if(data){
    this.alumnoControl.setValue(data.alumno.nombre);
    this.cursoControl.setValue(data.curso.nombre);
  }
 }

 ngOnInit(): void {
  this.alumnosService.getAllAlumnos()
    .subscribe((alumnos) => {
      this.alumnos = alumnos;
   });
  
   this.cursosService.getAllCursos()
   .subscribe((cursos) => {
    this.cursos = cursos;
   })
}

title = this.data ? "Editar Inscripcion" : "Agregar Inscripcion";
alumnos: Alumno[] = []
cursos: Curso[] = []

alumnoControl = new FormControl('', [Validators.required])
cursoControl = new FormControl('', [Validators.required])

registerForm = new FormGroup({
  alumno: this.alumnoControl,
  curso: this.cursoControl
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