import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import default_data from "../default_data.json";

interface IElementsState {
    elements: Array<object | any>;
    selectedProperties:{
        child:{
            name?: string,
            properties?: any;
            path?: any
        },
        path:string,
        edited: boolean
    }
}

const defaultData: string = JSON.stringify(default_data)

const initialState: IElementsState = {
    elements:JSON.parse(defaultData),
    selectedProperties:{child:{},path:"",edited:false}

}

export const elementsSlice = createSlice({
    name:'stores',
    initialState,
    reducers: {
        setElements(state,action: PayloadAction<any>){
            state.elements = action.payload;
        },
        setSelectedProperties(state,action: PayloadAction<any>){
            const {child,parent}: any = action.payload;
            state.selectedProperties.child = child;
            state.selectedProperties.path = parent;
        },
        handlePropChange(state,action: PayloadAction<any>){
            const {property,value,childIndex,tabName} = action.payload;
            state.selectedProperties.child.properties[tabName][property] = value;
            state.selectedProperties.edited = true;
        },
        updateData(state,action: PayloadAction<any>){

            const {sectionIndex,sectionChildIndex,childIndex,value} = action.payload;
            state.elements[sectionIndex].children[sectionChildIndex].children[childIndex] = value.selectedProperties.child;
            state.selectedProperties.edited = false;
        }
    },
})

export default elementsSlice.reducer;