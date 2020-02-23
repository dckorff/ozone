import React from 'react';

import { StateChangedAction, UnsubscribeAction } from './Types';

interface IProps<TState, TContext> {
    contextObject: TContext;
    onChange: ( onChange: StateChangedAction<TState> ) => () => void;
}

interface IState { }

type ContextType = {value: any};

const OzoneContext = React.createContext<ContextType>({value: {}});;

export class ContextWrapper<TState, TContext> extends React.Component<IProps<TState, TContext>, IState> {

    // public static OzoneContext = React.createContext<ContextType>({value: {}});;

    private unsubscribe: UnsubscribeAction;
    private contextValue: {value: TContext};

    constructor(props: any) {
        super(props);
        this.contextValue = { value: this.props.contextObject };
    }

    public componentDidMount = () => {

        // This needs a typed object
        this.unsubscribe = this.props.onChange(
            (state, previousState) => {
                console.log('wrapper-onChange', state, previousState);
                // Creating an new object here is what triggers the React context to rerender connected components
                this.contextValue = {value: this.props.contextObject};
            }
        );
    }

    public componentWillUnmount = () => {
        this.unsubscribe();
    }

    public render = () => {
        console.log('ContextWrapper-render');
        return (
            <OzoneContext.Provider
                value={{value: this.props.contextObject}}
            >
                {this.props.children}
            </OzoneContext.Provider>
        );
    }

}


// type GetComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P> ? P : never

// export function ContextConnector<TReactComponent extends typeof React.Component>(
export function ContextConnector<TContext> (
    ReactComponentToWrap: typeof React.Component,
    // TODO: how to make this not be 'any'?
    mapper: (contextObject: TContext) => Partial<React.ComponentProps<typeof ReactComponentToWrap>>
): typeof React.Component {

    console.log('ContextConnector', ReactComponentToWrap);

    const WrappedComponent = class extends React.Component<any, any> {

        // TODO: this isn't really working right
        // private getProps = (): Partial<React.ComponentProps<typeof ReactComponentToWrap>> => {
        private getProps = (): React.ComponentProps<typeof ReactComponentToWrap> => {
        // private getProps = (): Partial<React.ComponentProps<typeof ReactComponentToWrap>> => {
        // private getProps = (): Partial<React.ComponentProps<TReactComponent>> => {
        // private getProps = (): Partial<GetComponentProps<typeof ReactComponentToWrap>> => {
        // private getProps = () => {
        // private getProps = (): (typeof ReactComponentToWrap)['props'] => {
            // let a: React.ComponentProps<TReactComponent> = {

            // }
            console.log('wrapped context')
            console.log(this.context.value);
            return mapper(this.context.value);
        }

        public render() {
            console.log('WrappedComponent-render')
            return <ReactComponentToWrap {...this.getProps()} />;
        }

    }

    // WrappedComponent.contextType = ContextWrapper.OzoneContext;
    WrappedComponent.contextType = OzoneContext;

    return WrappedComponent;
}
