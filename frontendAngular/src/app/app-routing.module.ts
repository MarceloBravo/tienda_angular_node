import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/backoffice/login/login.component';
import { MainComponent } from './pages/backoffice/main/main.component';
import { FormMenusComponent } from './pages/backoffice/menus/form-menus/form-menus.component';
import { ListMenusComponent } from './pages/backoffice/menus/list-menus/list-menus.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'admin', component: MainComponent,
    children: [
      {path: 'menus', component: ListMenusComponent},
      {path: 'menus/edit/:id', component: FormMenusComponent},
      {path: 'menus/nuevo', component: FormMenusComponent},
      
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
