import { config } from './constants.jsx';

export const getHeaders = (isRememberMe) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (isRememberMe === true ? localStorage.getItem(config.appName + '-token') : sessionStorage.getItem(config.appName + '-token'))
    }
}