import { configureStore } from '@reduxjs/toolkit';
import login from './slices/loginSlices';
import error from './slices/errorSlices';
import backendMenu from './slices/backendMenuSlices';

export default configureStore({
    reducer: {
        login,
        error,
        backendMenu
    }
});