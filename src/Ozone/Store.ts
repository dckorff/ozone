import { BaseMutaionFunction, MutationFunction, Mutation, RemoveFirstFromTuple, UnsubscribeAction } from './Types';

// type BaseMutaionFunction<TState> = (state: Readonly<TState>, ...args: any) => void;
// type MutationFunction<TState, TFn extends BaseMutaionFunction<TState>> = (fn: TFn, args: RemoveFirstFromTuple<Parameters<TFn>>) => void;

// class Mutation<TState, TMutationFunction<TState>> {
//     public mutationFunction: MutationFunction<TState, TMutationFunction<TState>>;
//     public args:
// }

export class Store<TState> {

    private _state: TState;
    private _previousState: TState;
    // private _onStateChangedListeners: Array<(state: TState, previousState: TState) => void> = [];
    private _onStateChangedListeners: Array<(state: Store<TState>, previousState: Store<TState>) => void> = [];
    // private _mutationQueue: Array<BaseMutaionFunction<TState>>;
    // private _mutationQueue: Array<BaseMutaionFunction<TState>>;
    // private _mutationQueue: Array<MutationFunction<TState, BaseMutaionFunction<TState>>>;
    // private _mutationQueue: Array<MutationFunction<TState, TFn extends BaseMutaionFunction<TState>>>;
    // private _mutationQueue: Array<MutationFunction<TState, BaseMutaionFunction<TState>>>;
    private _mutationQueue: Array<Mutation<TState, BaseMutaionFunction<TState>>> = [];
    private _processingMutation = false;

    constructor(initialState: TState) {
        this._state = initialState;
    }

    private _getState(): TState {
        return this._state;
    }

    private _setState(state: TState) {
        this._previousState = this._state;
        this._state = state;
        // TODO: Put this back in? - make sure it's deep freeze
        // Object.freeze(this._state);
        this._stateChanged(this._state, this._previousState);
    }

    // TODO: Apply asynchronous functions in series?
    // TODO: Do something about error handling - if an error occurs in a listener
    // TODO: Pass an instance of a state manager?
    private _stateChanged(state: TState, previousState: TState) {
        // this._onStateChangedListeners.forEach( fn => fn(state, previousState));
        this._onStateChangedListeners.forEach( fn =>

            // A new store or this?
            // fn(new Store<TState>(state), new Store<TState>(previousState))
            fn(this, new Store<TState>(previousState))
        );
    }

    // TODO: Add a priority here?
    // public onStateChanged(fn: (state: TState, previousState: TState) => void) : UnsubscribeAction {
    public onStateChanged = (fn: (state: Store<TState>, previousState: Store<TState>) => void) : UnsubscribeAction => {
        this._onStateChangedListeners.push(fn);
        return () => this._onStateChangedListeners = this._onStateChangedListeners.filter(thisFunction => thisFunction != fn);
    }

    // TODO: What if instead of the State being passed into the mutation function, you are forced to pass
    //   a projection function instead so your mutation functions is forced to run on a subset of the state?
    //   the problem is, how to you keep the state itself immutable if you're only changing part of it?
    //   the other problem is how do you make a new state if the state is large and you're changing something
    //   deeply nested within it.
    //   You could compose mutation functions together...
    public applyMutation<TFn extends BaseMutaionFunction<TState>>(
        fn: TFn,
        args: RemoveFirstFromTuple<Parameters<TFn>>
    ): void {
        // let thing = new Mutation<TState, TFn>(fn, args);
        this._mutationQueue.push(
            new Mutation<TState, TFn>(fn, args)
        );
        this._processMutationQueue();
    }


    private _applyMutation<TFn extends BaseMutaionFunction<TState>>(mutation: Mutation<TState, TFn>) {
        this._previousState = this._getState();
        this._setState(mutation.fn(this._getState(), ...mutation.args));
    }

    // We put the mutations into a queue in order to make sure that mutaions are atomic
    // this garuntees that the mutations and the listeners that are triggered by it all
    // finish before the next mutation occurs
    private _processMutationQueue() {
        if (this._processingMutation || this._mutationQueue.length === 0) {
            return;
        }

        this._processingMutation = true;

        this._applyMutation(this._mutationQueue.shift());

        this._processingMutation = false;
        this._processMutationQueue();
    }

    // Should projections have paramegers other than the state?
    // if no it would prevent business logic from getting into the projector functions
    // if yes, then we can provide keys to get a value from a dictionary or nested dictionary
    public applyProjection<TFn extends (state: Readonly<TState>, ...args: any) => any>(
        fn: TFn,
        args: RemoveFirstFromTuple<Parameters<TFn>> // todo how to make this [] by default so you don't always need args
    ): ReturnType<TFn> {
        return fn(this._getState(), ...args);
    }

    public set = this.applyMutation;
    public get = this.applyProjection;

}
