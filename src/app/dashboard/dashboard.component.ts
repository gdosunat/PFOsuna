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
  links = links;
  authUser$: Observable<Usuario | null>;

  constructor(
    private router: Router,
    private authService: AuthService
    ){
      this.authUser$ = this.authService.getLoggedInUser();
    }

    logout(): void {
      this.authService.logout();
    }

}
