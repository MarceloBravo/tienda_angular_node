import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridData } from 'src/app/class/gridData/grid-data';
import { Paginacion } from 'src/app/class/paginacion/paginacion';
import { tipoAlerta } from 'src/app/enums/global-enums';
import { AlertasService } from 'src/app/services/alertas/alertas.service';
import { MenusService } from 'src/app/services/menus/menus.service';
import { config } from '../../../../../environments/environment';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrls: ['./list-menus.component.css']
})
export class ListMenusComponent implements OnInit {
  protected gridData: GridData = new GridData()
  protected paginacion: Paginacion = new Paginacion();
  protected rowsClass: string[] = ['table-no-class','table-primary','table-no-class','table-success'];
  protected rowCalssId: number = -1;
  private textoFiltro: String = ''; 
  protected srcImages: String =  config.imagesStorage + '/menus/';
  protected mostrarModal: Boolean = false;
  private idDeleted: Number | null =  null;

  constructor(
    private _menusService: MenusService, 
    private _alertaService: AlertasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gridData.imageCols = ['icono'];
    this.gridData.stringDateCols = ['createdAt', 'updatedAt'];
    this.gridData.showColumnsName = ['nombre','icono','link','posicion','menuPadre.nombre', 'creaetedAt', 'updatedAt'];
    this.gridData.headers = ['Nombre','Icono','Link','Posición','Menu Padre', 'Fecha Creación', 'Fecha Actualización'];
    this.obtenerDatosPagina();
  }

  private obtenerDatosPagina(){
    this._menusService.getPag(this.paginacion.paginaActual, this.paginacion.filasPorPagina).subscribe({
      complete: ()=>{},
      error: (e: any) => this.errorHandler(e),
      next: (res: any) => this.cargarDatos(res)
    })
  }

  private cargarDatos(res: any){
    console.log('DATOS = ',res.data);
    this.gridData.rows = res.data;
    this.paginacion.filasPorPagina = res.regPorPagina;
    this.paginacion.paginaActual = res.pagina;
    this.paginacion.totPaginas = res.totalPaginas;
    this.paginacion.totRegistros = res.totalRegistros;
  }

  protected setRowsClass(){
    this.rowCalssId = this.rowCalssId >= this.rowsClass.length - 1 ? 0 : this.rowCalssId + 1;
    return this.rowsClass[this.rowCalssId];
  }

  protected textoBuscarChange(texto: String){
    this.paginacion.paginaActual = 1;
    this.buscar(texto);
  }

  private buscar(texto: String){    
    if(texto.trim().length > 0){
      this.textoFiltro = texto;
      this.filtrarDatosPagina(texto);
    }else{
      this.textoFiltro = '';
      this.obtenerDatosPagina();
    }
  }

  private filtrarDatosPagina(texto: String){
    this._menusService.filter(texto, this.paginacion.paginaActual, this.paginacion.filasPorPagina).subscribe({
      complete: () => {},
      next: (res: any) => this.cargarDatos(res),
      error: (e: any) => this.errorHandler(e)
    })
  }

  nuevo(){
    this.router.navigate([this.router.url + '/nuevo']);
  }
  
  protected editar(id: number){
    this.router.navigate([this.router.url + '/edit/'+id]);
  }

  protected eliminar(id: number){
    this.mostrarModal = true;
    this.idDeleted = id;
  }

  protected responseModal(res: Boolean){
    this.mostrarModal = false;
    if(res){
      this.eliminarMenu();
    }    
  }

  private eliminarMenu(){
    if(this.idDeleted){
     this._menusService.erase(this.idDeleted).subscribe({
      complete: () => {},
      error: (error: any) => this.errorHandler(error),
      next: (res: any) => {
        this.successHandler(res);
          this.obtenerDatosPagina();
        }
     });
    }
  }

  
  protected pageChange(e: any){
    if(this.paginacion.paginaActual !== e){
      this.paginacion.paginaActual = e;
      this.buscar(this.textoFiltro);
    }
  }

  protected changeRowsVisibles(cantPaginas: number){
    this.paginacion.filasPorPagina = cantPaginas;
    this.buscar(this.textoFiltro);
  }

  /* ******************************************* */
  private successHandler(res: any){
    this._alertaService.tipo = tipoAlerta.success;
    this._alertaService.mensaje = res.mensaje ? res.mensaje : '';
    this._alertaService.titulo = 'Acción exitosa';    
    this._alertaService.mostrar = true;
    this.router.navigate(['/admin/menus']);
  }

  private errorHandler(error: any){
    this._alertaService.tipo = tipoAlerta.danger;
    this._alertaService.mensaje = error.error.data ? error.error.data : error.message;
    this._alertaService.titulo = 'Error';
    this._alertaService.mostrar = true;
  }
}
