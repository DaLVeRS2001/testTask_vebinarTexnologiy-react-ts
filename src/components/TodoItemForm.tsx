
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CertainData from "../services/getCertainData";
import {addTodoItem} from "../redux/thunks/todoThunks";
import {connect} from "react-redux";
import {TodoItem} from "../types/reducers/todo";


export interface ITodoItemFormProps{
    addTodoItem: (todoItem: TodoItem) => void
}

 const TodoItemForm: React.FC<ITodoItemFormProps> = ({addTodoItem}) => {

    const { control, handleSubmit, reset, watch } = useForm();

    const inputStyles = new CertainData().getModel().getInputStyles(),
        classes = inputStyles

    return (
        <form
            onSubmit={handleSubmit((formData: TodoItem) => {
                addTodoItem(formData)
                reset({ title: '', details: '' });
            })}
        >
            <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="TODO"
                        fullWidth={true}
                        className={classes.root}
                    />
                )}
            />
            <Controller
                name="details"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Details"
                        fullWidth={true}
                        multiline={true}
                        className={classes.root}
                    />
                )}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!watch('title')}
            >
                Add
            </Button>
        </form>
    );
}



export default connect(null, {addTodoItem})(TodoItemForm)