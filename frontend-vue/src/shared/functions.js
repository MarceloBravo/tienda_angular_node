import { config } from "./global";

export const headers = (isRememberMe) => {
    const token = (isRememberMe === true ? localStorage.getItem(config.appName + '-token') : sessionStorage.getItem(config.appName + '-token'));
    console.log(token);
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
}

export const saveToken = (remember, data) => {
    if(remember === true){
        localStorage.setItem(config.appName + '-token', data.access_token);
        localStorage.setItem(config.appName+'refresh_token', data.refresh_token);
        sessionStorage.removeItem(config.appName + '-token');
        sessionStorage.removeItem(config.appName + 'refresh_token');
    }else{
        sessionStorage.setItem(config.appName + '-token', data.access_token);
        sessionStorage.setItem(config.appName + 'refresh_token', data.refresh_token);
        localStorage.removeItem(config.appName + '-token');
        localStorage.removeItem(config.appName + 'refresh_token');
    }
}

export const getRememberToken = (remember) => {
    if(remember === true){
        return localStorage.getItem(config.appName+'refresh_token');
    }else{
        return sessionStorage.getItem(config.appName+'refresh_token');
    }
}

export const clearTokens = () => {
    sessionStorage.removeItem(config.appName + '-token');
    sessionStorage.removeItem(config.appName + 'refresh_token');
    localStorage.removeItem(config.appName + '-token');
    localStorage.removeItem(config.appName + 'refresh_token');   
}