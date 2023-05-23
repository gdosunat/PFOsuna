import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";
import {LoginPayload, Usuario} from "../models";
import {Router} from "@angular/router";
import {skip} from "rxjs";

describe('Pruebas sobre AuthService', () => {

  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    }).compileComponents();

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  })

  it('El Login debe funcionar', (done) => {
    const mockLogin: LoginPayload = {
      email: "test@test.com",
      password: "123456"
    };

    service.login(mockLogin);
    service.getLoggedInUser()
      .pipe(
        skip(1)
      ).subscribe((user) => {
      expect(user).toBeTruthy();
      done();
    });

    spyOn(TestBed.inject(Router), 'navigate');

    const MOCK_RESPONSE: Usuario[] = [
      {
        id: 1,
        nombre: "Lupita",
        email: mockLogin.email,
        password: mockLogin.password,
        token: "jhadbhdwdhyghadjbhjadadASDAD",
        rol: "admin"
      }
    ]

    httpController.expectOne({
      url: `http://localhost:3000/usuarios?email=${mockLogin.email}&password=${mockLogin.password}`,
      method: 'GET'
    }).flush(MOCK_RESPONSE);

  })
});
