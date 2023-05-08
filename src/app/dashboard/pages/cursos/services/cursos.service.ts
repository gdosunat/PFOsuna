import { Injectable } from '@angular/core';
import { Curso, CrearCursoPayload, CategoriasCursos } from '../models';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(
    private httpClient: HttpClient
  ) { }

  categorias: string[] = ["Programacion", "Diseño UX/UI", "Data"]

  private cursos$ = new BehaviorSubject<Curso[]>([]);
  private curso$ = new BehaviorSubject<Curso>({id: 0, nombre: "", categoria: "", fechaInicio: new Date(), fechaFin: new Date(), info: ""})

  getAllCursos(): Observable<Curso[]>{
    this.httpClient.get<Curso[]>(`http://localhost:3000/cursos`)
    .subscribe((cursos) =>{
      if(cursos){
        this.cursos$.next(cursos);
      }
    })
    return this.cursos$.asObservable();
  }

  getCursoByName(nombre: string): Observable<Curso>{
    this.httpClient.get<Curso[]>(`http://localhost:3000/cursos`, {
      params: {
        nombre
      }
    })
    .subscribe((cursos) =>{
      if(cursos){
        this.cursos$.next(cursos);
      }
    })
    return this.curso$.asObservable();
  }

  getCursoById(id: number): Observable<Curso>{
    this.httpClient.get<Curso[]>(`http://localhost:3000/cursos`, {
      params: {
        id: id
      }
    })
    .subscribe((cursos) => {
      if(cursos){
        this.curso$.next(cursos[0]);
      } else {
        console.log("ERROR: Curso no encontrado")
      }
    })

    return this.curso$.asObservable();
  }

  addNewCurso(cursoPayload: CrearCursoPayload): Observable<Curso[]>{
    this.httpClient.post<Curso>(`http://localhost:3000/cursos`, cursoPayload).subscribe((nuevoCurso) => {
      this.cursos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (cursos => {
          cursos.push(nuevoCurso);
          this.cursos$.next(cursos)
        })
      })
    })
    return this.cursos$.asObservable();
  }

  modifyCurso(cursoId: number, cursoUpdated: Curso): Observable<Curso[]>{
    this.httpClient.put<Curso>(`http://localhost:3000/cursos/${cursoId}`, cursoUpdated).subscribe((cursoUpdated) => {
      this.cursos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (cursos => {
          const cursosUpdated = cursos.map((curso) => {
            if (curso.id === cursoId) {
              return {
                ...curso,
                ...cursoUpdated,
              }
            } else {
              return curso;
            }
          })

          this.cursos$.next(cursosUpdated);
        })
      })
    })

    return this.cursos$.asObservable();
  }

  deleteCurso(cursoId: number): Observable<Curso[]>{
    this.httpClient.delete<Curso>(`http://localhost:3000/cursos/${cursoId}`).subscribe((response) => {
      this.cursos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (cursos) => {
          const cursosUpdated = cursos.filter((curso) => curso.id != cursoId);
          this.cursos$.next(cursosUpdated);
        }
      })
    })
    return this.cursos$.asObservable();
  }

  getAllCursoCategorias(): string[]{
    return Object.values(CategoriasCursos);
  }
}
