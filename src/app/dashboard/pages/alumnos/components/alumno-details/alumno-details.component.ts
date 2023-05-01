import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';

@Component({
  selector: 'app-alumno-details',
  templateUrl: './alumno-details.component.html',
  styleUrls: ['./alumno-details.component.scss']
})
export class AlumnoDetailsComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesService
    ){}

 ngOnInit(): void {
   this.route.params.subscribe((params: Params) => {
    this.alumnosService.getAlumnoById(params['id']).subscribe((alumno) => this.alumno = alumno);
    this.inscripcionesService.getInscripcionByAlumnoId(params['id']).subscribe((response) => this.inscripciones = response);
    this.icon = this.alumno.sexo === "Femenino" ? "assets/img/female-icon.jpg" : "assets/img/male-icon.jpg";
  })
 }

 id = 0;
 icon = ""
 alumno = {id: 1, nombre: "Guadalupe", apellido: "Osuna", sexo: "Femenino", email: "lupita@email.com", pais: "Mexico"}
 inscripciones = [{id: 0, alumno: {id: 0, nombre: "", apellido: "", sexo: "", email: "", pais: ""}, curso: {id: 0, nombre: "", categoria: "", fechaInicio: new Date(), fechaFin: new Date(), info: ""}}]

}
