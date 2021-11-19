
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CertainData from "../services/getCertainData";
import {addTodoItem} from "../redux/thunks/todoThunks";
import {connect} from "react-redux";
import {TodoItem} from "../types/reducers/todo";
import {useEffect, useState} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";


export interface ITodoItemFormProps{
    addTodoItem: (todoItem: TodoItem) => void
}

 const TodoItemForm: React.FC<ITodoItemFormProps> = ({addTodoItem}) => {

    const [isCanBeAdded, handleIsCanBeAdded] = useState<boolean>(true)

    const { control, handleSubmit, reset, watch, formState: {errors}, setError} = useForm();

    const inputStyles = new CertainData().getModel().getInputStyles(),
        classes = inputStyles;

    const todoItems = useTypedSelector(state => state.todo.todoItems)

     useEffect(()=> {
         !isCanBeAdded && setError('addBtn', {
             message: "Превышен лемит записей, удалите несколько штук"
         })
     }, [isCanBeAdded])


     useEffect(() => {
         if ('storage' in navigator && 'estimate' in navigator.storage) {
             navigator.storage.estimate()
                 .then(estimate => {
                     if (estimate.usage && estimate.quota)
                         estimate.usage >= estimate.quota
                             ? handleIsCanBeAdded(false)
                             : handleIsCanBeAdded(true)
                 });
         }
     },[todoItems])

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
            <>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!watch('title') || !isCanBeAdded}
                >
                    Add
                </Button> <br/>
                {errors.addBtn && <small style={{color: "red"}}>{errors.addBtn.message}</small>}
            </>
        </form>
    );
}



export default connect(null, {addTodoItem})(TodoItemForm)