import React from 'react';
import ReactDOM from 'react-dom';

import { ContextWrapper, ContextConnector } from '../../Ozone/ContextWrapper';
// import { App } from './App';
import App from './App';
import { AppManager } from '../lib/AppManager';
import { State } from '../lib/State';

// const AppManagerContextWrapper: React.Component<ContextWrapper<AppManager>> = ContextWrapper;
// const AppManagerContextWrapper: ContextWrapper<State, AppManager> = ContextWrapper;
// const AppManagerContextWrapper: ContextWrapper<any, any> = ContextWrapper;
// const AppManagerContextWrapper = ContextWrapper;



// Create a type for the context connector?
// export const AppContextConnector = ContextConnector<AppCon>();

class DemoApp extends React.Component<any, any> {

    private appManager: AppManager;

    constructor(props: any) {
        super(props);
        this.appManager = new AppManager();
    }

    public render() {
        return (
            // <ReactStorm store={this.app.getStore()}>
            // <AppManagerContextWrapper
            <ContextWrapper
                contextObject={{appManager: this.appManager}}
                onChange={this.appManager.onStateChanged}
            >
                <App />
            </ContextWrapper>
            // </AppManagerContextWrapper>
        );
    }

}


ReactDOM.render(<DemoApp/>, document.getElementById('app'));