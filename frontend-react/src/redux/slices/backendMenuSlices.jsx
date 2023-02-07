import { createSlice } from "@reduxjs/toolkit";

export const backendMenuSlice = createSlice({
    name: 'backendMenu',

    initialState: {
        data: {
            count: 0,
            rows: []
        }
    },

    reducers: {
        setbackendMenu: (state, action) => {
            state.data = action.payload;
        },

        getbackendMenu: (state) => {
            return state.data;
        }
    }
});

export const { setbackendMenu, getbackendMenu } = backendMenuSlice.actions;

export default backendMenuSlice.reducer;