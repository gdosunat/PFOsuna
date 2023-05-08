import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { CrearInscripcionPayload, Inscripcion } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private inscripciones$ = new BehaviorSubject<Inscripcion[]>([]);
  private inscripcion$ = new BehaviorSubject<Inscripcion>(
    {
      id: 0,
      alumno: {id: 0, nombre: "", apellido: "", sexo: "", email: "", pais: ""},
      curso: {id:0, nombre: "", categoria: "", fechaFin: new Date(), fechaInicio: new Date(), info: ""}
    });

  getAllInscripciones(): Observable<Inscripcion[]>{
    this.httpClient.get<Inscripcion[]>(`http://localhost:3000/inscripciones`)
    .subscribe((inscripciones) =>{
      if(inscripciones){
        this.inscripciones$.next(inscripciones);
      }
    })
    return this.inscripciones$.asObservable();
  }

  getInscripcionByAlumnoId(alumnoId: number): Observable<Inscripcion[]>{
    this.httpClient.get<Inscripcion[]>(`http://localhost:3000/inscripciones`)
    .subscribe((inscripciones) =>{
      if(inscripciones){
        const alumnoInscripciones = inscripciones.filter((inscripcion) => inscripcion.alumno.id == alumnoId)
        this.inscripciones$.next(alumnoInscripciones);
      }
    })
    return this.inscripciones$.asObservable();
  }

  getInscripcionById(inscripcionId: number): Observable<Inscripcion>{
    this.httpClient.get<Inscripcion[]>(`http://localhost:3000/inscripciones`, {
      params: {
        id: inscripcionId
      }
    })
    .subscribe((inscripciones) => {
      if(inscripciones){
        this.inscripcion$.next(inscripciones[0]);
      } else {
        console.log("ERROR: Inscripcion no encontrada")
      }
    })

    return this.inscripcion$.asObservable();
  }

  addNewInscripcion(inscripcionPayload: CrearInscripcionPayload): Observable<Inscripcion[]>{
    this.httpClient.post<Inscripcion>(`http://localhost:3000/inscripciones`, inscripcionPayload).subscribe((nuevaInscripcion) => {
      this.inscripciones$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (inscripciones => {
          inscripciones.push(nuevaInscripcion);
          this.inscripciones$.next(inscripciones)
        })
      })
    })
    return this.inscripciones$.asObservable();
  }

  modifyInscripcion(idInscripcion: number, inscripcionUpdated: Inscripcion): Observable<Inscripcion[]>{
    this.httpClient.put<Inscripcion>(`http://localhost:3000/inscripciones/${idInscripcion}`, inscripcionUpdated).subscribe((inscripcionUpdated) => {
      this.inscripciones$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (inscripciones => {
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
        })
      })
    })

    return this.inscripciones$.asObservable();
  }

  deleteInscripcion(inscripcionId: number): Observable<Inscripcion[]>{
    this.httpClient.delete<Inscripcion>(`http://localhost:3000/inscripciones/${inscripcionId}`).subscribe((response) => {
      this.inscripciones$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (inscripciones) => {
          const inscripcionesUpdated = inscripciones.filter((inscripcion) => inscripcion.id != inscripcionId);
          this.inscripciones$.next(inscripcionesUpdated);
        }
      })
    })
    return this.inscripciones$.asObservable();
  }
}
