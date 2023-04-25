import { Component, OnInit } from '@angular/core';
import { CursosService } from './services/cursos.service';
import { Curso } from './models';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit{

  constructor(private cursosService: CursosService){
    console.log(this.cursos)
  }
  cursos: Curso[] = []

  ngOnInit(): void {
    this.cursosService.getAllCursos().subscribe((cursos) => {
      this.cursos = cursos
    });
  }
}
