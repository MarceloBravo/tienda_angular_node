import { Injectable } from '@angular/core';
import { config } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  constructor() { }

  saveToken(token: string, refreshToken: string){
    if(config.rememberMe){
      localStorage.setItem(config.appName + '_token', token);
      localStorage.setItem(config.appName + '_refreshToken', refreshToken);
      sessionStorage.removeItem(config.appName + '_token');
      sessionStorage.removeItem(config.appName + '_refreshToken');
    }else{
      sessionStorage.setItem(config.appName + '_token', token);
      sessionStorage.setItem(config.appName + '_refreshToken', refreshToken);
      localStorage.removeItem(config.appName + '_token');
      localStorage.removeItem(config.appName + '_refreshToken');
    }
  }

  getToken(){
    if(config.rememberMe){
      return localStorage.getItem(config.appName + '_token');
    }else{
      return sessionStorage.getItem(config.appName + '_token');
    }
  }

  resumeSession(){
    const token: string | null = localStorage.getItem(config.appName + '_refreshToken');
    config.rememberMe = token !== null;
    return token;
  }

  getRefreshToken(){
    if(config.rememberMe){
      return localStorage.getItem(config.appName + '_refreshToken');
    }else{
      return sessionStorage.getItem(config.appName + '_refreshToken');
    }
  }

  removeToken(removeRefreshToken: boolean = true){
    if(config.rememberMe){
      localStorage.removeItem(config.appName + '_token');
      if(removeRefreshToken){
        localStorage.removeItem(config.appName + '_refreshToken');
      }
    }else{
      sessionStorage.removeItem(config.appName + '_token');
      if(removeRefreshToken){
        sessionStorage.removeItem(config.appName + '_refreshToken');
      }
    }
  }

  getTokenData(){
    let token: any = this.getToken();
    if(token){
      let tokenArr = token.split('.');
      if(tokenArr.length > 1){
        const decodeToken = JSON.parse(atob(tokenArr[1]));
        return decodeToken;
      }
    }
    return null
  }

}
