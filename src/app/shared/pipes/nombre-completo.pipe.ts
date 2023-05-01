import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from 'src/app/dashboard/pages/alumnos/models';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): unknown {

    const isMayuscula = args[0] === "Mayuscula";
    const newValue =`${value.nombre} ${value.apellido}`

    switch(args[0]){
      case 'Mayuscula':
        return newValue.toUpperCase();
      case 'Minuscula':
        return newValue.toLowerCase();
      default:
        return newValue;
    }
  }

}
