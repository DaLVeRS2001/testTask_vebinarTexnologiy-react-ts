import React, { useEffect, useState } from "react";

import { ThemeProvider } from "@material-ui/styles";

import { connect, Provider } from "react-redux";
import { store } from "./redux";
import myLocalStorage from "./services/myLocalStorage";
import { RootReducers } from "./redux/reducers";
import { loadState } from "./redux/thunks/todoThunks";
import { IAppConnect, ITodoState } from "./types/reducers/todo";
import Content from "./components/Content";
import { IAppProps } from "./types/props";
import CertainData from "./services/getCertainData";
import _ from "lodash";

const App: React.FC<IAppProps> = ({ state, loadState }) => {
  const theme = new CertainData().getModel().getTheme;
  const [render, setRender] = useState(0);

  const savedTodoItems = myLocalStorage.getTodoItems();
  const theSameStates = _.isEqual(state.todoItems, savedTodoItems);

  const toSaveState = () => {
    const savedState = myLocalStorage.getCurrentState();
    savedState && loadState(savedState);
  };

  useEffect(() => {
    toSaveState();
  }, []);

  useEffect(() => {
    const listener = (event: StorageEvent) => {
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

  return (
    <ThemeProvider theme={theme}>
      <Content />
    </ThemeProvider>
  );
};

const mapStateToProps = (state: RootReducers): IAppConnect => ({
  state: state.todo,
});

export default connect(mapStateToProps, { loadState })(App);
