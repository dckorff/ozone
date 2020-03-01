import { State, Todo } from './State';

export class TodoProjections {

    public static getTodos(state: Readonly<State>): Array<Todo> {
        return state.todos;
    }

    public static getNextTodoId(state: State): number {
        return state.todos.length > 0
            ? state.todos.reduce(
                (accumulatorTodo: Todo, currentTodo: Todo) => {
                    return currentTodo.id > accumulatorTodo.id
                    ?  currentTodo
                        : accumulatorTodo;
                    }, state.todos[0]
                ).id + 1
            : 1;
    }

}
