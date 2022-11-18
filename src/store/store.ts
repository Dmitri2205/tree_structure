import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import elementsReducer  from './reducers/ElementsSlice'; 


const rootReducer = combineReducers({
    elementsReducer
})

export const store = configureStore({
  reducer:rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
