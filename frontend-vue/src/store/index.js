import { createStore } from 'vuex';
import loginStore from './loginStore.js';
import errorStore from './errorStore.js';

const store = createStore({
    modules:{
        loginStore,
        errorStore
    }
});

export default store;