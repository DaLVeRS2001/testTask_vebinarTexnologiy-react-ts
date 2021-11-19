import {useEffect, useState} from 'react';
import { motion } from 'framer-motion';


import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd"
import CertainData from "../services/getCertainData";
import {connect} from "react-redux";
import {changeField, replaceTodoItems} from "../redux/thunks/todoThunks";
import {ChangeField, TodoItem} from "../types/reducers/todo";
import {RootReducers} from "../redux/reducers";
import TodoItemCard from "./TodoItemCard";
import {sortItems} from "../services/SomeMethods";



export interface ITodoItemsListProps{
    todoItems: TodoItem[]
    replaceTodoItems: (todoItems: TodoItem[]) => void
    changeField: (fieldData: ChangeField) => void
}

const TodoItemsList: React.FC<ITodoItemsListProps> = ({todoItems, replaceTodoItems, changeField}) =>  {
    const [searchValue, changeSearchValue] = useState<string>('')

    const {staticSpring, getTodoItemListStyles} = new CertainData().getModel(),
        todoItemListStyles = getTodoItemListStyles(),
        classes = todoItemListStyles

    const [spring, changeSpring] = useState<typeof staticSpring | {}>({...staticSpring})
    //Если не занулять объект, то при драг дропе дикая задержка

    const sortedItems = sortItems(todoItems),
        filteredItems = [...sortedItems].filter((item: TodoItem)=> item.tag?.startsWith(searchValue) || !item.tag)



    const handleOnDragEnd = (result: DropResult ) => {
        if(!result.destination) return;
        const items = [...todoItems]
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        replaceTodoItems(items)
        changeSpring({...staticSpring})
    }


    return (
        <DragDropContext onDragStart={()=> changeSpring({})} onDragEnd={handleOnDragEnd}>
            <input
                placeholder={'Поиск по тегам'} type={'text'}
                onChange={(e)=> changeSearchValue(e.target.value)}
            />
            <Droppable droppableId={'todoItems'} type="PERSON">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className={classes.root}>
                        {filteredItems?.map((item: TodoItem, idx: number) => (
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

export interface ITodoItemsListConnect{
    todoItems: TodoItem[]
}


const mapStateToProps = (state: RootReducers):ITodoItemsListConnect  => ({
    todoItems: state.todo.todoItems
})

export default connect(mapStateToProps, {replaceTodoItems, changeField})(TodoItemsList)

