import React from 'react';
import { BackSubMenu } from '../backendSubMenus/backendSubMenus';
import './style.scss';

export const LeftMenuBackendContent = (props) => {
    const { isMenuVisible, backendMenu, srcImages, expandMenu } = props;

    return (
        <nav id="sidebar" className={'sidebar js-sidebar ' + (isMenuVisible === false ? 'hide-sidebar' : 'show-sidebar')}>
            <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand" href="index.html">
                    <span className="align-middle">AdminKit</span>
                </a>
                <ul className="sidebar-nav">
                    {backendMenu && backendMenu.map((mnu, key) => {
                        
                        return  <ul key={key} id={'mnu'+mnu.id} className={mnu.submenu.length === 0 ? 'sidebar-item' : 'sidebar-header'}>
                                    <label onClick={e => expandMenu(e)} className={'mnu-clickeable open'}>
                                        {mnu.icono && <img src={srcImages + mnu.icono} alt={mnu.icono}/>}{ mnu.nombre }
                                    </label>
                                    <BackSubMenu subMenu={mnu.submenu}></BackSubMenu>
                                </ul>
                        }

                    )}
                </ul>
            </div>
        </nav>
    )
}