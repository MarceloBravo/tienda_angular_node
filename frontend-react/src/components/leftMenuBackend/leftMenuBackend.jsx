import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBackendMenu } from '../../actions/backMainMenu';
import { config } from '../../shared/constants';
import { LeftMenuBackendContent } from './content.jsx';

export const LeftMenuBackend = (props) => {
    const backendMenu = useSelector(state => state.backendMenu.data.rows );
    const srcImages = config.imagesStorage + '/menus/';
    const isMenuVisible = useSelector(state => state.backendMenu.togle);
    const isRememberMe = useSelector(state => state.login.rememberMe);
    const isLogout = useSelector(state => state.login.isLogout);
    const dispatch = useDispatch();

    useEffect(()=> {
        if(isMenuVisible !== undefined){
            console.log(isMenuVisible ? 'visible' : 'oculto')
        }else{
            console.log('NO DETECTADO')
        }
    },[isMenuVisible])

    useEffect(()=>{
        if(!isLogout){
            dispatch(getBackendMenu(null, isRememberMe));
        }
    },[dispatch, isRememberMe, isLogout])

    const expandMenu = (e) => {     
        //setClassname(classname === 'open' ? 'closed' : 'open');
        const className = e.target.className;
        if(className.includes('open')){
            e.target.className = e.target.className.replace('open','closed');
        }else{
            e.target.className = e.target.className.replace('closed','open');
        }
    }


    return (
        <LeftMenuBackendContent 
            isMenuVisible={isMenuVisible} 
            backendMenu={backendMenu}
            srcImages={srcImages}
            expandMenu={expandMenu}
        />
    )
}