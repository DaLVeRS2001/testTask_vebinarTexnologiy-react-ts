
import {generateId} from "../../services/SomeMethods";
import {ITodoState, TodoActions, TodoActionTypes} from "../../types/reducers/todo";




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
            return {
                ...state,
                todoItems: [
                    {...state.todoItems[action.payload.id], [action.payload.fieldName]: action.payload.fieldVal}
                ]
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