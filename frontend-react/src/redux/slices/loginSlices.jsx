import { createSlice } from '@reduxjs/toolkit';

export const LoginSlice = createSlice({
    name: 'login',

    initialState: {
        data: {
            user: null,
            rolIdaddress: '',
            iat: '',
            exp: '',
            iss: ''
        },
        rememberMe: false,
        isLogout: true
    },

    reducers: {
        setLogin: (state, action ) => {
            console.log('USUARIO', action.payload);
            state.data = action.payload;
        },

        setRemember: (state, action) => {
            state.rememberMe = action.payload;
        },

        setLogout: (state, action) => {
            state.isLogout = action.payload;
            if(action.payload){
                state.data = {
                                user: null,
                                rolIdaddress: '',
                                iat: '',
                                exp: '',
                                iss: ''
                            };
                state.rememberMe = false;
            }
        },

        getLogin: (state) => {
            return state.data;
        },

        getRemember: (state) => {
            return state.rememberMe;
        },

        getLogout: (state) => {
            return state.isLogout;
        }
    }
});

export const { setLogin, setRemember, setLogout, getLogin, getRemember, getLogout } = LoginSlice.actions;

export default LoginSlice.reducer;