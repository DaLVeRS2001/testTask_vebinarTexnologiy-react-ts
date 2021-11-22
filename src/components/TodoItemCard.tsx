//Other
import React, { useState } from "react";
import CertainData from "../services/getCertainData";
import useTodoNotify from "../hooks/useTodoNotify";

//Types
import { ITodoItemCardProps } from "../types/props";

//Redux
import { connect } from "react-redux";
import {
  changeField,
  deleteTodoItem,
  toggleDone,
} from "../redux/thunks/todoThunks";

//Styles
import classnames from "classnames";

//Material-ui
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const TodoItemCard: React.FC<ITodoItemCardProps> = ({
  item,
  idx,
  changeField,
  deleteTodoItem,
  toggleDone,
}) => {
  const [itemTag, changeItemTag] = useState<string>(item.tag ?? "");
  const handleOnChangeField = (): void => {
    changeField({ fieldName: "tag", fieldVal: itemTag, idx: idx });
  };
  //Эти вещи для оптимизации, тк если мы будем инетрировать целый массив из-за того что просто написали
  //букву, то все начинает лагать

  const todoItemCardStyles = new CertainData()
      .getModel()
      .getTodoItemCardStyles(),
    classes = todoItemCardStyles;

  const fieldHandler = (fieldVal: string, idx: number): void => {
    changeField({ fieldName: "time", fieldVal, idx: idx, id: item.id });
  };

  const { setNotifyType } = useTodoNotify(item, (value, idx) =>
    fieldHandler(value, idx)
  );

  return (
    <Card
      className={classnames(classes.root, {
        [classes.doneRoot]: item.done,
      })}
    >
      <CardHeader
        action={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <IconButton
              aria-label="delete"
              onClick={() => deleteTodoItem(item.id)}
            >
              <DeleteIcon />
            </IconButton>
            <input
              value={item.time ?? ""}
              onChange={(e) => setNotifyType(e.currentTarget.value, idx)}
              type="time"
            />
            <>
              <input
                style={{ marginTop: "20px" }}
                value={itemTag}
                type="text"
                placeholder={"Ваш тег"}
                onChange={(e) => changeItemTag(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOnChangeField()}
              >
                Save
              </Button>
            </>
          </div>
        }
        title={
          <FormControlLabel
            control={
              <Checkbox
                checked={item.done}
                onChange={() => toggleDone(item.id)}
                name={`checked-${item.id}`}
                color="primary"
              />
            }
            label={item.title}
          />
        }
      />
      {item.details ? (
        <CardContent>
          <Typography variant="body2" component="p">
            {item.details}
          </Typography>
        </CardContent>
      ) : null}
    </Card>
  );
};

export default connect(null, { deleteTodoItem, toggleDone, changeField })(
  TodoItemCard
);
