import {CertainModel, ICertainData} from "../types/services";
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";

class CertainData implements ICertainData{
    private _model: CertainModel = {
        getTheme: createMuiTheme({
            palette: {
                primary: { main: '#9012fe' },
                secondary: { main: '#b2aabf' },
            },
        }),
        getInputStyles: makeStyles(() => ({
            root: { marginBottom: 24 },
        })),
        getTodoItemListStyles: makeStyles(() => ({
            root: { listStyle: 'none', padding: 0 },
        })),
        getTodoItemCardStyles:  makeStyles({
            root: { marginTop: 24, marginBottom: 24 },
            doneRoot: { textDecoration: 'line-through', color: '#888888' },
        }),
        staticSpring: {
            type: 'spring',
            damping: 25,
            stiffness: 120,
            duration: 0.25,
        }
    }

    public getModel() {
        return this._model
    }
}

export default CertainData