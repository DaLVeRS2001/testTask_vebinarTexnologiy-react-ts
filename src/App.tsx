import React, {useEffect} from 'react';

import { ThemeProvider } from '@material-ui/styles';

import {connect, Provider} from "react-redux";
import {store} from "./redux";
import myLocalStorage from "./services/myLocalStorage";
import {RootReducers} from "./redux/reducers";
import {loadState} from "./redux/thunks/todoThunks";
import {IAppConnect, ITodoState} from "./types/reducers/todo";
import Content from "./components/Content";
import {IAppProps} from "./types/props";
import CertainData from "./services/getCertainData";




const App: React.FC<IAppProps> = ({state, loadState}) => {

    const theme = new CertainData().getModel().getTheme

    useEffect(() => {
        const savedState = myLocalStorage.getCurrentState()
        savedState && loadState(savedState)
    }, []);

    useEffect(() => {
        myLocalStorage.setCurrentState(state)
    }, [state.todoItems]);

    return (
            <ThemeProvider theme={theme}>
                <Content />
            </ThemeProvider>
    );
}




const mapStateToProps = (state: RootReducers): IAppConnect => ({
    state: state.todo
})

export default connect(mapStateToProps, {loadState})(App);
