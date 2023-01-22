import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserversService {
  private isSideBarOpen$ = new Subject<Boolean>(); //Observable


  constructor() { }



  mostrarOcultarMenuLateral(newState: Boolean){
    this.isSideBarOpen$.next(newState);
  }

  getMenuLateralVisible$(){
    return this.isSideBarOpen$.asObservable();
  }


}
