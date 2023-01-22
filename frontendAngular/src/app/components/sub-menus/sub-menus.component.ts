import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { config } from '../../../environments/environment'

@Component({
  selector: 'app-sub-menus',
  templateUrl: './sub-menus.component.html',
  styleUrls: ['./sub-menus.component.css'],
  encapsulation: ViewEncapsulation.None //Permite que la etiqueta del componente de angular no sea considerada en el dom
})
export class SubMenusComponent implements OnInit {
  @Input() subMenu: any = []
  protected srcImages: string = config.imagesStorage + '/menus/';

  constructor() { }

  ngOnInit(): void {
  }

  openMenu(mnuId: number){
    alert('id menu = '+mnuId);
  }

  expandMenu(id: any){
    let ul = <HTMLUListElement> document.getElementById(id);
    (<HTMLLinkElement>ul.children[1]).style.height = (<HTMLLinkElement>ul.children[1]).style.height === '0px' ? '' : '0px';
    for(let i = 0;i < ul.children[1].children.length; i++ ){
      let isExpanded = (<HTMLLinkElement> ul.children[1].children[i].children[0]).style.display !== 'none';
      (<HTMLLinkElement> ul.children[1].children[i].children[0]).style.display = isExpanded ? 'none' : 'block';
    }
  }
}
