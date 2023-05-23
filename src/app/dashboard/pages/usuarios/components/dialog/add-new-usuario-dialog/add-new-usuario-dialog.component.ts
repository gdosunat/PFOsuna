import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/auth/models';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-new-usuario-dialog',
  templateUrl: './add-new-usuario-dialog.component.html',
  styleUrls: ['./add-new-usuario-dialog.component.scss']
})
export class AddNewUsuarioDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Usuario,  private dialogRef: MatDialogRef<AddNewUsuarioDialogComponent>, private matDialog: MatDialog) {
    if(data){
      this.nombreControl.setValue(data.nombre),
      this.emailControl.setValue(data.email),
      this.rolControl.setValue(data.rol),
      this.passwordControl.setValue(data.password)
    }
   }

  title = this.data ? "Editar Usuario" : "Agregar Usuario";

  nombreControl = new FormControl('', [Validators.required, Validators.minLength(5)])
  emailControl = new FormControl('', [Validators.required, Validators.email])
  rolControl = new FormControl('usuario', [Validators.required])
  passwordControl = new FormControl('', [Validators.required])

  registerForm = new FormGroup({
    nombre: this.nombreControl,
    email: this.emailControl,
    password: this.passwordControl,
    rol: this.rolControl
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
