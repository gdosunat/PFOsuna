import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-inscripcion-details',
  templateUrl: './inscripcion-details.component.html',
  styleUrls: ['./inscripcion-details.component.scss']
})
export class InscripcionDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private inscripcionesService: InscripcionesService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
     this.inscripcionesService.getInscripcionById(params['id']).subscribe((inscripcion) => this.inscripcion = inscripcion);
     this.inscripcion.alumno.sexo == "Femenino" ? "assets/img/female-icon.jpg" : "assets/img/male-icon.jpg";
   })
  }

  inscripcion = {
    id: 1,
    alumno: {id: 1, nombre: "Guadalupe", apellido: "Osuna", sexo: "Femenino", email: "lupita@email.com", pais: "Mexico"},
    curso: { id: 2, nombre: "Java Inicial", categoria: "Programacion", fechaInicio: new Date(2023, 6, 13), fechaFin: new Date(2023, 8, 8), info: "Aprende los conocimientos teóricos y prácticos de la programación Java orientada a objetos."},
  }

  id = 0;
  icon = ""

}
