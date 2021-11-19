import { generateId } from "../../services/SomeMethods";
import {
  ITodoState,
  TodoActions,
  TodoActionTypes,
} from "../../types/reducers/todo";
import produce from "immer";

const initialState = {
  todoItems: [],
};

export const todoReducer = (
  state: ITodoState = initialState,
  action: TodoActions
): ITodoState => {
  switch (action.type) {
    case TodoActionTypes.LOAD_STATE: {
      return action.payload;
    }
    case TodoActionTypes.ADD:
      return produce(state, (draft) => {
        draft.todoItems.push({
          ...action.payload,
          id: generateId(),
          done: false,
        });
      });
    case TodoActionTypes.REPLACE_TODO_ITEMS:
      return produce(state, (draft) => {
        draft.todoItems = action.payload;
      });
    case TodoActionTypes.FIELD:
      return produce(state, (draft) => {
        draft.todoItems = draft.todoItems.map((el, idx) => {
          if (idx === action.payload.id)
            return {
              ...el,
              [action.payload.fieldName]: action.payload.fieldVal,
            };
          return el;
        });
      });
    case TodoActionTypes.DELETE:
      return produce(state, (draft) => {
        draft.todoItems = draft.todoItems.filter(
          ({ id }) => id !== action.payload
        );
      });
    case TodoActionTypes.TOGGLE_DONE:
      const itemIndex = state.todoItems.findIndex(
        ({ id }) => id === action.payload
      );
      const item = { ...state.todoItems[itemIndex] };

      return produce(state, (draft) => {
        draft.todoItems = [
          ...state.todoItems.slice(0, itemIndex),
          { ...item, done: !item.done },
          ...state.todoItems.slice(itemIndex + 1),
        ];
      });
    default:
      return state;
  }
};
