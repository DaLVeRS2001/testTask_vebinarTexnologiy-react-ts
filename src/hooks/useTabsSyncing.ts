import { useEffect, useState } from "react";
import myLocalStorage from "../services/myLocalStorage";
import _ from "lodash";
import { ITodoState } from "../types/reducers/todo";

const useTabsSyncing = (
  loadState: (state: string) => void,
  state: ITodoState
) => {
  const [render, setRender] = useState<number>(0);

  const savedTodoItems: string | null = myLocalStorage.getTodoItems();
  const theSameStates: boolean = _.isEqual(state.todoItems, savedTodoItems);

  const toSaveState = (): void => {
    const savedState: string | null = myLocalStorage.getCurrentState();
    savedState && loadState(savedState);
  };

  useEffect(() => {
    toSaveState();
  }, []);

  useEffect(() => {
    const listener = (event: StorageEvent): void => {
      if (event.key === "todoListState") {
        setRender(render + 1);
        toSaveState();
      }
    };
    window.addEventListener("storage", listener);
    render > 0 && window.removeEventListener("storage", listener);
    //возникает цикличность, это её исправляет, как и условие theSameStates
  }, [render]);

  useEffect(() => {
    !theSameStates && myLocalStorage.setCurrentState(state);
  }, [state.todoItems]);
};

export default useTabsSyncing;
