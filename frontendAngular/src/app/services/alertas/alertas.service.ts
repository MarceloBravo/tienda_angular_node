import { EventEmitter, Injectable } from '@angular/core';
import { tipoAlerta } from 'src/app/enums/global-enums';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  //public mensajeChange$: EventEmitter<string> = new EventEmitter<string>()
  public titulo: string = 'Alerta';
  public mensaje: string = '';
  public tipo: tipoAlerta = tipoAlerta.success;
  public mostrar: boolean = false;

  constructor() { }
  /*
  setMensaje(mensaje: string){
    this.mensaje = mensaje;
    return this.mensajeChange$.emit(mensaje);
  }
  */
}
