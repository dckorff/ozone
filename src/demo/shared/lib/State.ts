export class State {
    public name = 'My Todo List';
    todos: Array<Todo> = [];
}

export class Todo {
    title: string;
    done: boolean;
}
