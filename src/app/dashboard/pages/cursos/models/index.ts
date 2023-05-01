export interface Curso {
  id: number,
  nombre: string,
  categoria: string,
  fechaInicio: Date,
  fechaFin: Date,
  info: string
}

export interface CrearCursoPayload {
  nombre: string,
  categoria: CategoriasCursos,
  fechaInicio: Date,
  fechaFin: Date,
  info: string
}

export enum CategoriasCursos {
  PROGRAMACION = "Programacion",
  DISEÑO_UX_UI = "Diseño UX/UI",
  DATA = "Data"
}
