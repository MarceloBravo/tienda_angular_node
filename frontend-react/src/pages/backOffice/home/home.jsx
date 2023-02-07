import React from 'react';
import { BackendLeftMenu } from '../../../components/backLeftMenu/backenLeftMenu';
import './style.scss';

export const HomePage = () => {

    return (
        <div className='content-app'>
            <BackendLeftMenu/>
            <div className='main-content'>
                Esta es la página principal de administración
            </div>
        </div>
    );
}