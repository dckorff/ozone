import { Store } from '../../../Ozone/Store'
import { State, Todo } from './State';
import { StateMutations } from './StateMutations'
import { StateProjections } from './StateProjections'
import { TodoMutations } from './TodoMutations';
import { TodoProjections } from './TodoProjections';

export class AppManager {

    public todoManager: TodoManager;
    private _stateManager: Store<State>;

    constructor() {
        this._stateManager = new Store<State>(new State());
        this._stateManager.onStateChanged(this._stateChanged);
        this.todoManager = new TodoManager(this._stateManager);
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
        return this._stateManager.applyProjection(StateProjections.getName, []);
    }

    public setName = (name: string) => {
        this._stateManager.applyMutation(StateMutations.setName, [name]);
    }

}

class TodoManager {

    private _stateManager: Store<State>;

    constructor(stateManager: Store<State>){
        this._stateManager = stateManager;
    }

    public getTodos = (): Array<Todo> => {
        return this._stateManager.applyProjection(TodoProjections.getTodos, []);
    }

    public setTodoDone = (todoId: number, done: boolean) => {
        this._stateManager.applyMutation( TodoMutations.setTodoDone, [todoId, done] );
    }

    public setTodoTitle = (todoId: number, title: string) => {
        this._stateManager.applyMutation( TodoMutations.setTodoTitle, [todoId, title] );
    }

    public addTodo = (title: string, done: boolean) => {
        const newTodo: Todo = {
            id: this._stateManager.applyProjection(TodoProjections.getNextTodoId, []),
            title,
            done
        };
        this._stateManager.applyMutation(TodoMutations.addTodo, [newTodo]);
    }

    public removeTodo = (todoId: number) => {
        this._stateManager.applyMutation(TodoMutations.removeTodo, [todoId])
    }

}
