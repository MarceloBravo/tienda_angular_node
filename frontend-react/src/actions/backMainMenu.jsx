import axios from 'axios';
import { setbackendMenu } from '../redux/slices/backendMenuSlices';
import { setError } from '../redux/slices/errorSlices';
import { endPoint } from '../shared/constants';
import { getHeaders } from '../shared/functions';
//const localhost = '192.168.1.1:3000';
 
export const getBackendMenu = (menuPadreId, isRememberMe) => async (dispatch) => {
    const headers = getHeaders(isRememberMe);
    axios
    .get(endPoint + '/menus/parent/' + menuPadreId, { headers })
    .then(resp => {
        dispatch(setbackendMenu(resp.data));
    }).catch(error => {
        dispatch(setError(error.response.data));
    })
}