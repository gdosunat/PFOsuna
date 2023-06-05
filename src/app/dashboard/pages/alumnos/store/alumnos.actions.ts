import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Alumno } from '../models';

export const AlumnosActions = createActionGroup({
  source: 'Alumnos',
  events: {
    'Load Alumnos': emptyProps(),
    'Load Alumnos Success': props<{ data: Alumno[] }>(),
    'Load Alumnos Failure': props<{ error: unknown }>(),
  }
});
