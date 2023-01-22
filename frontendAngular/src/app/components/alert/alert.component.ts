import { Component, OnInit } from '@angular/core';
import { tipoAlerta } from 'src/app/enums/global-enums';
import { AlertasService } from 'src/app/services/alertas/alertas.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  protected mensaje: String = '';
  protected titulo: String = 'Información';
  protected tipoAlerta: tipoAlerta = tipoAlerta.success;
  protected mostrar: Boolean = true;

  constructor(
    protected _alertasService: AlertasService
  ) { }

  ngOnInit(): void {
  }

  protected ocultar(){
    this._alertasService.mostrar = false;
    this._alertasService.titulo = '';
    this._alertasService.mensaje = '';
  }

}
