import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/class/menu/menu';
import { tipoAlerta } from 'src/app/enums/global-enums';
import { AlertasService } from 'src/app/services/alertas/alertas.service';
import { MenusService } from 'src/app/services/menus/menus.service';
import { config } from '../../../../../environments/environment';

@Component({
  selector: 'app-form-menus',
  templateUrl: './form-menus.component.html',
  styleUrls: ['./form-menus.component.css']
})
export class FormMenusComponent implements OnInit {
  protected form: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    link: new FormControl(null, [Validators.minLength(3), Validators.maxLength(250)]),
    menuPadreId: new FormControl(null),
    icono: new FormControl(null),
    posicion: new FormControl(0, [Validators.required, Validators.min(0)]),
    file: new FormControl(null)
  });
  protected menusPadres: Menu[] = [];
  protected tituloModal: String = '';
  protected mensajeModal: String = '';
  protected mostrarModal: Boolean = false;
  private accion: String = 'grabar';
  private previousURL: string = '/admin';
  

  constructor(
    private _menusService: MenusService,
    private _alertasService: AlertasService,
    private activatedRouter: ActivatedRoute, 
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    const id: string | null= this.activatedRouter.snapshot.paramMap.get('id')
    if(id){
      this.form.value.id = parseInt(id);
      this.buscarRegistro();
      this.previousURL = this.router.url.split('/edit')[0];
    }else{
      this.previousURL = this.router.url.split('/nuevo')[0];
    }
    this.obtenerMenusPadres();
  }

  private buscarRegistro(){
    if(this.form.value.id){
      this._menusService.find(this.form.value.id).subscribe({
        complete: () => {},
        error: (error: any) => this.errorHandler(error),
        next: (res: any) => this.cargarDatos(res)
      })
    }
  }

  private async cargarDatos(res: any){
    if(res['icono']){
      const img = <HTMLImageElement>document.getElementById('iconoImg');
      img.src = `${config.imagesStorage}/menus/${res['icono']}`;
    }
    res['icono'] = null;
    this.form.patchValue(res);
  }

  private obtenerMenusPadres(){
    this._menusService.getAll().subscribe({
      complete: () => {},
      error: (error: any)=> this.errorHandler(error),
      next: (res: any) => this.cargarMenusPadres(res.rows)
    });
  }

  private cargarMenusPadres(menus: any[]){
    this.menusPadres = menus.filter(mnu => mnu.id !== this.form.value.id);
  }

  protected selectImage(file: any){
    file.click();
  }

  protected loadImage(file: any, img: any){
    if(file.files.length > 0){
      this.form.value.file = file.files[0];
      this.form.value.icono = file.files[0].name;
      const reader = new FileReader();
      reader.onload = () => {
        const iconObject = reader.result as string;
        img.src = iconObject;        
      }
      reader.readAsDataURL(<File>this.form.value.file);
    }
  }

  protected save(){
    this.mensajeModal = `¿Desea ${this.form.value.id ? 'actualizar' : 'grabar'} el registro?`;
    this.tituloModal = 'Nuevo registro';
    this.mostrarModal = true;
    this.accion = 'grabar';
  }

  protected delete(){
    this.mensajeModal ='¿Desea eliminar el registro?';
    this.tituloModal = 'Eliminar registro';
    this.mostrarModal = true;
    this.accion = 'eliminar';
  }

  protected cancelar(){
    if(this.form.dirty){
      this.mostrarModal = true;
      this.mensajeModal = 'Existen cambios sin guardar. ¿Desea grabar los cambios?';
      this.accion = 'salir';
    }else{
      this.router.navigate([this.previousURL]);
    }
  }

  protected responseModal(res: Boolean){
    this.mostrarModal = false;
    this._alertasService.mostrar = false;
    if(!res){
      if(this.accion === 'salir'){
        this.router.navigate([this.previousURL]);
      }else{
        return; 
      } 
    }

    if(this.form.value.id){
      if(this.accion === 'grabar' || this.accion === 'salir'){
        this.actualizar(this.form.value.id);
      }else{
        this.eliminar(this.form.value.id);
      }
    }else{
      this.nuevo();
    }
  }


  private nuevo(){
    this._menusService.insert(this.form.value).subscribe({
      complete: () => {},
      error: (error: any) => this.errorHandler(error),
      next: (res: any) => this.successHandler(res)
    });
  }

  private actualizar(id: Number){    
    this._menusService.edit(id, this.form.value).subscribe({
      complete: () => {},
      error: (error: any) => this.errorHandler(error),
      next: (res: any) => this.successHandler(res)
    });
  }

  private eliminar(id: Number){
    this._menusService.erase(id).subscribe({
      complete: () => {},
      error: (error: any) => this.errorHandler(error),
      next: (res: any) => this.successHandler(res)
    });
  }

  protected hasError(control: string, error: string){
    return this.form.controls[control].hasError(error) && this.form.controls[control].dirty && this.form.controls[control].touched
  }


  /* ******************************************* */
  private successHandler(res: any){
    this._alertasService.tipo = tipoAlerta.success;
    this._alertasService.mensaje = res.mensaje ? res.mensaje : '';
    this._alertasService.titulo = 'Acción exitosa';
    this._alertasService.mostrar = true;
    this.router.navigate([this.previousURL]);
  }

  private errorHandler(error: any){
    this._alertasService.tipo = tipoAlerta.danger;
    this._alertasService.mensaje = error.error.data ? error.error.data : error.message;
    this._alertasService.titulo = 'Error';    
    this._alertasService.mostrar = true;
  }

  
}
