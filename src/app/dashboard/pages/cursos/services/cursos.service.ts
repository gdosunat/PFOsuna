import { Injectable } from '@angular/core';
import { Curso } from '../models';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }

  cursos: Curso[] = [
    { id: 1, nombre: "Angular", categoria: "Programacion", fechaInicio: new Date(2023, 3, 12), fechaFin: new Date(2023, 5, 12), info: "Aprenderás a crear y mantener aplicaciones web en una sola página con Angular." },
    { id: 2, nombre: "Java Inicial", categoria: "Programacion", fechaInicio: new Date(2023, 6, 13), fechaFin: new Date(2023, 8, 8), info: "Aprende los conocimientos teóricos y prácticos de la programación Java orientada a objetos."},
    { id: 3, nombre: "UX Research", categoria: "Diseño UX/UI", fechaInicio: new Date(2023, 5, 16), fechaFin: new Date(2023, 7, 13), info: "Aprende a diseñar y a ejecutar un proyecto de Investigación UX. Profundiza en los conceptos y metodologías propias de este prometedor campo de trabajo."},
    { id: 4, nombre: "UI", categoria: "Diseño UX/UI", fechaInicio: new Date(2023, 9, 11), fechaFin: new Date(2023, 23, 10), info: "Aprende a analizar y planificar la creación de un design system basado en Atomic Design Methodology."},
    { id: 5, nombre: "Business Analytics", categoria: "Data", fechaInicio: new Date(2023, 5, 15), fechaFin: new Date(2023, 7, 12), info: "Aprende sobre las metodologías y herramientas necesarias para medir el desempeño y la evolución de un negocio."},
    { id: 6, nombre: "Data Science", categoria: "Data", fechaInicio: new Date(2023, 5, 16), fechaFin: new Date(2023, 11, 30), info: "En este curso aprenderás la teoría e implementación de proyectos de Data Science. Crearás desde cero un modelo predictivo con Machine Learning."},
  ];

  private cursos$ = new BehaviorSubject<Curso[]>([]);

  getAllCursos(): Observable<Curso[]>{
    this.cursos$.next(this.cursos);
    return this.cursos$.asObservable();
  }
}
