import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTogleMenu } from '../../redux/slices/backendMenuSlices';
import { TimerSession } from '../timerSession/timerSession';
import { logout as cerrarSession} from '../../actions/login';
import { config } from '../../shared/constants';
import { getTokenFromStorage } from '../../shared/functions';
import './style.scss';

export const TopMenuBackend = (props) => {
    // eslint-disable-next-line
    const [ tiempoRestante, setTiempoRestante ] = useState(100);
    // eslint-disable-next-line
    const [ togleMenuNotificaciones, setTogleMenuNotificaciones ] = useState(false);
    // eslint-disable-next-line
    const [ togleMenuMensajes, setTogleMenuMensajes ] = useState(false);
    // eslint-disable-next-line
    const [ togleMenuPerfil, setTogleMenuPerfil ] = useState(false);
    // eslint-disable-next-line
    const usuario = useSelector(state => state.login.data.user);
    const isRememberMe = useSelector(state => state.login.rememberMe);
    const imagesPath = config.localImagesPath;
    const dispatch = useDispatch();

    useEffect(()=> {
        console.log(isRememberMe ? 'RECORDANDO USUARIO' : 'OLVIDANDO USUARIO');
    },[isRememberMe]);


    useEffect(()=>{
        console.log('',usuario);
    },[usuario])


    
    const togleMenu = (e) => {
        if(e.currentTarget.className.includes('change')){
            e.currentTarget.className = e.currentTarget.className.replace(' change', '');
            dispatch(setTogleMenu(false));
        }else{
            e.currentTarget.className = e.currentTarget.className + ' change';
            dispatch(setTogleMenu(true));
        }
    }
    
    /*
    const notificacionesMenuToggle = () => {

    }

    const mensajeMenuToggle = () => {

    }
    */
    const perfilMenuToggle = () => {
        setTogleMenuPerfil(togleMenuPerfil ? false : true);
    }

    const logout = () => {
        dispatch(cerrarSession(getTokenFromStorage()));
    }

    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            
            <div className="menu change" onClick={e => togleMenu(e)}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>

            <div className="navbar-info">      
                <ul className="navbar-nav navbar-align">
                    <TimerSession />
                    
                    {/*
                    <li className="nav-item dropdown">
                
                        <label className="nav-icon dropdown-toggle" id="alertsDropdown" data-bs-toggle="dropdown" onClick={e => notificacionesMenuToggle()}>
                            <div className="position-relative">
                                <i className="align-middle" data-feather="bell"></i>
                                <span className="indicator">4</span>
                            </div>
                        </label>

                        {togleMenuNotificaciones &&  
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
                                <div className="dropdown-menu-header">
                                    4 New Notifications
                                </div>
                                <div className="list-group">
                                    <label href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <i className="text-danger" data-feather="alert-circle"></i>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">Update completed</div>
                                                <div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
                                                <div className="text-muted small mt-1">30m ago</div>
                                            </div>
                                        </div>
                                    </label>

                                    <label href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <i className="text-warning" data-feather="bell"></i>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">Lorem ipsum</div>
                                                <div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
                                                <div className="text-muted small mt-1">2h ago</div>
                                            </div>
                                        </div>
                                    </label>
                                    <label href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <i className="text-primary" data-feather="home"></i>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">Login from 192.186.1.8</div>
                                                <div className="text-muted small mt-1">5h ago</div>
                                            </div>
                                        </div>
                                    </label>
                                    <label href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <i className="text-success" data-feather="user-plus"></i>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">New connection</div>
                                                <div className="text-muted small mt-1">Christina accepted your request.</div>
                                                <div className="text-muted small mt-1">14h ago</div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                        

                                <div className="dropdown-menu-footer">
                                    <label href="#" className="text-muted">Show all notifications</label>
                                </div>
                            </div>
                        }
                    </li>

                    <li className="nav-item dropdown">
                        <label className="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-bs-toggle="dropdown" onClick={e => mensajeMenuToggle()}>
                            <div className="position-relative">
                                <i className="align-middle" data-feather="message-square"></i>
                            </div>
                        </label>

                        {togleMenuMensajes && 
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="messagesDropdown">
                                <div className="dropdown-menu-header">
                                    <div className="position-relative">
                                        4 New Messages
                                    </div>
                                </div>
                                <div className="list-group">
                                    <label href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <img src={imagesPath+'/avatars/avatar-5.jpg'} className="avatar img-fluid rounded-circle" alt="Vanessa Tucker"/>
                                            </div>
                                            <div className="col-10 ps-2">
                                                <div className="text-dark">Vanessa Tucker</div>
                                                <div className="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu tortor.</div>
                                                <div className="text-muted small mt-1">15m ago</div>
                                            </div>
                                        </div>
                                    </label>
                                    <label href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <img src={imagesPath+'/avatars/avatar-2.jpg'} className="avatar img-fluid rounded-circle" alt="William Harris"/>
                                            </div>
                                            <div className="col-10 ps-2">
                                                <div className="text-dark">William Harris</div>
                                                <div className="text-muted small mt-1">Curabitur ligula sapien euismod vitae.</div>
                                                <div className="text-muted small mt-1">2h ago</div>
                                            </div>
                                        </div>
                                    </label>
                                    <label href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <img src={imagesPath+'/avatars/avatar-4.jpg'} className="avatar img-fluid rounded-circle" alt="Christina Mason"/>
                                            </div>
                                            <div className="col-10 ps-2">
                                                <div className="text-dark">Christina Mason</div>
                                                <div className="text-muted small mt-1">Pellentesque auctor neque nec urna.</div>
                                                <div className="text-muted small mt-1">4h ago</div>
                                            </div>
                                        </div>
                                    </label>
                                    <label href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <img src={imagesPath+'/avatars/avatar-3.jpg'} className="avatar img-fluid rounded-circle" alt="Sharon Lessman"/>
                                            </div>
                                            <div className="col-10 ps-2">
                                                <div className="text-dark">Sharon Lessman</div>
                                                <div className="text-muted small mt-1">Aenean tellus metus, bibendum sed, posuere ac, mattis non.</div>
                                                <div className="text-muted small mt-1">5h ago</div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="dropdown-menu-footer">
                                    <label href="#" className="text-muted">Show all messages</label>
                                </div>
                            </div>
                        }
                    </li>
                    */}
                
                    <li className="nav-item dropdown">
                        <label className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                            <i className="align-middle" data-feather="settings"></i>
                        </label>

                        <label className="nav-link dropdown-toggle d-none d-sm-inline-block" data-bs-toggle="dropdown" onClick={e => perfilMenuToggle()}>
                            <img src={imagesPath+'/avatars/avatar.jpg'} className="avatar img-fluid rounded me-1" alt="" /> {usuario && <span className="text-dark">{ usuario.nombres } { usuario.apellido1 }</span>}
                        </label>
                        {togleMenuPerfil && 
                            <div className="dropdown-menu dropdown-menu-end">
                                <label className="dropdown-item" ><i className="align-middle me-1" data-feather="user"></i> Perfil</label>
                                <div className="dropdown-divider"></div>
                                <label className="dropdown-item" ><i className="align-middle me-1" data-feather="settings"></i> Ir a la tienda</label>
                                <label className="dropdown-item" onClick={e => logout()}>Cerrar sessión</label>
                            </div>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}