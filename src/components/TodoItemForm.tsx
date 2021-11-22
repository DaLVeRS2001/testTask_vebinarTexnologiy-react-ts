//Other
import React, { useEffect, useState } from "react";
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

const TodoItemForm: React.FC<ITodoItemFormProps> = ({ addTodoItem }) => {
  const [isCanBeAdded, handleIsCanBeAdded] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const inputStyles = new CertainData().getModel().getInputStyles(),
    classes = inputStyles;

  const todoItems = useTypedSelector((state) => state.todo.todoItems);

  useEffect(() => {
    !isCanBeAdded &&
      setError("addBtn", {
        message: "Превышен лимит записей, удалите несколько штук",
      });
  }, [isCanBeAdded]);

  useEffect(() => {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      navigator.storage.estimate().then((estimate) => {
        //Уменьшил для того, что бы не было в упор
        if (estimate.usage && estimate.quota)
          estimate.usage >= estimate.quota - 1000000
            ? handleIsCanBeAdded(false)
            : handleIsCanBeAdded(true);
      });
    }
  }, [todoItems]);

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
        {errors.addBtn && (
          <small style={{ color: "red" }}>{errors.addBtn.message}</small>
        )}
      </>
    </form>
  );
};

export default connect(null, { addTodoItem })(TodoItemForm);
