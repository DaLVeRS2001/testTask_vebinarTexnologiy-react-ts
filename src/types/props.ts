import { ChangeField, ITodoState, TodoItem } from "./reducers/todo";

//App
export interface IAppProps {
  loadState: (state: ITodoState | string) => void;
  state: ITodoState;
}

//TodoItemCard
export interface ITodoItemCardProps {
  item: TodoItem;
  idx: number;
  deleteTodoItem: (id: string) => void;
  changeField: (fieldData: ChangeField) => void;
  toggleDone: (id: string) => void;
}

//TodoItemForm
export interface ITodoItemFormProps {
  addTodoItem: (todoItem: TodoItem) => void;
}

//TodoItemsList
export interface ITodoItemsListProps {
  todoItems: TodoItem[];
  replaceTodoItems: (todoItems: TodoItem[]) => void;
}
