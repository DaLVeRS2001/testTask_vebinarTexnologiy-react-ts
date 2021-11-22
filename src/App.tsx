//Other
import React from "react";
import CertainData from "./services/getCertainData";
import useTabsSyncing from "./hooks/useTabsSyncing";

//Material-ui
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

//Redux
import { connect } from "react-redux";
import { RootReducers } from "./redux/reducers";
import { loadState } from "./redux/thunks/todoThunks";

//Types
import { IAppProps } from "./types/props";
import { IAppConnect } from "./types/reducers/todo";

//Components
import Content from "./components/Content";

const App: React.FC<IAppProps> = ({ state, loadState }) => {
  const theme: ReturnType<typeof createMuiTheme> = new CertainData().getModel()
    .getTheme;
  useTabsSyncing(loadState, state);

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
