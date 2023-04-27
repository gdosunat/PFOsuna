import { Alumno } from "../../alumnos/models";
import { Curso } from "../../cursos/models";

export interface Inscripcion { 
    id: number,
    alumno: Alumno,
    curso: Curso
}

export interface RecibirInscripcionPayload{
    alumno: string,
    curso: string
}

export interface CrearInscripcionPayload {
    alumno: Alumno,
    curso: Curso
}