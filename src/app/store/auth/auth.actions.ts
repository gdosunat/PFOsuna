import { createAction, props } from "@ngrx/store";
import { Usuario } from "src/app/auth/models";

export const EstablecerUsuarioAutenticado = createAction(
  '[auth] Establecer usuario',
  props<{ payload: Usuario & { token: string } }>(),
);


export const QuitarUsuarioAutenticado = createAction('[auth] Quitar usuario')
