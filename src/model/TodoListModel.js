import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  /**
   * タスク一覧を初期化
   * @param {Array} items
   */
  constructor(items = []) {
    super();
    this.items = [];
  }

  /**
   * タスク一覧を返す
   */
  getTodoItems() {
    return this.items;
  }

  /**
   * タスク数を返す
   */
  getTodoCount() {
    return this.items.length;
  }

  /**
   * changeイベントにリスナー関数を登録する
   * @param {function} listener
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }

  /**
   * changeイベントのリスナー関数を実行する
   */
  emitChange() {
    this.emit("change");
  }

  /**
   * タスクが新規追加されたことをトリガーにチェンジイベントを実行
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }

  /**
   * タスクの完了状態を反転させる
   * @param {int} id タスクID
   * @param {boolean} completed 完了状態
   */
  updateTodo({ id, completed }) {
    const todo = this.items.find((item) => {
      return item.id === id;
    });
    todo.completed = completed;
    this.emitChange();
  }

  /**
   * 引数のID意外のタスク一覧を残す
   * @param {int} id タスクID
   */
  deleteTodo({ id }) {
    this.items = this.items.filter((item) => {
      return item.id !== id;
    });
    this.emitChange();
  }
}
