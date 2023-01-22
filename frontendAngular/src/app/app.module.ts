import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; //Necesario para usar formGroup y formControl
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/backoffice/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './pages/backoffice/main/main.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SubMenusComponent } from './components/sub-menus/sub-menus.component';
import { ListMenusComponent } from './pages/backoffice/menus/list-menus/list-menus.component';
import { FormMenusComponent } from './pages/backoffice/menus/form-menus/form-menus.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarBackofficeComponent } from './components/navbar-backoffice/navbar-backoffice.component';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
import { MntButtonsComponent } from './components/mnt-buttons/mnt-buttons.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { AlertComponent } from './components/alert/alert.component';
import { GridComponent } from './components/grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SideMenuComponent,
    SubMenusComponent,
    ListMenusComponent,
    FormMenusComponent,
    FooterComponent,
    NavbarBackofficeComponent,
    PaginacionComponent,
    MntButtonsComponent,
    ModalDialogComponent,
    AlertComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
