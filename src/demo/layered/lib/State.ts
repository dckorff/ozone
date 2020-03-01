export class State {

    public name = 'My Todo List';

    todos: Array<Todo> = [];

}

export class Todo {
    id: number;
    title: string;
    done: boolean;
}