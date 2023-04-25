import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrores'
})
export class ControlErroresPipe implements PipeTransform {

  transform(error: any, ...args: unknown[]): unknown {
    const opciones: Record<string, string> = {
      required: 'Este campo es obligatorio',
      minlength: `Este campo debe tener al menos ${error.value.requiredLength} caracteres`,
      maxlenght: `Este campo debe tener máxico  ${error.value.requiredLength} caracteres`,
      email: 'Email inválido'
    }

    return opciones[error.key];
  }

}
