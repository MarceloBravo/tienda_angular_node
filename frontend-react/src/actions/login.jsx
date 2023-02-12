import axios from 'axios';
import { setLogin, setRemember, setLogout } from '../redux/slices/loginSlices';
import { setError } from '../redux/slices/errorSlices';
import { endPoint } from '../shared/constants';
import { saveToken } from '../shared/functions';
const localhost = '192.168.1.1:3000';
const header = { 'Content-Type': 'application/json' }


export const login = (email, password, remember = false) => async (dispatch) => {
    axios
    .post(endPoint + '/login', {email, password, host: localhost})
    .then(resp => {
        saveToken(resp.data.access_token, resp.data.refresh_token, remember);
        dispatch(setLogin(JSON.parse(atob(resp.data.access_token.split('.')[1]))));
        dispatch(setRemember(remember));
        dispatch(setLogout(false));
    })
    .catch(error => {
        dispatch(setError(error.response.data));
        console.log('Error login', error);        
    })   
}

export const logout = (token) => async (dispatch) => {
    axios
    .post(endPoint + '/logout', {token}, {headers: header})
    .then(resp => {
        dispatch(setLogout(true))
    })
    .catch(error => {
        dispatch(setError(error.response.data));
        console.log('Error logout', error);
    })
}

export const refreshToken = (token, remember) => async (dispatch) => {
    axios
    .post(`${endPoint}/refreshtoken`,{refreshToken:token, host: localhost},{headers: header})
    .then(resp => {
        console.log('refreshToken', JSON.parse(atob(resp.data.access_token.split('.')[1])));
        saveToken(resp.data.access_token, resp.data.refresh_token, remember);
        dispatch(setLogin(JSON.parse(atob(resp.data.access_token.split('.')[1]))));
        dispatch(setLogout(false));
    })
    .catch(error => {
        dispatch(setError(error.response.data));
        dispatch(setLogout(true));
        console.log('Error refresh token', error);
    })
}