import { State, Todo } from './State';

// type Mutator<TState> = (state: Readonly<TState>) => TState;
// is there a way to force these mutation functions to be pure? or to at least not use 'this'?
export class StateMutations {

    public static setName(state: Readonly<State>, name: string) {
        return {...state, name: name};
    }

}