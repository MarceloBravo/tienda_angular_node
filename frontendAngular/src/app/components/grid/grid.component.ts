import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridData } from 'src/app/class/gridData/grid-data';
import { config } from 'src/environments/environment';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() data: GridData = new GridData();
  @Input() filasPorPaginaOptions: number[] = [5, 10, 15, 20, 25, 30, 35, 40];
  @Input() filasPorPagina: number = 5;
  @Output() nuevoClick: EventEmitter<boolean> = new EventEmitter();
  @Output() buscarChange: EventEmitter<String> = new EventEmitter();
  @Output() filasPorPaginaChange: EventEmitter<number> = new EventEmitter();
  @Output() editarClick: EventEmitter<number> = new EventEmitter();
  @Output() eliminarClick: EventEmitter<number> = new EventEmitter();
  protected textoFiltro: String = '';
  protected srcImages: String =  config.imagesStorage + '/menus/';

  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }

  protected nuevoClickHandler(){
    return this.nuevoClick.emit(true);
  }

  protected buscarChangeHandler(texto: String){
    return this.buscarChange.emit(texto);
  }

  protected changeRowsVisibles(selectCtrl: any){
    return this.filasPorPaginaChange.emit(parseInt(selectCtrl.value));
  }

  protected editarClickHandler(id: number){
    return this.editarClick.emit(id);
  }

  protected eliminarClickHandler(id: number){
    return this.eliminarClick.emit(id);
  }
  
  protected isShowColumn(showColumnsName: String[], column: String, typeColumn: String){
    return (showColumnsName.length === 0 || showColumnsName.find(colName => colName === column)) && this.typeColumn(column) === typeColumn;
  }

  private typeColumn(colName: String){
    switch(true){
      case this.data.imageCols.find(e => e === colName) !== undefined:
        return 'image';
      case this.data.boolCheckCols.find(e => e === colName) !== undefined:
        return 'boolean';
      case this.data.dateCols.find(e => e === colName) !== undefined:
        return 'date';
      default:
        return 'text';
    }
  }

  protected getHeaders(headers: String[], columNames: String[], rows: any[]): String[]{
    const headersArray: any[] = columNames.length > 0 ? columNames : rows;
    if(headers.length > 0){
      return this.getArrayHeaders(headers, Object.keys(headersArray));      
    }else{
      return headersArray; //Object.keys(headersArray.length > 0 ? headersArray : {}).map(colName => colName);
    }
  }

  private getArrayHeaders(headers: String[], colNames: String[]): String[]{
    if(headers.length < colNames.length){
      return headers.concat(colNames.slice(headers.length + 1));
    }else if(headers.length > colNames.length){
      return headers.slice(0, colNames.length);
    }
    return headers;
  }

  protected getColNameFromRowData(row: any){
    return Object.keys(row);
  }

  

  protected valueToText(colName: string, value: any, ){
    const arrColName: string[] = colName.split('.');
    if((typeof value) === 'object' && arrColName.length > 1 && value[arrColName[0]] !== null ){
      const newObject: any = value[arrColName[0]];
        if(Object.keys(newObject).find(key => arrColName[1] === key)){
          const newColName: string = colName.substring(colName.indexOf('.') + 1)
          value = this.valueToText(newColName, newObject);  
        }
    }else{
      value = value[colName];  
    }
    
    switch(true){
      case this.data.numberCols.find(e => e === colName) !== undefined:        
        return this.formatearNumero(value);
      case this.data.moneyCols.find(e => e === colName) !== undefined:
        return this.formatearMoneda(value);
      case this.data.stringDateCols.find(e => e === colName) !== undefined:
        return this.formatearFecha(value);
      case this.data.boolStringCols.find(e => e === colName) !== undefined:
        return this.formatearBoolTexto(value);
      default:
        return value;
    }
  }

  private formatearNumero(numero: any, decimales: number = 0){
    if((typeof numero).toLowerCase() === 'number'){
      return numero.toLocaleString('es-CL',{minimumFractionDigits: decimales}); //https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
    }
    return '0';
  }

  private formatearMoneda(numero: any, decimales: number = 0){
    return '$ ' + this.formatearNumero(numero, decimales);
  }

  private formatearBoolTexto(value: any){
    if((typeof value).toLowerCase() === 'boolean'){
      return value ? 'Si' : 'No';
    }
    return '';
  }

  protected formatearFecha(value: any){
    if((typeof value).toLowerCase() === 'string'){
      const fecha: string[] = value.split('T');
      return fecha.length > 1 ? fecha[0].split('-').reverse().join('-') : value;
    }
    return '';    
  }

  protected fechaInputDate(value: string){
    if(value === null)return '';
    const fecha: string[] = value.split('T');
    return fecha.length > 1 ? fecha[0] : value;
  }
}
