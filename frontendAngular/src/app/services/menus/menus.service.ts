import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../environments/environment'
import { HeadersService } from '../headers/headers.service';
import { Menu } from 'src/app/class/menu/menu';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private url = 'menus';

  constructor(
    protected http: HttpClient,
    private _headers: HeadersService
  ) { }

  getChildrenMenus(idMenuPadre: number | null = null){
    //console.log(`${config.endPoint}/${this.url}/parent/${idMenuPadre}`);
    return this.http.get(`${config.endPoint}/${this.url}/parent/${idMenuPadre}`,{headers: this._headers.getHeader()});
  }

  getPag(pag: number, rows: number){
    console.log(`${config.endPoint}/${this.url}/pag/${pag}/${rows}`);
    return this.http.get(`${config.endPoint}/${this.url}/pag/${pag}/${rows}`,{headers: this._headers.getHeader()});
  }

  getAll(){
    return this.http.get(`${config.endPoint}/${this.url}/get/all`,{headers: this._headers.getHeader()});
  }

  filter(texto: String, pag: number, rows: number){
    return this.http.get(`${config.endPoint}/${this.url}/filtrar/${texto}/${pag}/${rows}`,{headers: this._headers.getHeader()});
  }

  find(id: number){
    return this.http.get(`${config.endPoint}/${this.url}/${id}`,{headers: this._headers.getHeader()});
  }

  insert(menu: Menu){
    
    const formData: FormData = new FormData();
    Object.keys(menu).forEach((key, i) => formData.append(key, <any>menu[key as keyof Menu] ));
    formData.forEach((e, v) => console.log(v, e));
    const headers = this._headers.getHeaderFile();

    return this.http.post<any>(`${config.endPoint}/${this.url}`, formData, {headers});
  }

  edit(id: Number, menu: Menu){
    return this.http.put(`${config.endPoint}/${this.url}/${id}`, menu, {headers: this._headers.getHeader()});
  }

  erase(id: Number){
    return this.http.delete(`${config.endPoint}/${this.url}/${id}`, {headers: this._headers.getHeader()});
  }

  softDelete(id: number){
    return this.http.delete(`${config.endPoint}/${this.url}/${id}`, {headers: this._headers.getHeader()});
  }
}
