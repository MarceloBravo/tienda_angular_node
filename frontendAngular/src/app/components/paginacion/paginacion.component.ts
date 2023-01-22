import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {
  @Input() paginaActual: number = 1;
  @Input() totalPaginas: number = 1;
  @Input() paginasVisibles: number = 3;
  @Output() clickPage: EventEmitter<number> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  protected pageClick(pag: number){
    return this.clickPage.emit(pag);
  }

  protected getArrayPaginas(){
    let arrPaginas: number[]  = [];
    if(this.totalPaginas > 0){
      for(let pagina = this.paginaDesde(); pagina <= this.paginaHasta(); pagina++){
        arrPaginas.push(pagina);
      }
    }
    return arrPaginas;
  }

  private paginaDesde(){
    switch (true){
      case (this.paginaActual < this.paginasVisibles):
        return 1;
      case (this.paginaActual > this.totalPaginas - this.paginasVisibles):
        return this.totalPaginas - this.paginasVisibles; 
      default:
        return this.paginaActual -1;
    }
  }

  private paginaHasta(){
    switch (true){
      case this.paginasVisibles > this.totalPaginas:
        return this.totalPaginas;
      case (this.paginaActual < this.paginasVisibles):
        return this.paginasVisibles;
      case (this.paginaActual > this.totalPaginas - this.paginasVisibles):
        return this.totalPaginas; 
      default:
        return this.paginaActual -1 + this.paginasVisibles;
    }
  }

  protected isActivePge(pag: number): String{
    return pag === this.paginaActual ? 'active' : '';
  }
}
