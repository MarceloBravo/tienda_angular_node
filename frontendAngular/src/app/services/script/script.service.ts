import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor() { }


  load(srcs: string[], target = 'head'){
    for(let i=0; i < srcs.length; i++){
      const nodo = document.createElement('script');
      nodo.src = srcs[i];
      nodo.type ='text/javascript';
      nodo.async = false;
      document.getElementsByTagName(target)[0].appendChild(nodo);
    }
  }
}
