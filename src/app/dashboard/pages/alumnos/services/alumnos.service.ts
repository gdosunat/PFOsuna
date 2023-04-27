import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Alumno, CrearAlumnoPayload } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor() { }

  alumnos = [
    {id: 1, nombre: "Guadalupe", apellido: "Osuna", sexo: "Femenino", email: "lupita@email.com", pais: "Mexico"},
    {id: 2, nombre: "Berenice", apellido: "Apodaca", sexo: "Femenino", email: "bere@email.com", pais: "Mexico"},
    {id: 3, nombre: "Liliana", apellido: "Osuna", sexo: "Femenino", email: "lili@email.com", pais: "Mexico"},
    {id: 4, nombre: "Ricardo", apellido: "Ramos", sexo: "Masculino", email: "ricardo@email.com", pais: "Mexico"},
    {id: 5, nombre: "Maricarmen", apellido: "Colado", sexo: "Femenino", email: "mari@email.com", pais: "Mexico"},
    {id: 6, nombre: "Alison", apellido: "Arias", sexo: "Femenino", email: "ali@email.com", pais: "Mexico"},
    {id: 7, nombre: "Ivan", apellido: "Osuna", sexo: "Masculino", email: "Ivan@email.com", pais: "Mexico"},
    {id: 8, nombre: "Rosina", apellido: "Osuna", sexo: "Femenino", email: "rosii@email.com", pais: "Mexico"},
    {id: 9, nombre: "Luis", apellido: "Tirado", sexo: "Masculino", email: "luis@email.com", pais: "Mexico"}
  ]

  private alumnos$ = new BehaviorSubject<Alumno[]>([]);
  private alumno$ = new BehaviorSubject<Alumno>({id: 0, nombre: "", apellido: "", sexo:"", pais: "", email: ""});

  getAllAlumnos(): Observable<Alumno[]>{
    this.alumnos$.next(this.alumnos);
    return this.alumnos$.asObservable();
  }

  getAlumnoByName(nombre: string): Observable<Alumno>{
    this.alumno$.next(this.alumnos.filter((alumno) => alumno.nombre == nombre)[0]);
    return this.alumno$.asObservable();
  }

  getAlumnoById(id: number): Observable<Alumno>{
    this.alumno$.next(this.alumnos.filter((alumno) => alumno.id == id)[0]);
    return this.alumno$.asObservable();
  }

  addNewAlumno(alumnoPayload: CrearAlumnoPayload): Observable<Alumno[]>{
    this.alumnos$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (alumnos) => {
        this.alumnos$.next([
          ...alumnos,
          {
            id: alumnos[alumnos.length - 1].id + 1,
            ...alumnoPayload,
          },
        ]);
      },
      complete: () => {},
      error: () => {}
    });


    return this.alumnos$.asObservable();
  }

  modifyAlumno(idAlumno: number, alumnoUpdated: Alumno): Observable<Alumno[]>{
    this.alumnos$
      .pipe(
        take(1),
      )
       .subscribe({
         next: (alumnos) => {

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
         },
         complete: () => {},
         error: () => {}
       });

    return this.alumnos$.asObservable();
  }

  deleteAlumno(alumnoId: number): Observable<Alumno[]>{
    this.alumnos$
    .pipe(
      take(1)
    ).subscribe({
      next: (alumnos) => {
        const alumnosUpdated = alumnos.filter((alumno) => alumno.id != alumnoId);
        this.alumnos$.next(alumnosUpdated);
      },
      complete: () => {},
      error: () => {}
    });

    return this.alumnos$.asObservable();
  }
}
