import { Component, OnInit } from '@angular/core';
import links from './nav-items';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Usuario } from '../auth/models';
import { Observable, Subject, Subscription, filter, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  authUser$: Observable<Usuario | null>;
  links = links;

  constructor(
    private router: Router,
    private authService: AuthService
    ){
      this.authUser$ = this.authService.getLoggedInUser();
      let rol: string = "";
      this.authUser$.subscribe((user) => {
        rol = user?.rol ? user.rol : "";
      });

      this.links = links.filter((link) => {
        return link.roles && link.roles.includes(rol);
      })
    }

    logout(): void {
      this.authService.logout();
    }

}
