import 'mocha';
import * as chai from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import * as sinon from 'sinon';
const jsdom = require("mocha-jsdom");
globalThis.document = jsdom({
    url: "http://localhost:3000/"
});


import { ContextWrapper, ContextConnector } from '../ContextWrapper';
import { Store } from '../Store';
import { expect } from 'chai';

let rootContainer: HTMLDivElement;
let store: Store<State>;
const initialState = {value: 'hello'};

class State {
    value: string;
}

beforeEach(() => {
    rootContainer = document.createElement("div");
    document.body.appendChild(rootContainer);

    store = new Store<State>(initialState);
});

afterEach(() => {
    document.body.removeChild(rootContainer);
    rootContainer = null;
});


class AppContext {
    store: Store<State>
}

class ChildComponentProps {
    label: string
}

class ChildComponent extends React.Component<ChildComponentProps, {}> {
    public shouldComponentUpdate(nextProps: any, nextState: any){
        return true;
    }
    public render(){
        return <span className='test-label'>{this.props.label}</span>;
    }
}

const ConnectedComponent = ContextConnector<AppContext>(
    ChildComponent,
    ( contextObject ): ChildComponentProps => {
        return {
            label: contextObject.store.get((state) => (state.value), [])
        };
    }
);

function getContextWrappedComponent() {
    return (
        <ContextWrapper
            contextObject={{store: store}}
            onChange={store.onStateChanged}
        >
            <ConnectedComponent></ConnectedComponent>
        </ContextWrapper>
    );
}

describe('ContextWrapper Tests', function() {

    it('The initial state should equal get state', function() {

        act(() => {
            ReactDOM.render(
                getContextWrappedComponent(),
                rootContainer
            );
        });

        const label = rootContainer.querySelector("span.test-label");

        chai.expect(label.textContent).to.equal(initialState.value);

    });

    it('Updating state value should cause a wrapped component to rerender with new value', function(){

        act(() => {
            ReactDOM.render(
                getContextWrappedComponent(),
                rootContainer
            );
        });

        const label1 = rootContainer.querySelector("span.test-label");

        chai.expect(label1.textContent).to.equal(initialState.value);

        store.set(
            (state) => {
                return {value: 'goodbye'};
            },
            []
        );

        const label2 = rootContainer.querySelector("span.test-label");

        chai.expect(label2.textContent).to.equal('goodbye');

    });

    it('Updating the state without changing any values should not cause a wrapped component to rerender', function(){

        const childComponentSpy = sinon.spy(ChildComponent.prototype, 'render');

        act(() => {
            ReactDOM.render(
                getContextWrappedComponent(),
                rootContainer
            );
        });

        const label1 = rootContainer.querySelector("span.test-label");

        chai.expect(label1.textContent).to.equal(initialState.value);
        chai.expect(childComponentSpy.calledOnce).to.be.true;

        store.set(
            (state) => {
                return initialState;
            },
            []
        );

        chai.expect(childComponentSpy.calledOnce).to.be.true;

    });

    it('Props passed in from the parent component are merged into the connected component', function(){
        chai.expect(true).to.equal(false);
    });


});