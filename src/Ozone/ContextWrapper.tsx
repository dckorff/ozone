import * as React from 'react';

import { StateChangedAction, UnsubscribeAction } from './Types';

interface IProps<TState, TContext> {
    contextObject: TContext;
    onChange: ( onChange: StateChangedAction<TState> ) => () => void;
}

type ContextType = {value: any};

interface IState<TContext> {
    value: TContext;
    // contextObject: TContext;
}

console.log('React', React);
const OzoneContext = React.createContext<ContextType>({value: {}});;

export class ContextWrapper<TState, TContext> extends React.Component<IProps<TState, TContext>, IState<TContext>> {

    private unsubscribe: UnsubscribeAction;

    constructor(props: any) {
        super(props);
        this.state = {
            value: this.props.contextObject
        };
    }

    public componentDidMount = () => {

        // This needs a typed object
        this.unsubscribe = this.props.onChange(
            (state, previousState) => {
                // Creating an new object here is what triggers the React context to rerender connected components
                // this.contextValue = {value: this.props.contextObject};
                this.setState({value: this.state.value})
            }
        );
    }

    public componentWillUnmount = () => {
        this.unsubscribe();
    }

    public render = () => {
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

    const WrappedComponent = class extends React.Component<any, any> {

        // TODO: this isn't really working right
        // private getProps = (): Partial<React.ComponentProps<typeof ReactComponentToWrap>> => {
        private getProps = (): React.ComponentProps<typeof ReactComponentToWrap> => {
            return mapper(this.context.value);
        }

        public render() {
            return <ReactComponentToWrap {...this.getProps()} />;
        }

    }

    WrappedComponent.contextType = OzoneContext;

    return WrappedComponent;
}
