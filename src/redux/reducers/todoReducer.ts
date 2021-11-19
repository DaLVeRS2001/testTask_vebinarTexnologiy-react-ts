
import {generateId} from "../../services/SomeMethods";
import {ITodoState, TodoActions, TodoActionTypes, TodoItem} from "../../types/reducers/todo";
import produce from "immer";
import {act} from "@testing-library/react";


const initialState = {
    todoItems: []
}

export const todoReducer = (state: ITodoState = initialState, action: TodoActions): ITodoState => {
    switch (action.type) {
        case TodoActionTypes.LOAD_STATE: {
            return action.payload;
        }
        case TodoActionTypes.ADD:
            return {
                ...state,
                todoItems: [
                    {...action.payload, id: generateId(), done: false},
                    ...state.todoItems,
                ]
            };
        case TodoActionTypes.REPLACE_TODO_ITEMS:
            return {
                ...state,
                todoItems: [...action.payload],
            };
        case TodoActionTypes.FIELD:
            //produce тут не поможет
            return {
                ...state,
                todoItems: state.todoItems.map((el, idx) => {
                    if(idx === action.payload.id) return {...el, [action.payload.fieldName]: action.payload.fieldVal}
                    return el
                })
            }
        case TodoActionTypes.DELETE:
            return {
                ...state,
                todoItems: state.todoItems.filter(
                    ({ id }) => id !== action.payload,
                ),
            };
        case TodoActionTypes.TOGGLE_DONE:
            const itemIndex = state.todoItems.findIndex(
                ({ id }) => id === action.payload,
            );
            const item = state.todoItems[itemIndex];

            return {
                ...state,
                todoItems: [
                    ...state.todoItems.slice(0, itemIndex),
                    { ...item, done: !item.done },
                    ...state.todoItems.slice(itemIndex + 1),
                ],
            };
        default:
           return state
    }
}