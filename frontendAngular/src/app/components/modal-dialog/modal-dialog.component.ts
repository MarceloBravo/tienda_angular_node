import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  @Input() titulo: String = 'Atención';
  @Input() mensaje: String = 'Este es un modal de ejemplo';
  @Input() textoBotonAceptar: String = 'Aceptar';
  @Input() textoBotonCancelar: String = 'Cancelar'; 
  @Input() showModal: Boolean = false;
  @Output() cancelarClick: EventEmitter<Boolean> = new EventEmitter();
  @Output() aceptarClick: EventEmitter<Boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  protected cancelClick(){
    this.showModal = false;
    return this.cancelarClick.emit(false);
  }

  protected aceptClick(){
    this.showModal = false;
    return this.aceptarClick.emit(true);
  }

}
