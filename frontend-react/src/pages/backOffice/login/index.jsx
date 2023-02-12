import React, { useState, useEffect } from 'react';
import { LoginContent } from './content';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { login } from '../../../actions/login';

export const LoginPage = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ rememberMe, setRememberMe ] = useState(false);
    const loginState = useSelector( state => state.login.data);
    const errorState = useSelector( state => state.error.data);
    const [ alertas, setAlertas ] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect (() => {
        console.log('loginState',loginState)
        if(loginState !== undefined && loginState.user !== null){
            //Usuario logueado, redireccionar a home
            navigate('/admin/home');
        }
    // eslint-disable-next-line
    },[loginState]);

    useEffect(()=>{
        console.log('errorState',errorState)
        if(errorState.error !== undefined && errorState.error !== null){
            setAlertas([...alertas, {tipo:'danger', mensaje: errorState.mensaje, titulo: 'Error', display: true}])
        }
    // eslint-disable-next-line
    },[errorState])

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const remenberChange = (e) => {
        setRememberMe(e.target.checked);
    }

    const loginClick = () => {
        if(email.length > 0 && password.length > 0){
            dispatch(login(email, password, rememberMe));
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
            isRemember={rememberMe}
            loginClick={loginClick}
            alertas={alertas}
        />
    )
}