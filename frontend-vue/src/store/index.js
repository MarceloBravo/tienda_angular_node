import { createStore } from 'vuex';
import loginStore from './loginStore.js';
import errorStore from './errorStore.js';
import menuStore from './menuStore.js';

const store = createStore({
    modules:{
        loginStore,
        errorStore,
        menuStore
    }
});

export default store;