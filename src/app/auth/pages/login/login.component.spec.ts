import {TestBed} from "@angular/core/testing";
import { ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "./login.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {PipesModule} from "../../../shared/pipes/pipes.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "../../services/auth.service";

describe('Pruebas de LoginComponent', () => {

  let component: LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        PipesModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('Si el email y password esta vacio el form debe ser invalido', () => {
    component.loginForm.setValue({email: "", password: ""});
    expect(component.emailControl.invalid).toBeTrue();
    expect(component.passwordControl.invalid).toBeTrue();
  });

  it('Si el formulario es invalido debe marcar todos los controles como touched', () => {
    component.loginForm.setValue({email: "", password: ""});
    component.onSubmit();
    expect(component.emailControl.touched).toBeTrue();
    expect(component.passwordControl.touched).toBeTrue();
  });

  it('Si el formulario es valido, el metodo login del authService debe ser llamado', () => {
    component.loginForm.setValue({email: "test@test.com", password: "123456"});
    expect(component.loginForm.valid).toBeTrue();
    const spyLogin = spyOn(TestBed.inject(AuthService), "login");
    component.onSubmit();
    expect(spyLogin).toHaveBeenCalled();
  })
});
