export interface Alumno {
  id: number,
  nombre: string,
  apellido: string,
  sexo: string,
  email: string,
  pais: string
}

export interface CrearAlumnoPayload {
  nombre: string,
  apellido: string,
  sexo: string,
  email: string,
  pais: string
}
