import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErroresPipe } from './control-errores.pipe';
import { NombreCompletoPipe } from './nombre-completo.pipe';



@NgModule({
  declarations: [
    ControlErroresPipe,
    NombreCompletoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ControlErroresPipe,
    NombreCompletoPipe
  ]
})
export class PipesModule { }
