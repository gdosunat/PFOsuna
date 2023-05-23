import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.scss']
})
export class UsuarioDetailsComponent implements OnInit{
  constructor(
  private route: ActivatedRoute,
  private usuariosService: UsuariosService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
     this.usuariosService.getUsuarioById(params['id']).subscribe((usuario) => this.usuario = usuario);
   })
  }

  id = 0;
  usuario = {id: 0, nombre: "", email: "", password: "", rol: ""}
}
