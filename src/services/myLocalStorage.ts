import { ILocalStorage } from "../types/services";

const myLocalStorage: Readonly<ILocalStorage> = {
  keys: {
    root: "todoListState",
  },
  setCurrentState(state) {
    localStorage.setItem(this.keys.root, JSON.stringify(state));
  },
  getCurrentState() {
    const state = localStorage.getItem(this.keys.root);
    return JSON.parse(<string>state);
  },
  getTodoItems() {
    const state = localStorage.getItem(this.keys.root);
    return JSON.parse(<string>state)?.todoItems;
  },
  removeCurrentItems() {
    localStorage.removeItem(this.keys.root);
  },
};

export default myLocalStorage;
