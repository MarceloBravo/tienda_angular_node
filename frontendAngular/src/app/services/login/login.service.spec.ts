import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { config } from '../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../token/token.service';

describe('LoginService', () => {
  let loginService: LoginService;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;
  let form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.maxLength(150)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    host: new FormControl(''),
    rememberMe: new FormControl(false)
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    loginService = TestBed.inject(LoginService);
    tokenService = TestBed.inject(TokenService);

    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject(
    [LoginService],
    (service: LoginService) => {
      loginService = service;
    }
  ));

  afterEach(() => {
    //jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
  })

  it('LoginService should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it("LoginService - Prueba de login", () =>{
    form.value['email'] = '';
    form.value['password'] = '';
    form.value['host'] = '';
    form.value['rememberMe'] = '';

    loginService.login(form).subscribe();
    let req: any = httpTestingController.expectOne({method: 'POST', url: config.endPoint + '/login'});
    expect(req.request.body).toBeTruthy();
  });

  it("LoginService - Prueba de actualización de token", () =>{
    loginService.refreshToken().subscribe();
    let req: any = httpTestingController.expectOne({method: 'POST', url: config.endPoint + '/refreshtoken'});
    let refreshToken: string =  <string><unknown>tokenService.getRefreshToken();
    let host: string = config.host;
    expect(req.request.body).toEqual({refreshToken, host});
  });

  it("LoginService - Prueba de logout", () =>{
    loginService.logout().subscribe();
    let req: any = httpTestingController.expectOne({method: 'POST', url: config.endPoint + '/logout'});
    expect(req.request.body).toEqual(null);
  });

});
