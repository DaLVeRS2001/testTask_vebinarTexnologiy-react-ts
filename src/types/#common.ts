import {Dispatch} from "redux";
import {TodoActions} from "./reducers/todo";

export type AllActions = TodoActions
export type  TDefaultAC = (...arg: any) => (dispatch: Dispatch<AllActions>) => void