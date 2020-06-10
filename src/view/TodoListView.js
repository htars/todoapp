import { TodoItemView } from "./TodoItemView.js";
import { element } from "./html-util.js";

export class TodoListView {
  createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
    const todoListElement = element`<ul />`;
    todoItems.forEach((todo) => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todo, {
        onUpdateTodo,
        onDeleteTodo,
      });
      todoListElement.appendChild(todoItemElement);
    });

    return todoListElement;
  }
}
