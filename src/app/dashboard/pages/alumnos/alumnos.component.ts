import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Alumno, CrearAlumnoPayload } from './models';
import { AlumnosService } from './services/alumnos.service';
import { AddNewStudentDialogComponent } from './components/dialog/add-new-student-dialog/add-new-student-dialog.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit{
  constructor(
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private alumnosService: AlumnosService
    ) {}

  alumnos: Alumno[] = []

  ngOnInit(): void {
    this.alumnosService.getAllAlumnos()
    .subscribe((alumnos) => {
      this.dataSource.data = alumnos
    });
  }


  displayedColumns: string[] = ['id', 'apellido', 'sexo', 'email', 'pais', 'accion'];
  dataSource = new MatTableDataSource<Alumno>();

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  alumno: Alumno = {id: this.alumnos.length + 1, nombre: "", apellido: "", sexo: "Femenino", email: "", pais: ""}

  openAddStudentDialog(){
    const dialog = this.matDialog.open(AddNewStudentDialogComponent)

    dialog.afterClosed().subscribe((response) => {
      this.onAdd(response);
    });
  }

  openConfirmationDialog(alumno:Alumno): void{
    const dialog = this.matDialog.open(ConfirmationDialogComponent, {
      data: alumno
    })

    dialog.disableClose = true;
    dialog.afterClosed().subscribe((response) =>{
      if(response == 1){
        this.onDelete(alumno);
      }
    });
  }

  openEditStudentDialog(alumno:Alumno){
    const dialog = this.matDialog.open(AddNewStudentDialogComponent, {
      data: alumno
    })

    dialog.afterClosed().subscribe((response) => {
      this.onModify(alumno.id, response);
    });
  }

  onAdd(alumnoPayload: CrearAlumnoPayload) {
    if(alumnoPayload){
      this.alumnosService.addNewAlumno(alumnoPayload).subscribe((alumnosUpdated) => {
        this.dataSource.data = alumnosUpdated;
      })
    }
  }


  onModify(alumnoId: number, alumno: Alumno){
    this.alumnosService.modifyAlumno(alumnoId, alumno).subscribe((alumnosUpdated) => {
      this.dataSource.data = alumnosUpdated;
    });
  }


  onDelete(alumno:Alumno): void {
    this.alumnosService.deleteAlumno(alumno.id).subscribe((alumnosUpdated) => {
      this.dataSource.data = alumnosUpdated;
    });
  }
}
