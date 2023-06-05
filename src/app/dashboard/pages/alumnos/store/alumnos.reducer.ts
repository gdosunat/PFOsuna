import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnosActions } from './alumnos.actions';
import { Alumno } from '../models';

export const alumnosFeatureKey = 'alumnos';

export interface State {
  alumnosList: Alumno[],
  error: unknown
}

export const initialState: State = {
  error: null,
  alumnosList: []
};

export const reducer = createReducer(
  initialState,
  on(AlumnosActions.loadAlumnos, state => {
    console.log("GPOT")
    return {
      ...state
    }
  }),
  on(AlumnosActions.loadAlumnosSuccess, (state, action) => {
    return {
      ...state,
      alumnosList: action.data
    }
  }),
  on(AlumnosActions.loadAlumnosFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
);

export const alumnosFeature = createFeature({
  name: alumnosFeatureKey,
  reducer,
});

