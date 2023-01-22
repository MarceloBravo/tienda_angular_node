import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { HeadersService } from '../headers/headers.service';
import { TokenService } from '../token/token.service';
import { timer, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endPoint: string = '/login';
  private restLoginTime$ = new Subject<number>();
  private observerTimer: any | null;

  constructor(
    private http: HttpClient,
    private _headersService: HeadersService,
    private _tokenService: TokenService
  ) { }

  login(loginForm: FormGroup){
    this.unsubscribeTimer();
    loginForm.value.host = config.host;
    config.rememberMe = <boolean><unknown>loginForm.value['rememberMe'];
    return this.http.post(config.endPoint + this.endPoint, loginForm.value);
  }

  logout(){
    const headers = this._headersService.getHeader();
    this._tokenService.removeToken();
    this.unsubscribeTimer();
    return this.http.post(config.endPoint + '/logout', null, {headers});
  }

  private unsubscribeTimer(){
    if(this.observerTimer){
      this.observerTimer.unsubscribe();
      this.observerTimer = null;  
    }
  }

  refreshToken(){
    let refreshToken: string =  <string><unknown>this._tokenService.getRefreshToken();
    console.log('REFRESHTOKEN', refreshToken);
    let host: string = config.host;
    return this.http.post(config.endPoint + '/refreshtoken', {refreshToken, host});
  }

  restartLoginCountDown(){
    this.unsubscribeTimer();
    this.loginCountdownStart();
  }


  loginCountdownStart(){
    if(!this.observerTimer){
      const tokenData: any = this._tokenService.getTokenData();
      const timerRest = tokenData?.exp ? (new Date(0)).setUTCSeconds(tokenData.exp) : 0;
      
      const source = timer(500, 1000);
      this.observerTimer = source.subscribe(val => {
        this.restLoginTime$.next((timerRest - val*2) - (new Date()).getTime());
      });
    }
  }

  getRestLoginTime(): Observable<number>{
    return this.restLoginTime$.asObservable() ;
  }


}
