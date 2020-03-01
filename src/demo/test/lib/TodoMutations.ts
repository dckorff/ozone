import { State, Todo } from './State';
import { TodoProjections } from './TodoProjections';

export class TodoMutations {

    public static addTodo(state: Readonly<State>, todo: Todo): State {
        return {...state, todos: [...state.todos, todo]};
    }

    public static addTodoByValues(state: Readonly<State>, title: string, done: boolean): State {
        const todo: Todo = {
            id: state.todos.reduce(
                    (accumulatorTodo: Todo, currentTodo: Todo) => {
                        return currentTodo.id > accumulatorTodo.id
                            ?  currentTodo
                            : accumulatorTodo;
                    }
                ).id + 1,
            title,
            done
        }
        return {...state, todos: [...state.todos, todo]};
    }

    public static removeTodo(state: Readonly<State>, todoIdToDelete: number): State {
        return {
            ...state,
            todos: state.todos.filter( thisTodo => thisTodo.id != todoIdToDelete )
        };
    }

    public static setTodoDone(state: Readonly<State>, todoId: number, done: boolean) {
        return {
            ...state,
            todos: state.todos.map( todo => {
                return todo.id === todoId
                    ? {...todo, done}
                    : todo;
            } )
        };
    }

    public static setTodoTitle(state: Readonly<State>, todoId: number, title: string) {
        return {
            ...state,
            todos: state.todos.map( todo => {
                return todo.id === todoId
                    ? {...todo, title}
                    : todo;
            } )
        };
    }


}