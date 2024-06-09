import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface StateType {
    list: User[];
}
interface User {
    name: string;
    age: number;
    date: string;
    gender: string;
    role: string;
    id: number;
}
const initialState: StateType = {
    list: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        create: (state,action) => {
            console.log('create---------',action)
            state.list.push(action.payload)
        },
        deleteItem: (state,action) => {
            const newList = state.list.filter(item => item.id !== action.payload.id );
            state.list = newList
        },
        update: (state,action) => {
           const itemIndex = state.list.findIndex(item => item.id === action.payload.id);
           state.list[itemIndex] = action.payload
        },
    }
})
export const { create,update,deleteItem } = userSlice.actions;

export default userSlice.reducer;