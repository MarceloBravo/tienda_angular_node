import React from "react";
import { AlertComponent } from "../alerta/alert";
import './style.scss'

export const  GrupoAlertasComponent = (props) => {
    const { alertas } = props;

    return (
        <div className="grupoAlertasContainer">
            { alertas && alertas.map( a => {
                return <AlertComponent titulo={a.titulo} mensaje={a.mensaje} tipo={a.tipo} mostrar={true}/>
            })} 
        </div>
    );
}