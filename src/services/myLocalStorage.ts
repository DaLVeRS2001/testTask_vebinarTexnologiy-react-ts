import {ITodoState} from "../types/reducers/todo";

const myLocalStorage: Readonly<ILocalStorage> = {
    keys: {
        root: 'todoListState'
    },
    setCurrentState(state){
        localStorage.setItem(this.keys.root, JSON.stringify(state))
    },
    getCurrentState(){
        const state =  localStorage.getItem(this.keys.root)
        return JSON.parse(<string>state)
    },
    removeCurrentItems(){
        localStorage.removeItem(this.keys.root)
    }
}

export interface ILocalStorage {
   readonly keys: {
        root: 'todoListState'
    }
    setCurrentState: (state: ITodoState) => void,
    getCurrentState: () => string | null
    removeCurrentItems: () => void
}

export default myLocalStorage