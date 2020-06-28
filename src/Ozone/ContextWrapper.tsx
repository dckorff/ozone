import * as React from 'react';
import { isEqual} from 'lodash';

import { StateChangedAction, UnsubscribeAction } from './Types';

interface IProps<TState, TContext> {
    contextObject: TContext;
    onChange: ( onChange: StateChangedAction<TState> ) => () => void;
}

type ContextType = {value: any};

interface IState<TContext> {
    value: TContext;
}

const OzoneContext = React.createContext<ContextType>({value: {}});;

export class ContextWrapper<TState, TContext> extends React.Component<IProps<TState, TContext>, IState<TContext>> {

    private unsubscribe: UnsubscribeAction;

    constructor(props: any) {
        super(props);
        this.state = {
            value: this.props.contextObject
        };
    }

    // TODO: Should the onChange be updated if componentDidUpdate?
    // TODO: Should onChange be an array of functions?
    public componentDidMount = () => {

        // This needs a typed object
        this.unsubscribe = this.props.onChange(
            (state, previousState) => {
                // Creating an new object here is what triggers the React context to rerender connected components
                this.setState({value: this.state.value});
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


export function ContextConnector<TContext> (
    ReactComponentToWrap: typeof React.Component,
    mapper: (contextObject: TContext) => Partial<React.ComponentProps<typeof ReactComponentToWrap>>
): typeof React.Component {

    class WrappedWrapper extends React.Component<any, any> {

        // TODO: Type this
        public shouldComponentUpdate(nextProps: any, nextState: any){
            return !(isEqual(this.props, nextProps))
        }

        public render() {
            return <ReactComponentToWrap {...this.props} />;;
        }
    }

    // TODO: fix these any's
    class WrappedComponent extends React.Component<any, any> {

        // TODO: this isn't really working right
        // private getProps = (): Partial<React.ComponentProps<typeof ReactComponentToWrap>> => {
        private getProps = (): React.ComponentProps<typeof ReactComponentToWrap> => {
            return mapper(this.context.value);
        }

        public render() {
            return <WrappedWrapper {...this.getProps()} />;
        }

    }

    WrappedComponent.contextType = OzoneContext;

    return WrappedComponent;

}
