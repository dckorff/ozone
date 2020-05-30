import { State, Todo } from './State';

export class TodoOperations {

    public static setName(state: Readonly<State>, name: string) {
        return {...state, name: name};
    }

    public static getName(state: State): string {
        return state.name;
    }

    public static getTodos(state: Readonly<State>): Array<Todo> {
        return state.todos;
    }

    public static addTodo(state: Readonly<State>, todo: Todo): State {
        return {...state, todos: [...state.todos, todo]};
    }

    public static setTodoDone(state: Readonly<State>, todoIndex: number, done: boolean) {
        return {
            ...state,
            todos: state.todos.map( (todo, index) => {
                return index === todoIndex
                    ? {...todo, done}
                    : todo;
            } )
        };
    }

    public static setTodoTitle(state: Readonly<State>, todoIndex: number, title: string) {
        return {
            ...state,
            todos: state.todos.map( (todo, index) => {
                return index === todoIndex
                    ? {...todo, title}
                    : todo;
            } )
        };
    }

    public static removeTodo(state: Readonly<State>, todoIndex: number): State {
        state.todos.splice(todoIndex, 1);
        return {
            ...state,
            todos: [ ...state.todos]
        };
    }

}
