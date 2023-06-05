import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion } from '../models';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  inscripcionesList: Inscripcion[],
  error: unknown
}

export const initialState: State = {
  inscripcionesList: [],
  error: null
};

export const reducer = createReducer<State>(
  initialState,
  on(InscripcionesActions.loadInscripciones, state => {
    return {
      ...state,
    }
  }
    ),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      inscripcionesList: action.data,
    }
  }),
  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});
