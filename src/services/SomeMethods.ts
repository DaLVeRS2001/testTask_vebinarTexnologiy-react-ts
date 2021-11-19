import {TodoItem} from "../types/reducers/todo";

export function generateId(): string {
    return `${Date.now().toString(36)}-${Math.floor(
        Math.random() * 1e16,
    ).toString(36)}`;
}

export const sortItems = (items: TodoItem[]): TodoItem[] =>
    items?.slice().sort((a, b) => {
        if (a.done && !b.done) {
            return 1;
        }
        if (!a.done && b.done) {
            return -1;
        }
        return 0;
    });
