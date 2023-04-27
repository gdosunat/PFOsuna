import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { CrearInscripcionPayload, Inscripcion } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor() { }

  inscripciones = [
    {
      id: 1,
      alumno: {id: 1, nombre: "Guadalupe", apellido: "Osuna", sexo: "Femenino", email: "lupita@email.com", pais: "Mexico"},
      curso: { id: 2, nombre: "Java Inicial", categoria: "Programacion", fechaInicio: new Date(2023, 6, 13), fechaFin: new Date(2023, 8, 8), info: "Aprende los conocimientos teóricos y prácticos de la programación Java orientada a objetos."},
    }, 
    {
      id: 2,
      alumno: {id: 1, nombre: "Guadalupe", apellido: "Osuna", sexo: "Femenino", email: "lupita@email.com", pais: "Mexico"},
      curso: { id: 1, nombre: "Angular", categoria: "Programacion", fechaInicio: new Date(2023, 3, 12), fechaFin: new Date(2023, 5, 12), info: "Aprenderás a crear y mantener aplicaciones web en una sola página con Angular." },
    },
    {
      id: 3, 
      alumno: {id: 2, nombre: "Berenice", apellido: "Apodaca", sexo: "Femenino", email: "bere@email.com", pais: "Mexico"},
      curso: { id: 1, nombre: "Angular", categoria: "Programacion", fechaInicio: new Date(2023, 3, 12), fechaFin: new Date(2023, 5, 12), info: "Aprenderás a crear y mantener aplicaciones web en una sola página con Angular." },
    },
    {
      id: 4,
      alumno: {id: 2, nombre: "Berenice", apellido: "Apodaca", sexo: "Femenino", email: "bere@email.com", pais: "Mexico"},
      curso:  { id: 3, nombre: "UX Research", categoria: "Diseño UX/UI", fechaInicio: new Date(2023, 5, 16), fechaFin: new Date(2023, 7, 13), info: "Aprende a diseñar y a ejecutar un proyecto de Investigación UX. Profundiza en los conceptos y metodologías propias de este prometedor campo de trabajo."},
    },
    {
      id: 5,
      alumno: {id: 3, nombre: "Liliana", apellido: "Osuna", sexo: "Femenino", email: "lili@email.com", pais: "Mexico"},
      curso: { id: 4, nombre: "UI", categoria: "Diseño UX/UI", fechaInicio: new Date(2023, 9, 11), fechaFin: new Date(2023, 23, 10), info: "Aprende a analizar y planificar la creación de un design system basado en Atomic Design Methodology."},
    },
    {
      id: 6, 
      alumno: {id: 5, nombre: "Maricarmen", apellido: "Colado", sexo: "Femenino", email: "mari@email.com", pais: "Mexico"},
      curso:   { id: 5, nombre: "Business Analytics", categoria: "Data", fechaInicio: new Date(2023, 5, 15), fechaFin: new Date(2023, 7, 12), info: "Aprende sobre las metodologías y herramientas necesarias para medir el desempeño y la evolución de un negocio."},
    },
    {
      id: 7,
      alumno:  {id: 7, nombre: "Ivan", apellido: "Osuna", sexo: "Masculino", email: "Ivan@email.com", pais: "Mexico"},
      curso:{ id: 6, nombre: "Data Science", categoria: "Data", fechaInicio: new Date(2023, 5, 16), fechaFin: new Date(2023, 11, 30), info: "En este curso aprenderás la teoría e implementación de proyectos de Data Science. Crearás desde cero un modelo predictivo con Machine Learning."},
    },
    {
      id:8,
      alumno: {id: 8, nombre: "Rosina", apellido: "Osuna", sexo: "Femenino", email: "rosii@email.com", pais: "Mexico"},
      curso: { id: 1, nombre: "Angular", categoria: "Programacion", fechaInicio: new Date(2023, 3, 12), fechaFin: new Date(2023, 5, 12), info: "Aprenderás a crear y mantener aplicaciones web en una sola página con Angular." },
    }
  ]

  private inscripciones$ = new BehaviorSubject<Inscripcion[]>([]);
  private inscripcion$ = new BehaviorSubject<Inscripcion>(
    {
      id: 0, 
      alumno: {id: 0, nombre: "", apellido: "", sexo: "", email: "", pais: ""},
      curso: {id:0, nombre: "", categoria: "", fechaFin: new Date(), fechaInicio: new Date(), info: ""}
    });

  getAllInscripciones(): Observable<Inscripcion[]>{
    this.inscripciones$.next(this.inscripciones);
    return this.inscripciones$.asObservable();
  }

  getInscripcionByAlumnoId(alumnoId: number): Observable<Inscripcion[]>{
    this.inscripciones$.next(this.inscripciones.filter((inscripcion) => inscripcion.alumno.id == alumnoId));
    return this.inscripciones$.asObservable();
  }

  getInscripcionById(inscripcionId: number): Observable<Inscripcion>{
    this.inscripcion$.next(this.inscripciones.filter((inscripcion) => inscripcion.id == inscripcionId)[0]);
    return this.inscripcion$.asObservable();
  }

  addNewInscripcion(alumnoPayload: CrearInscripcionPayload): Observable<Inscripcion[]>{
    this.inscripciones$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (inscripciones) => {
        this.inscripciones$.next([
          ...inscripciones,
          {
            id: inscripciones[inscripciones.length - 1].id + 1,
            ...alumnoPayload,
          },
        ]);
      },
      complete: () => {},
      error: () => {}
    });


    return this.inscripciones$.asObservable();
  }

  modifyInscripcion(idInscripcion: number, inscripcionUpdated: Inscripcion): Observable<Inscripcion[]>{
    this.inscripciones$
      .pipe(
        take(1),
      )
       .subscribe({
         next: (inscripciones) => {

           const inscripcionesUpdated = inscripciones.map((inscripcion) => {
             if (inscripcion.id === idInscripcion) {
               return {
                 ...inscripcion,
                 ...inscripcionUpdated,
               }
             } else {
               return inscripcion;
             }
           })

           this.inscripciones$.next(inscripcionesUpdated);
         },
         complete: () => {},
         error: () => {}
       });

    return this.inscripciones$.asObservable();
  }

  deleteInscripcion(inscripcionId: number): Observable<Inscripcion[]>{
    this.inscripciones$
    .pipe(
      take(1)
    ).subscribe({
      next: (inscripciones) => {
        const inscripcionesUpdated = inscripciones.filter((inscripcion) => inscripcion.id != inscripcionId);
        this.inscripciones$.next(inscripcionesUpdated);
      },
      complete: () => {},
      error: () => {}
    });

    return this.inscripciones$.asObservable();
  }
}
