// Credit: https://stackoverflow.com/questions/54607400/typescript-remove-entries-from-tuple-type
export type RemoveFirstFromTuple<T extends any[]> =
  T['length'] extends 0 // if T.length == 0
    ? undefined
    : (
        ((...b: T) => void) extends (a: any, ...b: infer I) => void
            ? I
            : []
        );

export type StateChangedAction<TState> = (state: TState, previousState: TState) => void;

export type BaseMutaionFunction<TState> = (state: Readonly<TState>, ...args: any) => TState;

export type MutationFunction<TState, TFn extends BaseMutaionFunction<TState>> = (fn: TFn, args: RemoveFirstFromTuple<Parameters<TFn>>) => TState;

export class Mutation<TState, TFn extends BaseMutaionFunction<TState>> {

    constructor(fn: TFn, args: RemoveFirstFromTuple<Parameters<TFn>>){
        this.fn = fn;
        this.args = args;
    }

    public fn: TFn;

    public args: RemoveFirstFromTuple<Parameters<TFn>>;

}

export type UnsubscribeAction = () => void;
