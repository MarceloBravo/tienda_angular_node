import axios from "axios";
import { endPoint } from '../shared/global.js';
import { headers } from "@/shared/functions.js";

export const loadMenu = (store, mnuId, isRememberMe) => {
    axios
    .get(endPoint+ '/menus/parent/' + mnuId, {headers: headers(isRememberMe)})
    .then(resp => {
        //console.log('GET MENU RESPONSE:', resp.data);
        store.dispatch('menu', resp.data);
    }).catch(error => {
        console.log('GET MENU ERROR: ',error);
    })
}