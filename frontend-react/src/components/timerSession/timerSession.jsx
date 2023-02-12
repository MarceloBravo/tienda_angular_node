/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { refreshToken, logout } from '../../actions/login';
import { getTokenFromStorage } from '../../shared/functions';
import { config } from '../../shared/constants';
import { clearTokens } from '../../shared/functions';
import './style.scss';

export const TimerSession = (props) => {
    const exp = useSelector(state => state.login.data.exp)
    
    const [ seconds, setSeconds ] = useState(()=>{
        if(exp){
            if(exp.toString().length < (new Date()).getTime()?.toString().length){
                return (exp - parseInt((new Date()).getTime().toString().substr(0,exp.toString().length)))+1;
            }
            if(exp.toString().length > (new Date()).getTime()?.toString().length){
                return (parseInt(exp.toString().substr(0, (new Date()).getTime().toString().length)) - (new Date().getTime()))+1;
            }
        
            return exp-(new Date()).getTime()+1;
        }else{
            return (new Date()).getTime();
        }
    })
    
    const isLogout = useSelector(state => state.login.isLogout);
    const isRememberMe = useSelector(state => state.login.rememberMe);
    const [ showTimer, setShowTimer ] = useState(false);
    const [ tryRestartSession, setTryRestartSession ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(()=>{
        setShowTimer(localStorage.getItem(config.appName +  '-token') === null);
    },[showTimer])

    
    useEffect(()=>{
        if(seconds !== null && seconds > 0 && exp){
            let restaSeg = restaSegundos((new Date()).getTime());
            const interval = setInterval(()=> setSeconds(restaSeg), 1000);
            return ()=>clearInterval(interval);
        }
        // eslint-disable-next-line
    },[exp, seconds])
    


    useEffect(()=>{
        if(seconds !== null && seconds <= 0){
            if(localStorage.getItem(config.appName +  '-refresh_token')){
                //extender sesssion
                dispatch(refreshToken(localStorage.getItem(config.appName +  '-refresh_token'), isRememberMe));
            }else{
                //Finalizar session
                dispatch(logout(getTokenFromStorage()));
            }
        }
        // eslint-disable-next-line
    },[seconds, navigate,dispatch])

    

    useEffect(()=>{
        console.log(tryRestartSession ? 'Intentar actualizar sessión' : 'No intentar');
        if(tryRestartSession && localStorage.getItem(config.appName+'-token')){
            console.log('reiniciando session');
            dispatch(refreshToken(localStorage.getItem(config.appName+'-token')));
            //localStorage.removeItem(config.appName+'-token');
        }
    },[tryRestartSession, dispatch])


    
    useEffect(()=>{
        //Evalua si el usuario finalizó la sesión para redirigirlo a la pantalla de login
        console.log(isLogout ? 'Session finalizada':'session activa');
        if(isLogout){
            console.log('LOGOUT');
            clearTokens();
            navigate('/');
        }
    // eslint-disable-next-line
    },[isLogout])

    /*
    useEffect(()=>{
        //Actualizando los tokens en el almacenamiento local luego de recibir los nuevos token 
        //para extender el tiempo de la sesión
        if(accessTokenState && refreshTokenState){
            localStorage.setItem(config.appName +  '-refresh_token',refreshTokenState)
            localStorage.setItem('backTkn',accessTokenState)
            let obj = JSON.parse(atob(accessTokenState.split('.')[1]))
            dispatch(setLogin( 
            {
                user: obj.user,                
                expires_in: obj.exp,
                roles: obj.roles,
            }))
        }
    },[accessTokenState, dispatch, refreshTokenState])
    */

    useEffect(()=>{
        if(exp){
            if(exp.toString().length < (new Date()).getTime()?.toString().length){
                setSeconds((exp - parseInt((new Date()).getTime().toString().substr(0,exp.toString().length)))+1)
            }else if(exp.toString().length > (new Date()).getTime()?.toString().length){
                setSeconds((parseInt(exp.toString().substr(0, (new Date()).getTime().toString().length)) - (new Date().getTime()))+1)
            }else{        
                setSeconds( exp-(new Date()).getTime()+1)
            }
        }
        
    },[exp])


    const restaSegundos = (now) => {
        const sec1 = exp.toString().length
        const sec2 = now.toString().length
        if(sec1 < sec2){
            return (exp - parseInt(now.toString().substr(0,sec1)))
        }
        if(sec1 > sec2){
            return (parseInt(exp.toString().substr(0, sec2)) - now)
        }
        if(exp-now <= 0){
            setTryRestartSession(true);
        }
        return exp-now
    }

    
   
    return (
        <>
        {showTimer && 
            <div className="session-info">
                <label className="session-info-label">La sessión expira en {(new Date(seconds * 1000)).toISOString().substr(11, 8)} segs.</label>
            </div>        
        }
        </>
    )
}
