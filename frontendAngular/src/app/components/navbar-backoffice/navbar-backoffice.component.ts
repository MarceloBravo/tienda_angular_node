import { Component, ElementRef, ErrorHandler, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { TokenService } from 'src/app/services/token/token.service';
import { config } from 'src/environments/environment';

@Component({
  selector: 'app-navbar-backoffice',
  templateUrl: './navbar-backoffice.component.html',
  styleUrls: ['./navbar-backoffice.component.css']
})
export class NavbarBackofficeComponent implements OnInit {
  protected imagesPath = `../../../../${config.localImagesPath}`;
  @Output() toggleMenuClick: EventEmitter<Boolean> = new EventEmitter()  //Emisor de eventos
  
  private isSideMenuVisible: Boolean = true;
  protected isNotificacionesMenuVisible: Boolean = false;
  protected isMensajesMenuVisible: Boolean = false;
  protected isPerfilMenuVisible: Boolean = false;
  protected usuario: string = '';
  private loginTimerSusbcribe: any = null;
  protected tiempoRestanteLogin: number = 0;
  protected rememberMe: boolean = false;
  private isGettingNewToken: Boolean = false;

  constructor(
    private eRef: ElementRef,
    private _loginService: LoginService,
    private router: Router,
    private _tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.rememberMe = config.rememberMe;
    //Subscribiendose al observable que retorna el tiempo restante de la sessión del usuario, y guardando el objeto 
    //subscrito en una variable para desubscribirse una vez destruido el componente navbar
    this.loginTimerSusbcribe = this._loginService.getRestLoginTime().subscribe(restTime => {
      this.tiempoRestanteLogin = restTime;
      this.verificarSession();
    });
    

    //Obteniendo los datos del token almacenado en storage (Sessión o Local)
    const tokenData: any = this._tokenService.getTokenData();

    //Sólo si el tiempo del usuario es mayor a cero y exiten datos de usuario en el token la sessión permanece activa
    if(tokenData){ 
      this._loginService.loginCountdownStart();
      this.usuario = `${tokenData.user.nombres} ${tokenData.user.apellido1}`;
    }else{
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(){
    //Desubscribiendose observable de tiempo de sessión del usuario
    if(this.loginTimerSusbcribe){
      this.loginTimerSusbcribe.unsubscribe();
      this.loginTimerSusbcribe = null;
    }
  }

  sidebarToggleState(){
    this.isSideMenuVisible = !this.isSideMenuVisible;
    return this.toggleMenuClick.emit(this.isSideMenuVisible);
  }

  perfilMenuToggle(){
    this.isPerfilMenuVisible = !this.isPerfilMenuVisible;
  }

  mensajeMenuToggle(){
    this.isMensajesMenuVisible = !this.isMensajesMenuVisible;
  }

  notificacionesMenuToggle(){
    this.isNotificacionesMenuVisible = !this.isNotificacionesMenuVisible;
  }  

  @HostListener('document:click',['$event'])
  clickout(event: any) { 
    if(!this.eRef.nativeElement.contains(event.target)) { 
      //Click fuera de éste componente, oculta el menú de Perfil de usuario
      this.isNotificacionesMenuVisible = false;
      this.isMensajesMenuVisible = false;
      this.isPerfilMenuVisible = false;   
    } 
  }

  logout(){
    this._loginService.logout().subscribe({
      complete: () => {},
      error: (e) => {this.handlerError(e)},
      next: (resp: any) => {
        this.ngOnDestroy();
        this._loginService.logout().subscribe({
          complete: () => {},
          error: e => this.handlerError(e),
          next: (resp: any) => this.router.navigate(['/'])
        });
        
      }
    });
  }

  getTiempoRestante():String{
    let segundos = Math.floor(this.tiempoRestanteLogin / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    segundos = segundos % 60;
    minutos = minutos % 60;
    horas =  horas % 24;
    if(horas <= 0 && minutos <= 0 && segundos <=0){
      horas = 0;
      minutos = 0;
      segundos = 0;
    }
    return `${horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
  }

  private async verificarSession(){
    if(this.tiempoRestanteLogin < 0 && this.loginTimerSusbcribe){
      if(!this.rememberMe){
        this.loginTimerSusbcribe.unsubscribe();
        this.logout();
      }else{
        
        if(!this.isGettingNewToken){
          this.isGettingNewToken = true;
          this._loginService.refreshToken().subscribe({
            complete: () => {},
            error: e => this.handlerError(e),
            next: (res: any) => {
              console.log('NUEVO TOKEN',res.access_token);
              this._tokenService.saveToken(res.access_token, res.refresh_token);
              this.ngOnDestroy();
              this._loginService.restartLoginCountDown();
              this.ngOnInit();
              this.isGettingNewToken = false;
            }
          });
          
        }
      }
    }
  }

  private handlerError(error: any){
    console.log('ERROR: ', error);
  }

}
