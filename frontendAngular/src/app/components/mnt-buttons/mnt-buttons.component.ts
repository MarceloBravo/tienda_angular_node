import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mnt-buttons',
  templateUrl: './mnt-buttons.component.html',
  styleUrls: ['./mnt-buttons.component.css']
})
export class MntButtonsComponent implements OnInit {
  @Input() successText: String = 'Grabar';
  @Input() dangerText: String = 'Eliminar';
  @Input() primaryText: String = 'Cancelar';
  @Input() btnSuccessEnabled: Boolean = true;
  @Input() btnDangerEnabled: Boolean = true;
  @Input() btnPrimaryEnabled: Boolean = true;
  @Output() successClick: EventEmitter<number> = new EventEmitter()
  @Output() dangerClick: EventEmitter<number> = new EventEmitter()
  @Output() cancelClick: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  protected successHandler(){
    return this.successClick.emit(1);
  }

  protected dangerHandler(){
    return this.dangerClick.emit(2);
  }

  protected primaryHandler(){
    return this.cancelClick.emit(0);
  }

}
