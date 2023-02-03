import axios from 'axios';
import { endPoint, config } from '../constants/global.js';

export const login = (store, email, password, remember = false) => {
    axios
    .post(endPoint + '/login', {email, password, host: config.localhost})
    .then(resp => {
        saveToken(remember, resp.data);
        store.dispatch('login', JSON.parse(atob(resp.data.access_token.split('.')[1])))
    })
    .catch(error => {
        if(error.response?.data !== undefined){
            store.dispatch('error', error.response.data);
        }else{
            store.dispatch('error', error.message);
        }
        
    });
}

const saveToken = (remember, data) => {
    if(remember === true){
        localStorage.setItem(config.appName, data.access_token);
        localStorage.setItem(config.appName+'refresh_token', data.refresh_token);
        sessionStorage.removeItem(config.appName);
        sessionStorage.removeItem(config.appName + 'refresh_token');
    }else{
        sessionStorage.setItem(config.appName, data.access_token);
        sessionStorage.setItem(config.appName + 'refresh_token', data.refresh_token);
        localStorage.removeItem(config.appName);
        localStorage.removeItem(config.appName + 'refresh_token');
    }
}