import { config } from './constants.jsx';

export const getHeaders = (isRememberMe) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (isRememberMe === true ? localStorage.getItem(config.appName + '-token') : sessionStorage.getItem(config.appName + '-token'))
    }
}

export const getTokenFromStorage = () => {
    if (localStorage.getItem(config.appName + '-token')) {
        return localStorage.getItem(config.appName + '-token')
    } else if (sessionStorage.getItem(config.appName + '-token')) {
        return sessionStorage.getItem(config.appName + '-token')
    } else {
        return null
    }
}

export const saveToken = (accessToken, refreshToken, remember) => {
    if(remember === true){
        localStorage.setItem(config.appName + '-token', accessToken);
        localStorage.setItem(config.appName + '-refresh_token', refreshToken);
        sessionStorage.removeItem(config.appName + '-token');
        sessionStorage.removeItem(config.appName + '-refresh_token');
    }else{
        sessionStorage.setItem(config.appName + '-token', accessToken);
        //sessionStorage.setItem(config.appName + '-refresh_token', refreshToken);
        localStorage.removeItem(config.appName + '-token');
        localStorage.removeItem(config.appName + '-refresh_token');
    }
}

export const clearTokens = () => {
    sessionStorage.removeItem(config.appName + '-token');
    sessionStorage.removeItem(config.appName + '-refresh_token');
    localStorage.removeItem(config.appName + '-token');
    localStorage.removeItem(config.appName + '-refresh_token');
}