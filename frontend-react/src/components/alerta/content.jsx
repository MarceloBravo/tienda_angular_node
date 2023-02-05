import React from 'react';
import './style.scss';

export const AlertaContent = (props) => {
    const { tipo, mensaje, titulo, display, cerrar } = props;

    return (
        <>
            {display && 
                <div className={"alert alert-" + (tipo ? tipo : 'primary') + " alert-dismissible fade show"} role="alert">
                    <label><strong>{ titulo }</strong> { mensaje }</label>
                    <button type="button" className="close" data-dismiss="alert" onClick={() => cerrar()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }
        </>
    );
}