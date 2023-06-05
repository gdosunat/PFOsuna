import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CrearInscripcionPayload, Inscripcion } from '../models';

export const InscripcionesActions = createActionGroup(
    {
    source: 'Inscripciones',
    events: {
      'Load Inscripciones': emptyProps(),
      'Load Inscripciones Success': props<{ data: Inscripcion[] }>(),
      'Load Inscripciones Failure': props<{ error: unknown }>(),
    }
  },
);
