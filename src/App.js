import { TodoListModel } from "./model/TodoListModel.js";
import { render, element } from "./view/html-util.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
  constructor() {
    this.todoListModel = new TodoListModel();
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const contanerElement = document.querySelector("#js-todo-list");
    const todoCountElement = document.querySelector("#js-todo-count");

    this.todoListModel.onChange(() => {
      const todoItems = this.todoListModel.getTodoItems();
      const todoListView = new TodoListView();
      const todoListElement = todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.todoListModel.updateTodo({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.todoListModel.deleteTodo({ id });
        },
      });
      render(todoListElement, contanerElement);
      todoCountElement.textContent = `Todoアイテムの数: ${this.todoListModel.getTodoCount()}`;
    });

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      inputElement.value = "";
    });
  }
}
