import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { LoginPayload, Usuario } from '../models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  getLoggedInUser(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
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
          this.authUser$.next(usuarioAutentificado);
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
        if (usuario) this.authUser$.next(usuario);
        return usuario ? true : false;
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }
}
