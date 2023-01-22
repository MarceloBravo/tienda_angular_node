import { Component, OnInit } from '@angular/core';
import { GlobalEnums } from 'src/app/enums/global-enums';
import { ScriptService } from '../../../services/script/script.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [
    './main.component.css',
    '../../../../assets/css/app.css'
  ]
})
export class MainComponent implements OnInit {
  isSideMenuVisible: Boolean = true;
  

  constructor(
    private _scriptService: ScriptService
  ) { }

  ngOnInit(): void {
    this._scriptService.load(['../../../../assets/js/app.js'], 'body')
  }

  togleMenuState($e: Boolean){
     this.isSideMenuVisible = $e;
  }

}
