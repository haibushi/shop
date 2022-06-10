import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice';

export interface StorelistType{
    user:any
}

const Store = configureStore({
    reducer:{
        user: userSlice
    }
})

export default Store