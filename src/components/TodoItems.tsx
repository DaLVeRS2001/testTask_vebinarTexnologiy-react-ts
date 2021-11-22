//Other
import React, { useState } from "react";
import CertainData from "../services/getCertainData";
import { sortItems } from "../services/SomeMethods";
import { motion } from "framer-motion";

//Redux
import { RootReducers } from "../redux/reducers";
import { replaceTodoItems } from "../redux/thunks/todoThunks";
import { connect } from "react-redux";

//Types
import { TodoItem } from "../types/reducers/todo";
import { ITodoItemsListProps } from "../types/props";

//Component
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import TodoItemCard from "./TodoItemCard";

const TodoItemsList: React.FC<ITodoItemsListProps> = ({
  todoItems,
  replaceTodoItems,
}) => {
  const [searchValue, changeSearchValue] = useState<string>("");

  const { staticSpring, getTodoItemListStyles } = new CertainData().getModel(),
    todoItemListStyles = getTodoItemListStyles(),
    classes = todoItemListStyles;

  const [spring, changeSpring] = useState<typeof staticSpring | {}>({
    ...staticSpring,
  });
  //Если не занулять объект, то при драг дропе дикая задержка

  const sortedItems = sortItems(todoItems),
    filteredItems = [...sortedItems].filter(
      (item: TodoItem) =>
        item.tag?.startsWith(searchValue) || (!item.tag && !searchValue.length)
    );

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...sortedItems];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    replaceTodoItems(items);
    changeSpring({ ...staticSpring });
  };

  return (
    <DragDropContext
      onDragStart={() => changeSpring({})}
      onDragEnd={handleOnDragEnd}
    >
      {todoItems.length > 0 && (
        <input
          placeholder={"Поиск по тегам"}
          type={"text"}
          onChange={(e) => changeSearchValue(e.target.value)}
          style={{ marginTop: "20px" }}
        />
      )}
      <Droppable droppableId={"todoItems"} type="PERSON">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.root}
          >
            {filteredItems?.map((item: TodoItem, idx: number) => (
              <Draggable
                key={item.id + idx}
                index={idx}
                draggableId={item.id + idx}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <motion.li transition={spring} layout={true}>
                      <TodoItemCard idx={idx} item={item} />
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
  );
};

export interface ITodoItemsListConnect {
  todoItems: TodoItem[];
}

const mapStateToProps = (state: RootReducers): ITodoItemsListConnect => ({
  todoItems: state.todo.todoItems,
});

export default connect(mapStateToProps, { replaceTodoItems })(TodoItemsList);
