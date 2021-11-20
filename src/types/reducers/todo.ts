//ALIASES
export interface TodoItem {
  id: string;
  title: string;
  details?: string;
  done: boolean;
  time: string;
  tag: string;
}
export type ChangeField = {
  idx: number;
  id?: string;
  fieldName: keyof TodoItem;
  fieldVal: any;
};

//ENUMS
export enum TodoActionTypes {
  LOAD_STATE = "LOAD_STATE",
  ADD = "ADD",
  DELETE = "DELETE",
  TOGGLE_DONE = "TOGGLE_DONE",
  REPLACE_TODO_ITEMS = "REPLACE_TODO_ITEMS",
  FIELD = "FIELD",
}

//ACTIONS
interface ILoadStateAction {
  type: TodoActionTypes.LOAD_STATE;
  payload: ITodoState;
}
interface IAddItemAction {
  type: TodoActionTypes.ADD;
  payload: TodoItem;
}
interface IDeleteItemAction {
  type: TodoActionTypes.DELETE;
  payload: string;
}
interface IToggleDoneAction {
  type: TodoActionTypes.TOGGLE_DONE;
  payload: string;
}

interface IReplaceTodoItemsAction {
  type: TodoActionTypes.REPLACE_TODO_ITEMS;
  payload: TodoItem[];
}
interface IChangeFieldAction {
  type: TodoActionTypes.FIELD;
  payload: ChangeField;
}

//RootAction
export type TodoActions =
  | ILoadStateAction
  | IAddItemAction
  | IDeleteItemAction
  | IToggleDoneAction
  | IReplaceTodoItemsAction
  | IChangeFieldAction;

//RootSTATE
export interface ITodoState {
  todoItems: TodoItem[];
}

//ConnectStates
export interface IAppConnect {
  state: ITodoState;
}
