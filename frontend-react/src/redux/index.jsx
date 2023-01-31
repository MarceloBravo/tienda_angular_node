import { configureStore } from '@reduxjs/toolkit';
import login from './slices/loginSlices'

export default configureStore({
    reducer: {
        login
    }
});