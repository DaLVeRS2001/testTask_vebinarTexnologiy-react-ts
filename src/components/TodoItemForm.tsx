//Other
import React from "react";
import CertainData from "../services/getCertainData";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useForm, Controller } from "react-hook-form";

//Material-ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//Redux
import { addTodoItem } from "../redux/thunks/todoThunks";
import { connect } from "react-redux";

//Types
import { ITodoItemFormProps } from "../types/props";
import { TodoItem } from "../types/reducers/todo";
import useStorageLimit from "../hooks/useStorageLimit";

const TodoItemForm: React.FC<ITodoItemFormProps> = ({ addTodoItem }) => {
  const { control, handleSubmit, reset, watch } = useForm();

  const inputStyles = new CertainData().getModel().getInputStyles(),
    classes = inputStyles;

  const todoItems = useTypedSelector<TodoItem[]>(
    (state) => state.todo.todoItems
  );

  const { isCanBeAdded, storageLimitError } = useStorageLimit(todoItems);

  return (
    <form
      onSubmit={handleSubmit((formData: TodoItem) => {
        addTodoItem(formData);
        reset({ title: "", details: "" });
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
          disabled={!watch("title") || !isCanBeAdded}
        >
          Add
        </Button>{" "}
        <br />
        {storageLimitError && (
          <small style={{ color: "red" }}>{storageLimitError}</small>
        )}
      </>
    </form>
  );
};

export default connect(null, { addTodoItem })(TodoItemForm);
