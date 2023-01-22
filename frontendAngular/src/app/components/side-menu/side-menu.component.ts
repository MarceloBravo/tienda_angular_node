import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MenusService } from '../../services/menus/menus.service';
import { config } from '../../../environments/environment'

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: [
    './side-menu.component.css',
    '../../../assets/css/app.css'],
    encapsulation: ViewEncapsulation.None //Permite que la etiqueta del componente de angular no sea considerada en el dom
})
export class SideMenuComponent implements OnInit {
  @Input() isMenuVisible: Boolean = true;
  protected menus: any = [];
  protected srcImages: string = config.imagesStorage + '/menus/';

  constructor(
    private _menusService: MenusService
  ) { }

  ngOnInit(): void {
    this._menusService.getChildrenMenus().subscribe({
      complete: () => {},
      error: (e) => { console.log('Error = ',e)},
      next: (res: any) => {
        this.menus = res.rows;
      },
    });

    

  }

  openMenu(mnuId: number){
    alert('click = ' + mnuId)
  }

  expandMenu(id: any){
    let ul = <HTMLUListElement> document.getElementById(id);
    //debugger
    (<HTMLLinkElement>ul.children[1]).style.height = (<HTMLLinkElement>ul.children[1]).style.height === '0px' ? '' : '0px';
    for(let i = 0;i < ul.children[1].children.length; i++ ){
      let isExpanded = (<HTMLLinkElement> ul.children[1].children[i].children[0]).style.display !== 'none';
      (<HTMLLinkElement> ul.children[1].children[i].children[0]).style.display = isExpanded ? 'none' : 'block';
    }
  }

}
