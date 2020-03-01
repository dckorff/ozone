import React from 'react';
import ReactDOM from 'react-dom';

import { ContextWrapper, ContextConnector } from '../../../Ozone/ContextWrapper';
// import { App } from './App';
import App from './App';
import { State } from '../lib/State';
import { Store } from '../../../ozone/Store';

class DemoApp extends React.Component<any, any> {

    private store: Store<State>;

    constructor(props: any) {
        super(props);
        this.store = new Store(new State());
    }

    public render() {
        return (
            // <ReactStorm store={this.app.getStore()}>
            // <AppManagerContextWrapper
            <ContextWrapper
                contextObject={{store: this.store}}
                onChange={this.store.onStateChanged}
            >
                <App />
            </ContextWrapper>
            // </AppManagerContextWrapper>
        );
    }

}


ReactDOM.render(<DemoApp/>, document.getElementById('app'));