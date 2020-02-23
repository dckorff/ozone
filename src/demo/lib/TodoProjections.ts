import { State, Todo } from './State';

export class TodoProjections {

    public static getTodos(state: Readonly<State>): Array<Todo> {
        return state.todos;
    }

}