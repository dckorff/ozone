import React from 'react';
import ReactDOM from 'react-dom';

import { ContextWrapper } from '../../../ozone/ContextWrapper';
import AppContainer from './AppContainer';
import { State } from '../../shared/lib/State';
import { Store } from '../../../ozone/Store';

class DemoApp extends React.Component<any, any> {

    private store: Store<State>;

    constructor(props: any) {
        super(props);
        this.store = new Store(new State());
    }

    public render() {
        return (
            <ContextWrapper
                contextObject={{store: this.store}}
                onChange={this.store.onStateChanged}
            >
                <AppContainer />
            </ContextWrapper>
        );
    }

}


ReactDOM.render(<DemoApp/>, document.getElementById('app'));