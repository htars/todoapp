let todoIdx = 0;

export class TodoItemModel {
  /**
   * タスクの初期化
   * @param {String} title タスクのタイトル
   * @param {boolean} completed タスクの完了状態
   */
  constructor({ title, completed }) {
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }
}
