import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Alumno } from 'src/app/dashboard/models';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(
    private dialogService: MatDialog
  ){}

  @Input("alumno") alumno: Alumno = { id: 0, nombre: '', apellido: '', sexo: 'Femenino', email: '', pais: ''};
  @Output() deleteStudent = new EventEmitter<Alumno>();
  openConfirmationDialog(): void{
    let dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
      data: this.alumno

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "1"){
        this.deleteStudent.emit(this.alumno);
      }
    })
  }
}
