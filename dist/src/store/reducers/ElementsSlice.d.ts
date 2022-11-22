import { PayloadAction } from "@reduxjs/toolkit";
interface IElementsState {
    elements: Array<object | any>;
    selectedProperties: {
        child: {
            name?: string;
            properties?: any;
        };
        path?: any;
        category?: string;
        edited: boolean;
    };
}
export declare const elementsSlice: import("@reduxjs/toolkit").Slice<IElementsState, {
    setElements(state: import("immer/dist/internal").WritableDraft<IElementsState>, action: PayloadAction<any>): void;
    setSelectedProperties(state: import("immer/dist/internal").WritableDraft<IElementsState>, action: PayloadAction<any>): void;
    handlePropChange(state: import("immer/dist/internal").WritableDraft<IElementsState>, action: PayloadAction<any>): void;
    updateData(state: import("immer/dist/internal").WritableDraft<IElementsState>, action: PayloadAction<any>): void;
}, "stores">;
declare const _default: import("redux").Reducer<IElementsState, import("redux").AnyAction>;
export default _default;
