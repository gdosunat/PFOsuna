import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import { Inscripcion } from '../../../inscripciones/models';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmationDialogComponent } from '../../../inscripciones/components/dialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.scss']
})
export class CursoDetailsComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService,
    private authService: AuthService,
    private matDialog: MatDialog,
  ){
    this.authUser$ = this.authService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
     this.cursosService.getCursoById(params['id']).subscribe((curso) => this.curso = curso);
     this.inscripcionesService.getInscripcionesByCursoId(params['id']).subscribe((inscripciones) => {
      this.inscripciones = inscripciones
      this.dataSource.data = inscripciones
     })
   }
     )
  }

  id = 0;
  curso= { id: 1, nombre: "Angular", categoria: "Programacion", fechaInicio: new Date(2023, 3, 12), fechaFin: new Date(2023, 5, 12), info: "Aprenderás a crear y mantener aplicaciones web en una sola página con Angular." }
  inscripciones = [{id: 0, alumno: {id: 0, nombre: "", apellido: "", sexo: "", email: "", pais: ""}, curso: {id: 0, nombre: "", categoria: "", fechaInicio: new Date(), fechaFin: new Date(), info: ""}}]
  dataSource = new MatTableDataSource<Inscripcion>();
  displayedColumns: string[] = ['id', 'apellido', 'sexo', 'email', 'pais', 'accion'];
  authUser$: Observable<Usuario | null>;

  eliminarInscripcion(inscripcion: Inscripcion): void {
    this.inscripcionesService.deleteInscripcion(inscripcion.id);
   }

   openConfirmationDialog(inscripcion:Inscripcion): void{
    const dialog = this.matDialog.open(ConfirmationDialogComponent, {
      data: inscripcion
    })

    dialog.disableClose = true;
    dialog.afterClosed().subscribe((response) =>{
      if(response == 1){
        this.onInscripcionDelete(inscripcion);
      }
    });
  }

  onInscripcionDelete(inscripcion: Inscripcion): void {
    this.inscripcionesService.deleteInscripcion(inscripcion.id).subscribe((inscripcionesUpdated) => {
      this.dataSource.data = inscripcionesUpdated;
    });
  }
}
