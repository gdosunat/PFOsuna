import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginPayload, Usuario } from '../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  getLoggedInUser(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
  }

  login(loginPayload: LoginPayload): void {

    const usuario = {
      id: 1,
      nombre: "Lupita",
      email: loginPayload.email,
      password: loginPayload.password,

    }
    this.authUser$.next(usuario);
    this.router.navigate(['dashboard']);
  }
}
