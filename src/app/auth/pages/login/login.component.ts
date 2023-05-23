import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPayload } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService
  ){}

  emailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
  });

  onSubmit(): void {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.loginForm.value as LoginPayload)
    }
  }
}
