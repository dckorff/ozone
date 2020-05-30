import { Store } from '../../../ozone/Store'
import { State, Todo } from '../../shared/lib/State';
import { TodoOperations } from '../../shared/lib/TodoOperations'

export class TodoManager {

    private _store: Store<State>;

    constructor() {
        this._store = new Store<State>(new State());
        this._store.onStateChanged(this._stateChanged);
    }

    private _stateChanged = (state: Store<State>, previousState: Store<State>) => {
        this._onStateChangedListeners.forEach( fn => fn(state, previousState));
    }

    private _onStateChangedListeners: Array<(state: Store<State>, previousState: Store<State>) => void> = [];
    public onStateChanged = (fn: (state: Store<State>, previousState: Store<State>) => void) : () => void => {
        this._onStateChangedListeners.push(fn);
        return () => this._onStateChangedListeners.filter(thisFunction => thisFunction != fn);
    }

    public getName = (): string => {
        return this._store.get(TodoOperations.getName, []);
    }

    public setName = (name: string) => {
        this._store.set(TodoOperations.setName, [name]);
    }

    public getTodos = (): Array<Todo> => {
        return this._store.get(TodoOperations.getTodos, []);
    }

    public setTodoDone = (todoIndex: number, done: boolean) => {
        this._store.set( TodoOperations.setTodoDone, [todoIndex, done] );
    }

    public setTodoTitle = (todoId: number, title: string) => {
        this._store.set( TodoOperations.setTodoTitle, [todoId, title] );
    }

    public addTodo = (title: string, done: boolean) => {
        this._store.set(TodoOperations.addTodo, [
            {
                title,
                done
            }
        ]);
    }

    public removeTodo = (todoId: number) => {
        this._store.set(TodoOperations.removeTodo, [todoId])
    }

}
