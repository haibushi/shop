import { createSlice} from '@reduxjs/toolkit';
import {setLocalStorage,removeLocalStorage} from '../lib/LocalStorage'
export interface initialStateType {
    userInfo:{
        [key:string]:any
    }
}




const initialState:initialStateType  = {
    userInfo:{}
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            debugger;
            state.userInfo = action.payload.userInfo;
            setLocalStorage('userInfo',JSON.stringify(action.payload));
        },
        removeUser:(state)=>{
             state.userInfo = {};
             removeLocalStorage('userInfo');
        }
    }
})

export const {
    setUser,
    removeUser
  } = userSlice.actions;

export default userSlice.reducer;