import axios from 'axios';
import { endPoint, config } from '../shared/global.js';
import { saveToken, getRememberToken } from '../shared/functions.js';

export const login = (store, email, password, remember = false) => {
    axios
    .post(endPoint + '/login', {email, password, host: config.localhost})
    .then(resp => {
        saveToken(remember, resp.data);
        store.dispatch('login', JSON.parse(atob(resp.data.access_token.split('.')[1])));
        store.dispatch('remember', remember);
    })
    .catch(error => {
        if(error.response?.data !== undefined){
            store.dispatch('error', error.response.data);
        }else{
            store.dispatch('error', error.message);
        }
        
    });
}


export const extendSession = (store, rememberMe) => {
    axios
    .post(endPoint + '/refreshtoken', {refreshToken: getRememberToken(rememberMe), host: config.localhost})
    .then(resp =>{
        saveToken(rememberMe, resp.data);
        store.dispatch('login', JSON.parse(atob(resp.data.access_token.split('.')[1])));
        store.dispatch('remember', rememberMe);
    })
}

