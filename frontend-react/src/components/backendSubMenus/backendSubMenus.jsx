import React from 'react';
import { config } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export const BackSubMenu = (props) => {
    const { subMenu } = props;
    const navigate = useNavigate();
    const srcImages = config.imagesStorage + '/menus/';

    const expandMenu = (idMenu) => {

    }

    const redirectTo = (url) => {
        if(url !== null){
            navigate(url);
        }
    }

    return (
        <>
        {subMenu && subMenu.map((mnu, key) => {
          return  <li key={key} id={'mnu'+mnu.id} className="sidebar-item">
                    {mnu.submenus && mnu.submenus.length > 0 && 
                    <ul>
                        <label onClick={expandMenu(mnu.id)}>
                            {mnu.icono && <img src={srcImages + mnu.icono} alt={mnu.icono}/>} 
                            { mnu.nombre }
                        </label>
                        <BackSubMenu subMenu={mnu.submenus}></BackSubMenu>
                    </ul>}

                    {(!mnu.submenus || mnu.submenus.length === 0) && 
                        <label className="sidebar-link" onClick={e => redirectTo(mnu.link)}>
                            {mnu.icono && <img src={srcImages + mnu.icono} alt={mnu.icono}/>}
                            { mnu.nombre }
                        </label>
                    }
                </li>
            })
        }
        </>
    )
}