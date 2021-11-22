import { ITodoState, TodoItem } from "./reducers/todo";

export type TypedUseTabsSyncing = (
  loadState: (state: string) => void,
  state: ITodoState
) => void;

export type TypedUseStorageLimit = (todoItems: TodoItem[]) => {
  storageLimitError: string;
  isCanBeAdded: boolean;
};

export type TypedUseTodoNotify = (
  item: TodoItem,
  handler: (fieldVal: string, idx: number) => void
) => { setNotifyType: (value: string, idx: number) => void | false };
