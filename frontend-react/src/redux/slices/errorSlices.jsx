import { createSlice } from "@reduxjs/toolkit";

export const ErrorSlice = createSlice({
    name: 'error',

    initialState: {
        data: {
            error: null
        }
    },

    reducers: {
        setError: (state, action) => {
            state.data = action.payload;
        },

        getError: (state) => {
            return state.data;
        }
    }
});

export const { setError, getError } = ErrorSlice.actions;

export default ErrorSlice.reducer;
