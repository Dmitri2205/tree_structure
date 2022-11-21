import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import default_data from "../default_data.json";

interface IElementsState {
    elements: Array<object | any>;
    selectedProperties:{
        name?: string,
        properties?: any;
    };
    loading: "idle" | "pending" | "rejected" | "loaded"
}

const defaultData: string = JSON.stringify(default_data)

const initialState: IElementsState = {
    elements:JSON.parse(defaultData),
    selectedProperties:{},
    loading:"idle"

}

export const elementsSlice = createSlice({
    name:'stores',
    initialState,
    reducers: {
        setElements(state,action: PayloadAction<any>){
            state.elements = action.payload;
        },
        setSelectedProperties(state,action: PayloadAction<any>){
            state.selectedProperties = action.payload;
        },
        handlePropChange(state,action: PayloadAction<any>){
            const {property,value,childIndex,tabName} = action.payload;
            state.selectedProperties.properties[tabName][property] = value;
        }
    },
})

export default elementsSlice.reducer;