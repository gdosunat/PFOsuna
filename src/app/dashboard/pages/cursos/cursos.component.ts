import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CursosService } from './services/cursos.service';
import { CrearCursoPayload, Curso } from './models';
import { MatDialog,  } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewCursoDialogComponent } from './components/dialog/add-new-curso-dialog/add-new-curso-dialog.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/auth/models';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit{

  constructor(
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private cursosService: CursosService,
    private authService: AuthService
    ) {
      this.authUser$ = this.authService.getLoggedInUser();
    }

  cursos: Curso[] = []
  authUser$: Observable<Usuario | null>;

  ngOnInit(): void {
    this.cursosService.getAllCursos()
    .subscribe((cursos) => {
      this.dataSource.data = cursos;
    });
  }


  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'fechaInicio', 'fechaFin', 'accion'];
  dataSource = new MatTableDataSource<Curso>();

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  curso: Curso = {id: this.cursos.length + 1, nombre: "", categoria: "", fechaInicio: new Date(), fechaFin: new Date(), info: ""}

  openAddStudentDialog(){
    const dialog = this.matDialog.open(AddNewCursoDialogComponent)

    dialog.afterClosed().subscribe((response) => {
      this.onAdd(response);
    });
  }

  openConfirmationDialog(curso:Curso): void{
    const dialog = this.matDialog.open(ConfirmationDialogComponent, {
      data: curso
    })

    dialog.disableClose = true;
    dialog.afterClosed().subscribe((response) =>{
      if(response == 1){
        this.onDelete(curso);
      }
    });
  }

  openEditStudentDialog(curso:Curso){
    const dialog = this.matDialog.open(AddNewCursoDialogComponent, {
      data: curso
    })

    dialog.afterClosed().subscribe((response) => {
      this.onModify(curso.id, response);
    });
  }

  onAdd(cursoPayload: CrearCursoPayload) {
    if(cursoPayload){
      this.cursosService.addNewCurso(cursoPayload).subscribe((cursosUpdated) => {
        this.dataSource.data = cursosUpdated;
      })
    }
  }


  onModify(cursoId: number, curso: Curso){
    this.cursosService.modifyCurso(cursoId, curso).subscribe((cursosUpdated) => {
      this.dataSource.data = cursosUpdated;
    });
  }


  onDelete(curso: Curso): void {
    this.cursosService.deleteCurso(curso.id).subscribe((cursosUpdated) => {
      this.dataSource.data = cursosUpdated;
    });
  }
}
