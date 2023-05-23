import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { CrearUsuarioPayload, Usuario } from 'src/app/auth/models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private usuarios$ = new BehaviorSubject<Usuario[]>([])
  private usuario$ = new BehaviorSubject<Usuario>({id: 0, nombre: "", email: "", password: "", token: "", rol: ""})

  getAllUsuarios(): Observable<Usuario[]>{
    this.httpClient.get<Usuario[]>(`http://localhost:3000/usuarios`)
    .subscribe((usuarios) => {
      if(usuarios){
        this.usuarios$.next(usuarios)
      }
    })
    return this.usuarios$.asObservable();
  }

  getUsuarioById(usuarioId: number): Observable<Usuario>{
    this.httpClient.get<Usuario[]>(`http://localhost:3000/usuarios`, {
      params: {id: usuarioId}
    })
    .subscribe((usuarios) => {
      if(usuarios){
        this.usuario$.next(usuarios[0])
      } else {
        console.log("ERROR: Usuario no encontrado");
      }
    })

    return this.usuario$.asObservable();
  }

  addNewUsuario(usuarioPayload: CrearUsuarioPayload): Observable<Usuario[]>{
    this.httpClient.post<Usuario>(`http://localhost:3000/usuarios`, usuarioPayload).subscribe((nuevoUsuario) => {
      this.usuarios$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (usuarios => {
          usuarios.push(nuevoUsuario);
          this.usuarios$.next(usuarios)
        })
      })
    })
    return this.usuarios$.asObservable();
  }

  modifyUsuario(usuarioId: number, usuarioUpdated: Usuario): Observable<Usuario[]>{
    this.httpClient.put<Usuario>(`http://localhost:3000/usuarios/${usuarioId}`, usuarioUpdated).subscribe((usuariosUpdated) => {
      this.usuarios$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (usuarios => {
          const usuariosUpdated = usuarios.map((usuario) => {
            if (usuario.id === usuarioId) {
              return {
                ...usuario,
                ...usuarioUpdated,
              }
            } else {
              return usuario;
            }
          })

          this.usuarios$.next(usuariosUpdated);
        })
      })
    })

    return this.usuarios$.asObservable();
  }

  deleteUsuario(usuarioId: number): Observable<Usuario[]>{
    this.httpClient.delete<Usuario>(`http://localhost:3000/usuarios/${usuarioId}`).subscribe((response) => {
      this.usuarios$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (usuarios) => {
          const usuariosUpdated = usuarios.filter((usuario) => usuario.id != usuarioId);
          this.usuarios$.next(usuariosUpdated);
        }
      })
    })
    return this.usuarios$.asObservable();
  }
}

