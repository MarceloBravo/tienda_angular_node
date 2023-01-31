import React, { useState, useEffect } from 'react';
import { AlertaContent } from './content';

export const AlertComponent = (props) => {
    const { titulo, mensaje, tipo, mostrar } = props;
    const [ display, setDisplay ] = useState(mostrar);
    const [ count, setCount ] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        if(count <= 0){
            cerrar();
        }
        
        return () => clearInterval(interval);
    }, [count]);

    useEffect(()=> {
        setDisplay(mostrar);
    }, [mostrar]);

    const cerrar = () => {
        setCount(0);
        setDisplay(false);
    }
    
    return (
        <AlertaContent 
            tipo={tipo} 
            mensaje={mensaje}
            titulo={titulo}
            display={display}
            cerrar={cerrar}
        />
    );
}