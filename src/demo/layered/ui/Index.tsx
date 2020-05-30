import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './AppContainer';
import { ContextWrapper } from '../../../Ozone/ContextWrapper';
import { TodoManager } from '../lib/TodoManager';


class DemoApp extends React.Component<any, any> {

    private todoManager: TodoManager;

    constructor(props: any) {
        super(props);
        this.todoManager = new TodoManager();
    }

    public render() {
        return (
            <ContextWrapper
                contextObject={{todoManager: this.todoManager}}
                onChange={this.todoManager.onStateChanged}
            >
                <AppContainer />
            </ContextWrapper>
        );
    }

}

ReactDOM.render(<DemoApp/>, document.getElementById('app'));