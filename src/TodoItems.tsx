import {useCallback, useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { TodoItem, useTodoItems } from './TodoItemsContext';

import {
    DragDropContext,
    Droppable,
    Draggable,
    DragDropContextProps,
    DropResult,
    ResponderProvided, OnDragEndResponder
} from "react-beautiful-dnd"


const staticSpring  = {
    type: 'spring',
    damping: 25,
    stiffness: 120,
    duration: 0.25,
}





const useTodoItemListStyles = makeStyles({
    root: {
        listStyle: 'none',
        padding: 0,
    },
});



export const TodoItemsList = function () {
    const { todoItems, dispatch } = useTodoItems();
    const [spring, changeSpring] = useState<typeof staticSpring | {}>({...staticSpring})
    //Если не занулять объект, то при драг дропе дикая задержка

    const classes = useTodoItemListStyles();

    const sortedItems = todoItems.slice().sort((a, b) => {
        if (a.done && !b.done) {
            return 1;
        }
        if (!a.done && b.done) {
            return -1;
        }
        return 0;
    });





    const handleOnDragEnd = (result: DropResult ) => {
        if(!result.destination) return;
        const items = [...todoItems]
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        dispatch({ type: 'drag', data: items});
        changeSpring({...staticSpring})
    }


    return (
        <DragDropContext onDragStart={()=> changeSpring({})} onDragEnd={handleOnDragEnd}>

            <Droppable droppableId={'todoItems'} type="PERSON">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className={classes.root}>
                        {sortedItems.map((item, idx) => (
                            <Draggable key={item.id+idx} index={idx} draggableId={item.id+idx}>
                                {(provided)=> (
                                    <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <motion.li   transition={spring} layout={true}>
                                            <TodoItemCard idx={idx} item={item}/>
                                        </motion.li>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const useTodoItemCardStyles = makeStyles({
    root: {
        marginTop: 24,
        marginBottom: 24,
    },
    doneRoot: {
        textDecoration: 'line-through',
        color: '#888888',
    },
});

export const TodoItemCard = function ({ item, idx }: { item: TodoItem, idx: number }) {
    const classes = useTodoItemCardStyles();
    const { todoItems, dispatch } = useTodoItems();

    const handleDelete = useCallback(
        () => dispatch({ type: 'delete', data: { id: item.id } }),
        [item.id, dispatch],
    );

    const handleToggleDone = useCallback(
        () =>
            dispatch({
                type: 'toggleDone',
                data: { id: item.id },
            }),
        [item.id, dispatch],
    );

    const changeTime = (time: string, idx: number) => {
        const permission = Notification.permission
        switch (permission) {
            case "granted":
                dispatch({type: "time", data: {id: idx, time}})
                break;
            case "denied":
                return false;
            case "default":
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        dispatch({type: "time", data: {id: idx, time}})
                    }
                })
        }
    }






    useEffect(()=> {
        let interval: any;
        if(item.time?.length) {
            interval = setInterval(() => {
                const options = {
                    tag: 'tasks',
                    body: `Пришло напоминание для задачи: ${item.title}`
                }
                const currentTime = new Date().toLocaleTimeString().replace(/(:\d{2}| [AP]M)$/, "")
                if (currentTime >= item.time) {
                    clearInterval(interval)
                    new Notification('Напоминание', options)
                }
            }, 1000)
        }
        return ()=> clearInterval(interval)
    }, [item])


    return (
        <Card
            className={classnames(classes.root, {
                [classes.doneRoot]: item.done,
            })}
        >
            <CardHeader
                action={
                    <>
                        <IconButton  aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                        <input value={item.time??''} onChange={(e)=>
                            changeTime(e.currentTarget.value, idx)} type="time"/>
                    </>
                }
                title={
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={item.done}
                                onChange={handleToggleDone}
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
