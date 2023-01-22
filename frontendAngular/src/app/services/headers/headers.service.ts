import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(
    private _tokenService: TokenService
  ) { }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._tokenService.getToken()}`
    });
  }

  getHeaderFile(){
    return new HttpHeaders({
      'Authorization': `Bearer ${this._tokenService.getToken()}`
    });
  }
}
