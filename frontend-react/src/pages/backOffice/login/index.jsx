import React, { useState, useEffect } from 'react';
import { LoginContent } from './content';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { login } from '../../../actions/login';

export const LoginPage = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ remember, setRemember ] = useState(false);
    const loginState = useSelector( state => state.login.data);
    const [ alertas, setAlertas ] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect (() => {
        if(loginState !== undefined && loginState.user !== null){
            //Usuario logueado, redireccionar a home
            navigate('/admin/home');
        }
    // eslint-disable-next-line
    },[loginState]);

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const remenberChange = (e) => {
        setRemember(e.target.checked);
    }

    const loginClick = () => {
        if(email.length > 0 && password.length > 0){
            dispatch(login(email, password, remember));
        }else{
            setAlertas([...alertas, {titulo: 'Error', mensaje: 'Datos incompletos.', tipo: 'danger', mostrar: true}]);
            //console.log('Datos incompletos', email, password);
        }
    }

    return (
        <LoginContent 
            emailHandler={emailHandler} 
            passwordHandler={passwordHandler} 
            remenberChange={remenberChange} 
            isRemember={remember}
            loginClick={loginClick}
            alertas={alertas}
        />
    )
}