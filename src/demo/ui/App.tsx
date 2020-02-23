import React from 'react';

// import { AppManager } from '../lib/AppManager';
import { AppContext } from '../lib/Types';
import { ContextConnector } from '../../Ozone/ContextWrapper';
import TodoList from './TodoList';
import { Todo } from '../lib/State';

interface IProps {
    name: string;
    onNameChanged: (name: string) => void;
    todos: Array<Todo>
}

export class App extends React.Component<IProps, {}> {

    private onTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        this.props.onNameChanged(event.target.value);
    }

    public render() {
        console.log('App render');
        return (
            <div className="container m-5">
                <input
                    type='text'
                    onChange={this.onTextChanged}
                    value={this.props.name}
                ></input>
                <hr />
                <TodoList />
            </div>
        );
    }

}

export default ContextConnector<AppContext>(App,
    // (contextObject: {appManager: AppManager} ): Partial<IProps> => {
    ( contextObject ): Partial<IProps> => {
        console.log('ContextConnector-mapper-APP');
        // console.log(contextObject);
        // console.log('contextObject.appManager.getName()');
        // console.log(contextObject.appManager.getName());
        return {
            name: contextObject.appManager.getName(),
            // todos: contextObject.appManager.todoManager.getTodos(),
            // onDoneChanged: contextObject.appManager.todoManager.setDone,
            onNameChanged: contextObject.appManager.setName,
            // asdf: contextObject.appManager.getName(),
            // asdfff: contextObject.appManager.asdf()
        };
    }
);


// export default ConnectedApp = ContextConnector(
//     (contextObject) => {
//         name: contextObject.getName(),
//         onNameChanged: contextObject.setName
//     }
//   )(App);