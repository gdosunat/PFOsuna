import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.scss']
})
export class CursoDetailsComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
     this.cursosService.getCursoById(params['id']).subscribe((curso) => this.curso = curso);
   }
     )
  }

  id = 0;
  curso= { id: 1, nombre: "Angular", categoria: "Programacion", fechaInicio: new Date(2023, 3, 12), fechaFin: new Date(2023, 5, 12), info: "Aprenderás a crear y mantener aplicaciones web en una sola página con Angular." }
}
