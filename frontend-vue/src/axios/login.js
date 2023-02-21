import axios from 'axios';
import { endPoint, config } from '../shared/global.js';
import { saveToken } from '../shared/functions.js';

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

