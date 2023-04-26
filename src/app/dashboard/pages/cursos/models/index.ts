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
  categoria: string,
  fechaInicio: Date,
  fechaFin: Date,
  info: string
}
