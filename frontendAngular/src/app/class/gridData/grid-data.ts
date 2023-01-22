export class GridData {
    headers: string[] = []; //Opcional
    rows: any[] = [];   //Obligatorio
    showColumnsName: string[] = [];  //Opcional array con el nombre de las COLUMNAS que se mostrarán
    colWidth: (string | null)[] = [];
    //Las siguientes propiedades son OPCIONALES aceptan un array con los NOMBRES DE LAS COLUMNAS para ser formateadas 
    //de acuerdo con su respectivo tipo de datos
    numberCols: string[] = [];
    moneyCols: string[] = [];
    imageCols: string[] = [];
    dateCols: string[] = [];
    stringDateCols: string[] = [];
    boolCheckCols: string[] = [];
    boolStringCols: string[] = [];
}
