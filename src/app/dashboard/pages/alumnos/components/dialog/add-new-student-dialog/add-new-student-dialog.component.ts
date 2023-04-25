import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Alumno } from 'src/app/dashboard/models';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-add-new-student-dialog',
  templateUrl: './add-new-student-dialog.component.html',
  styleUrls: ['./add-new-student-dialog.component.scss']
})
export class AddNewStudentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Alumno,  private dialogRef: MatDialogRef<AddNewStudentDialogComponent>, private matDialog: MatDialog) {
    if(data){
      this.nombreControl.setValue(data.nombre),
      this.apellidoControl.setValue(data.apellido),
      this.sexoControl.setValue(data.sexo),
      this.emailControl.setValue(data.email),
      this.paisControl.setValue(data.pais)
    }
   }

  isNewRecord = !this.data;

  nombreControl = new FormControl('', [Validators.required, Validators.minLength(5)])
  apellidoControl = new FormControl('', [Validators.required, Validators.minLength(4)])
  sexoControl = new FormControl('Femenino', [Validators.required])
  emailControl = new FormControl('', [Validators.required, Validators.email])
  paisControl = new FormControl('', [Validators.required])

  registerForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    sexo: this.sexoControl,
    email: this.emailControl,
    pais: this.paisControl
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
