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
        }
    },

    reducers: {
        setLogin: (state, action ) => {
            state.data = action.payload;
        },

        getLogin: (state, action) => {
            return state.data;
        }
    }
});

export const { setLogin, getLogin } = LoginSlice.actions;

export default LoginSlice.reducer;