import {combineReducers} from "redux";
import {todoReducer} from "./todoReducer";


export const reducers = combineReducers({
    todo: todoReducer
})

export type RootReducers = ReturnType<typeof reducers>