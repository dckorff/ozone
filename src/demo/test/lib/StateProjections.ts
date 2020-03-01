import { State, Todo } from './State';

export class StateProjections {

    public static getName(state: State): string {
        return state.name;
    }

    public static getTodos(state: State): Array<Todo> {
        return state.todos;
    }

    public static getTodo(state: State, todoId: number): Todo {
        return state.todos.find( (thisTodo: Todo) => thisTodo.id === todoId );
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
