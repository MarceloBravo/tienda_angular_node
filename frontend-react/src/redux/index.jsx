import { configureStore } from '@reduxjs/toolkit';
import login from './slices/loginSlices';
import error from './slices/errorSlices';

export default configureStore({
    reducer: {
        login,
        error
    }
});