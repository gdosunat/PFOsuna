import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InscripcionesService } from './services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { Inscripcion, RecibirInscripcionPayload } from './models';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewInscripcionDialogComponent } from './components/dialog/add-new-inscripcion-dialog/add-new-inscripcion-dialog.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { CursosService } from '../cursos/services/cursos.service';
import { Alumno } from '../alumnos/models';
import { Curso } from '../cursos/models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/auth/models';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private authService: AuthService
    ) {
      this.authUser$ = this.authService.getLoggedInUser();
    }

  inscripciones: Inscripcion[] = [];
  authUser$: Observable<Usuario | null>;

  ngOnInit(): void {
    this.inscripcionesService.getAllInscripciones()
    .subscribe((inscripciones) => {
      this.dataSource.data = inscripciones;
    });
  }


  displayedColumns: string[] = ['id', 'alumno', 'curso', 'fechaInicio', 'fechaFin', 'accion'];
  dataSource = new MatTableDataSource<Inscripcion>();

  inscripcion: Inscripcion = {
    id: this.inscripciones.length + 1,
    alumno: { id: 0, nombre: "", apellido: "", sexo: "", email: "", pais: "" },
    curso: { id: 0, nombre: "", categoria: "", fechaInicio: new Date(), fechaFin: new Date(), info: ""}
  }

  openAddInscripcionesDialog(){
    const dialog = this.matDialog.open(AddNewInscripcionDialogComponent)

    dialog.afterClosed().subscribe((response) => {
      this.onAdd(response);
    });
  }

  openConfirmationDialog(inscripcion: Inscripcion): void{
    const dialog = this.matDialog.open(ConfirmationDialogComponent, {
      data: inscripcion
    })

    dialog.disableClose = true;
    dialog.afterClosed().subscribe((response) =>{
      if(response == 1){
        this.onDelete(inscripcion);
      }
    });
  }

  openEditInscripcionesDialog(inscripcion: Inscripcion){
    const dialog = this.matDialog.open(AddNewInscripcionDialogComponent, {
      data: inscripcion
    })

    dialog.afterClosed().subscribe((response) => {
      console.log(response)
      this.onModify(inscripcion.id, response);
    });
  }

  onAdd(recibirInscripcionPayload: RecibirInscripcionPayload) {
    if(recibirInscripcionPayload){
      let alumno: Alumno = { id:0, nombre: "", apellido: "", sexo: "", email: "", pais: ""};
       let curso: Curso = { id:0, nombre: "", categoria: "", fechaFin: new Date(), fechaInicio: new Date(), info: ""};
      this.alumnosService.getAlumnoById(recibirInscripcionPayload.alumno).subscribe((al) => alumno = al);
      this.cursosService.getCursoByName(recibirInscripcionPayload.curso).subscribe((cur) => curso = cur);

     const inscripcionPayload =  {
        alumno,
        curso
      }

      this.inscripcionesService.addNewInscripcion(inscripcionPayload).subscribe((inscripcionesUpdated) => {
        this.dataSource.data = inscripcionesUpdated;
      })
    }
  }

  onModify(inscripcionId: number, recibirInscripcionPayload: RecibirInscripcionPayload){
    if(recibirInscripcionPayload){
      let alumno: Alumno = { id:0, nombre: "", apellido: "", sexo: "", email: "", pais: ""};
        let curso: Curso = { id:0, nombre: "", categoria: "", fechaFin: new Date(), fechaInicio: new Date(), info: ""};
        this.alumnosService.getAlumnoById(recibirInscripcionPayload.alumno).subscribe((al) => alumno = al);
        this.cursosService.getCursoByName(recibirInscripcionPayload.curso).subscribe((cur) => curso = cur);

      const inscripcion: Inscripcion = {id: inscripcionId, alumno, curso}

      this.inscripcionesService.modifyInscripcion(inscripcionId, inscripcion).subscribe((inscripcionesUpdated) => {
        this.dataSource.data = inscripcionesUpdated;
      });
    }
  }

  onDelete(inscripcion: Inscripcion): void {
    this.inscripcionesService.deleteInscripcion(inscripcion.id).subscribe((inscripcionesUpdated) => {
      this.dataSource.data = inscripcionesUpdated;
    });
  }
}
