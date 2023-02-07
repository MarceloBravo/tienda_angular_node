import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBackendMenu } from '../../actions/backMainMenu';
import { config } from '../../shared/constants';
import { BackendLeftMenuContent } from './content.jsx';
import './style.scss';

export const BackendLeftMenu = (props) => {
    const backendMenu = useSelector(state => state.backendMenu.data.rows );
    const srcImages = config.imagesStorage + '/menus/';
    const [ isMenuVisible, setIsMenuVisible ] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBackendMenu(null, false));
    },[dispatch])

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
        <BackendLeftMenuContent 
            isMenuVisible={isMenuVisible} 
            backendMenu={backendMenu}
            srcImages={srcImages}
            expandMenu={expandMenu}
        />
    )
}