import React from 'react';
import { useSelector } from 'react-redux';
import { LeftMenuBackend } from '../../../components/leftMenuBackend/leftMenuBackend';
import { TopMenuBackend } from '../../../components/topMenuBackend/topMenuBackend';
import './style.scss';

export const MainPage = () => {
    const isMenuVisible = useSelector(state => state.backendMenu.togle);

    return (
        <div className='content-app'>
            <LeftMenuBackend/>
            <div className={isMenuVisible ? 'mnu-is-open' : 'mnu-is-closed'}>
                <TopMenuBackend />
                <div>
                    Esta es la página principal de administración
                </div>
            </div>
        </div>
    );
}