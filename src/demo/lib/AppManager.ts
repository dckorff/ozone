import { State, Todo } from './State';
import { StateMutations } from './StateMutations'
import { StateProjections } from './StateProjections'
import { StateManager } from '../../Ozone/StateManager'
import { TodoMutations } from './TodoMutations';
import { TodoProjections } from './TodoProjections';

type StateServiceFunctions = Extract<(...args: any) => any, StateMutations>;

export class AppManager {

    private _stateManager: StateManager<State>;

    public todoManager: TodoManager;

    constructor() {
        this._stateManager = new StateManager<State>(new State());
        this._stateManager.onStateChanged(this._stateChanged);
        this.todoManager = new TodoManager(this._stateManager);
    }

    // private _stateChanged = (state: State, previousState: State) => {
    private _stateChanged = (state: StateManager<State>, previousState: StateManager<State>) => {
        this._onStateChangedListeners.forEach( fn => fn(state, previousState));
    }

    // TODO: Add a priority here?
    // Return's function to unsubscribe
    private _onStateChangedListeners: Array<(state: StateManager<State>, previousState: StateManager<State>) => void> = [];
    public onStateChanged = (fn: (state: StateManager<State>, previousState: StateManager<State>) => void) : () => void => {
        this._onStateChangedListeners.push(fn);
        return () => this._onStateChangedListeners.filter(thisFunction => thisFunction != fn);
    }

    // Use a projection function here instead?
    public getName = (): string => {
        return this._stateManager.applyProjection(StateProjections.getName, []);
    }

    public setName = (name: string) => {
        this._stateManager.applyMutation(StateMutations.setName, [name]);
    }

    // Put functions like this in a TodoManager

}

class TodoManager {

    private _stateManager: StateManager<State>;

    constructor(stateManager: StateManager<State>){
        this._stateManager = stateManager;
    }

    public getTodos = (): Array<Todo> => {
        console.log('getTodos', this._stateManager.applyProjection(TodoProjections.getTodos, []));
        return this._stateManager.applyProjection(TodoProjections.getTodos, []);
    }

    public setTodoDone = (todoId: number, done: boolean) => {
        this._stateManager.applyMutation( TodoMutations.setTodoDone, [todoId, done] );
    }

    public setTodoTitle = (todoId: number, title: string) => {
        this._stateManager.applyMutation( TodoMutations.setTodoTitle, [todoId, title] );
    }

    // We use manager classes to combine business logic or complex projection/mutations combinations
    // This logic could also be in the mutation itself, like TodoMutations.addTodoByValues()
    public addTodo = (title: string, done: boolean) => {
        // this could be done within the Mutation function, but should it be?
        let id = this._stateManager.applyProjection(StateProjections.getNextTodoId, []);
        const newTodo: Todo = {
            id: this._stateManager.applyProjection(StateProjections.getNextTodoId, []),
            title,
            done
        };
        this._stateManager.applyMutation(TodoMutations.addTodo, [newTodo]);
    }

    public removeTodo = (todoId: number) => {
        this._stateManager.applyMutation(TodoMutations.removeTodo, [todoId])
    }
}
