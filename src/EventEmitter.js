export class EventEmitter {
  /**
   * 任意のイベントに対するリスナー関数を保持する変数を初期化
   */
  constructor() {
    this._listeners = new Map();
  }

  /**
   * イベントに対するリスナー関数を登録
   * @param {String} type イベント名
   * @param {function} listener リスナー関数
   */
  addEventListener(type, listener) {
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Set());
    }
    const listeners = this._listeners.get(type);
    listeners.add(listener);
  }

  /**
   * イベントに登録されているリスナー関数を実行
   * @param {String} type イベント名
   */
  emit(type) {
    const listeners = this._listeners.get(type);
    if (!listeners) {
      return;
    }
    listeners.forEach((listener) => {
      listener.call(this);
    });
  }

  /**
   * イベントに対するリスナー関数を削除
   * @param {String} type
   * @param {function} listener
   */
  deleteEventListener(type, listener) {
    if (!this._listeners.has(type)) {
      return;
    }
    const listeners = this._listeners.get(type);
    listeners.forEach((ownlistener) => {
      if (ownlistener === listener) {
        listeners.delete(listener);
      }
    });
  }
}
