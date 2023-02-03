import axios from 'axios';
import { setLogin } from '../redux/slices/loginSlices';
import { endPoint, config } from '../shared/constants';
const localhost = '192.168.1.1:3000';


export const login = (email, password, remember = false) => async (dispatch) => {
    axios
    .post(endPoint + '/login', {email, password, host: localhost})
    .then(resp => {
        saveToken(resp.data, remember);
        dispatch(setLogin(JSON.parse(atob(resp.data.access_token.split('.')[1]))));
    })
    .catch(error => {
        console.log('Error login', error);
    })   
}

const saveToken = (data, remember) => {
    if(remember === true){
        localStorage.setItem(config.appName + '-token', data.access_token);
        localStorage.setItem(config.appName + '-refresh_token', data.refresh_token);
        sessionStorage.removeItem(config.appName + '-token');
        sessionStorage.removeItem(config.appName + '-refresh_token');
    }else{
        sessionStorage.setItem(config.appName + '-token', data.access_token);
        sessionStorage.setItem(config.appName + '-refresh_token', data.refresh_token);
        localStorage.removeItem(config.appName + '-token');
        localStorage.removeItem(config.appName + '-refresh_token');
    }
}