import { createSlice } from "@reduxjs/toolkit";

export const backendMenuSlice = createSlice({
    name: 'backendMenu',

    initialState: {
        data: {
            count: 0,
            rows: []
        },

        togle: true
    },

    reducers: {
        setbackendMenu: (state, action) => {
            state.data = action.payload;
        },

        setTogleMenu: (state, action) => {
            state.togle = action.payload;
        },

        getbackendMenu: (state) => {
            return state.data;
        },

        getTogleMenu: (state) => {
            return state;
        }
    }
});

export const { setbackendMenu, setTogleMenu, getbackendMenu, getTogleMenu } = backendMenuSlice.actions;

export default backendMenuSlice.reducer;