import { ITodoState } from "./reducers/todo";

//App
export interface IAppProps {
  loadState: (state: ITodoState | string) => void;
  state: ITodoState;
}
