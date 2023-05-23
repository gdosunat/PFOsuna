import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Alumno, CrearAlumnoPayload } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private alumnos$ = new BehaviorSubject<Alumno[]>([]);
  private alumno$ = new BehaviorSubject<Alumno>({id: 0, nombre: "", apellido: "", sexo:"", pais: "", email: ""});

  getAllAlumnos(): Observable<Alumno[]>{
    this.httpClient.get<Alumno[]>(`http://localhost:3000/alumnos`)
    .subscribe((alumnos) =>{
      if(alumnos){
        this.alumnos$.next(alumnos);
      }
    })
    return this.alumnos$.asObservable();
  }

  getAlumnoById(id: number): Observable<Alumno>{
    this.httpClient.get<Alumno[]>(`http://localhost:3000/alumnos`, {
      params: {
        id: id
      }
    })
    .subscribe((alumnos) => {
      if(alumnos){
        this.alumno$.next(alumnos[0]);
      } else {
        console.log("ERROR: Alumno no encontrado")
      }
    })

    return this.alumno$.asObservable();
  }

  addNewAlumno(alumnoPayload: CrearAlumnoPayload): Observable<Alumno[]>{
    this.httpClient.post<Alumno>(`http://localhost:3000/alumnos`, alumnoPayload).subscribe((nuevoAlumno) => {
      this.alumnos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (alumnos => {
          alumnos.push(nuevoAlumno);
          this.alumnos$.next(alumnos)
        })
      })
    })
    return this.alumnos$.asObservable();
  }

  modifyAlumno(idAlumno: number, alumnoUpdated: Alumno): Observable<Alumno[]>{
    this.httpClient.put<Alumno>(`http://localhost:3000/alumnos/${idAlumno}`, alumnoUpdated).subscribe((alumnoUpdated) => {
      this.alumnos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (alumnos => {
          const alumnosUpdated = alumnos.map((alumno) => {
            if (alumno.id === idAlumno) {
              return {
                ...alumno,
                ...alumnoUpdated,
              }
            } else {
              return alumno;
            }
          })

          this.alumnos$.next(alumnosUpdated);
        })
      })
    })

    return this.alumnos$.asObservable();
  }

  deleteAlumno(alumnoId: number): Observable<Alumno[]>{
    this.httpClient.delete<Alumno>(`http://localhost:3000/alumnos/${alumnoId}`).subscribe((response) => {
      this.alumnos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (alumnos) => {
          const alumnosUpdated = alumnos.filter((alumno) => alumno.id != alumnoId);
          this.alumnos$.next(alumnosUpdated);
        }
      })
    })
    return this.alumnos$.asObservable();
  }
}
