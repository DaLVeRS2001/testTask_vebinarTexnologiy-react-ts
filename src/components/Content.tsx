import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TodoItemForm from "./TodoItemForm";

import React from "react";
import TodoItemsList from "./TodoItems";

function Content() {
  return (
    <Container maxWidth="sm">
      <header>
        <Typography variant="h2" component="h1">
          Todo List
        </Typography>
      </header>
      <main>
        <TodoItemForm />
        <TodoItemsList />
      </main>
    </Container>
  );
}

export default Content;
