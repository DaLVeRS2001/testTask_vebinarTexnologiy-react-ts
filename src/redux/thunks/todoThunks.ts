import {ChangeField, ITodoState, TodoActions, TodoActionTypes, TodoItem} from "../../types/reducers/todo";
import {Dispatch} from "redux";
import {TDefaultAC} from "../../types/#common";

export const addTodoItem: TDefaultAC = (todoItem: TodoItem) => (dispatch: Dispatch<TodoActions>) => {
    dispatch({type: TodoActionTypes.ADD, payload: todoItem})
    },
    deleteTodoItem: TDefaultAC = (id: string) => (dispatch: Dispatch<TodoActions>) => {
        dispatch({type: TodoActionTypes.DELETE, payload: id})
    },
    replaceTodoItems: TDefaultAC = (todoItems: TodoItem[]) => (dispatch: Dispatch<TodoActions>) => {
        dispatch({type: TodoActionTypes.REPLACE_TODO_ITEMS, payload: todoItems})
    },
    changeField: TDefaultAC = (fieldData: ChangeField) => (dispatch: Dispatch<TodoActions>) => {
        dispatch({type: TodoActionTypes.FIELD, payload: fieldData})
    },
    toggleDone: TDefaultAC = (id: string) => (dispatch: Dispatch<TodoActions>) => {
        dispatch({type: TodoActionTypes.TOGGLE_DONE, payload: id})
    },
    loadState: TDefaultAC = (state: ITodoState) => (dispatch: Dispatch<TodoActions>) => {
        dispatch({ type: TodoActionTypes.LOAD_STATE, payload: state});
    }


