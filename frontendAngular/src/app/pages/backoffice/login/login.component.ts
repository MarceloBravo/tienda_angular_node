import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css?',
    '../../../../assets/css/app.css'
  ]
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.maxLength(150)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    host: new FormControl(''),
    rememberMe: new FormControl(false)
  })

  constructor(
    private _loginService: LoginService,
    private _tokenServices: TokenService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const token: string | null = this._tokenServices.resumeSession();
    if(token){
      this._loginService.refreshToken().subscribe({
        complete: () => {},
        error: e => this.errorHandler(e),
        next: (res: any) => {this.loginSuccess(res)}
      });
    }
  }

  public login(){
    this._loginService.login(this.form).subscribe({
      complete: () => { console.log('Login is complete') }, // completeHandler
      error: (e) => { this.errorHandler(e) },    // errorHandler
      next: (resp: any) => { this.loginSuccess(resp) },     // nextHandler
    })
  }

  private loginSuccess(resp: any){
    this._tokenServices.saveToken(resp.access_token, resp.refresh_token);
    this.router.navigate(['/admin']);
  }

  private errorHandler(error: any){
    console.log('ERROR',error);
  }
}
