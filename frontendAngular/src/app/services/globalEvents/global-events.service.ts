import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventsService {
  public isSideBarVisible$: EventEmitter<Boolean> = new EventEmitter<Boolean>()  //Emisor de eventos
  private isSideMenuVisible: Boolean = true;

  constructor() { }

  togleSideMenu(){
    this.isSideMenuVisible = !this.isSideMenuVisible;
    return this.isSideBarVisible$.emit(this.isSideMenuVisible);
  }
}
