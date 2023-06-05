import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { LoginPayload, Usuario } from '../models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { EstablecerUsuarioAutenticado, QuitarUsuarioAutenticado } from 'src/app/store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  getLoggedInUser(): Observable<Usuario | null> {
    return this.store.select(selectAuthUser);
  }

  establecerUsuarioAutenticado(usuario: Usuario, token: string): void {
    this.store.dispatch(EstablecerUsuarioAutenticado({ payload: { ...usuario, token } }));
  }

  login(loginPayload: LoginPayload): void {
    this.httpClient.get<Usuario[]>(
      `http://localhost:3000/usuarios`,
    {
      params: {
        ...loginPayload
      }
    }).subscribe({
      next: (usuarios => {
        const usuarioAutentificado = usuarios[0];

        if(usuarioAutentificado){
          localStorage.setItem("token", usuarioAutentificado.token);
          this.establecerUsuarioAutenticado(usuarioAutentificado, usuarioAutentificado.token);
          this.router.navigate(['dashboard']);
        } else {
          alert("Usuario y/o contraseña incorrectos");
        }
      })
    })
  }

  verifyStorage(): Observable<boolean> {
    const token = localStorage.getItem("token");
    return this.httpClient.get<Usuario[]>(`http://localhost:3000/usuarios`, {
      params: {
        token: token || '',
      },
    }).pipe(
      map((u) => {
        const usuario = u[0];
        if (usuario) {
          localStorage.setItem('token', usuario.token)
          this.establecerUsuarioAutenticado(usuario, usuario.token);
        }
        return usuario ? true : false;
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(QuitarUsuarioAutenticado());
    this.router.navigate(['auth']);
  }
}
