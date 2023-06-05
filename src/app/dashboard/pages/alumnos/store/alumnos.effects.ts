import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AlumnosActions } from './alumnos.actions';
import { AlumnosService } from '../services/alumnos.service';


@Injectable()
export class AlumnosEffects {

  loadAlumnoss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AlumnosActions.loadAlumnos),
      concatMap(() =>
 
        this.alumnosService.getAllAlumnos().pipe(
          map(data => AlumnosActions.loadAlumnosSuccess({ data })),
          catchError(error => of(AlumnosActions.loadAlumnosFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions, private alumnosService: AlumnosService) {}
}
