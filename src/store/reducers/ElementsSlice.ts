import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import default_data from "../default_data.json";

interface IElementsState {
    elements: Array<object | any>;
    loading: "idle" | "pending" | "rejected" | "loaded"
}

const defaultData: string = JSON.stringify(default_data)

const initialState: IElementsState = {
    elements:JSON.parse(defaultData),
    loading:"idle"

}

export const elementsSlice = createSlice({
    name:'stores',
    initialState,
    reducers: {
        setElements(state,action: PayloadAction<any>){
            state.elements = action.payload;
        },
    },
})

export default elementsSlice.reducer;