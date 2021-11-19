import {ChangeField, TodoItem} from "../types/reducers/todo";
import CertainData from "../services/getCertainData";
import useTodoNotify from "../hooks/useTodoNotify";
import Card from "@material-ui/core/Card";
import classnames from "classnames";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {changeField, deleteTodoItem, toggleDone} from "../redux/thunks/todoThunks";

export interface ITodoItemCardProps{
    item: TodoItem, idx: number
    deleteTodoItem: (id: string) => void
    changeField: (fieldData: ChangeField) => void
    toggleDone: (id: string) => void
}

const TodoItemCard: React.FC<ITodoItemCardProps> =
    ({item, idx, changeField, deleteTodoItem, toggleDone}) => {

        const todoItemCardStyles = new CertainData().getModel().getTodoItemCardStyles(),
            classes = todoItemCardStyles

        const fieldHandler = (fieldVal: string, idx: number): void => {
            changeField({fieldName: 'time', fieldVal, id: idx})
        }


        const {changeTime} = useTodoNotify(item, (value, idx) => fieldHandler(value, idx))

        return (
            <Card
                className={classnames(classes.root, {
                    [classes.doneRoot]: item.done,
                })}
            >
                <CardHeader
                    action={
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <IconButton aria-label="delete" onClick={() => deleteTodoItem(item.id)}>
                                <DeleteIcon/>
                            </IconButton>
                            <input value={item.time ?? ''} onChange={(e) =>
                                changeTime(e.currentTarget.value, idx)} type="time"/>
                            <input
                                style={{marginTop: '20px'}} value={item.tag ?? ''} type="text" placeholder={'Ваш тег'}
                                onChange={(e) =>
                                    changeField({fieldName: 'tag', fieldVal: e.target.value, id: idx})}
                            />
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




export default connect(null, {deleteTodoItem, toggleDone, changeField})(TodoItemCard)