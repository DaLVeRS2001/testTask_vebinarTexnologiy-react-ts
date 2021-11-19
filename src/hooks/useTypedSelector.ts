import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootReducers} from "../redux/reducers";

export const useTypedSelector: TypedUseSelectorHook<RootReducers> = useSelector