import React from 'react';

// import { AppManager } from '../lib/AppManager';
import { AppContext } from '../lib/Types';
import { ContextConnector } from '../../Ozone/ContextWrapper';
import { TodoComponent } from './TodoComponent';
import { Todo } from '../lib/State';

interface IProps {
    name: string;
    onNameChanged: (name: string) => void;
    todos: Array<Todo>
}

export class App extends React.Component<IProps, {}> {


    private doThings = (): JSX.Element => {
        // console.log(this.context);
        // console.log(this.context.value.appManager.getName());
        // this.context.value.appManager.setName('asdf');
        return <div>hello-doThings</div>;
    }

    private onTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        this.props.onNameChanged(event.target.value);
    }

    public render() {
        console.log('App render');
        return (
            <div>
                {
                    this.doThings()
                }
                <input
                    type='text'
                    onChange={this.onTextChanged}
                    value={this.props.name}
                ></input>
                {
                    this.props.todos.map( todo => {
                        // <TodoComponent
                        //     onDoneChanged={ (value: boolean) => this.props.onDoneChanged(todo.id, value) }
                        // ></TodoComponent>
                    })
                }
            </div>
        );
    }

}

export default ContextConnector<AppContext>(App,
    // (contextObject: {appManager: AppManager} ): Partial<IProps> => {
    ( contextObject ): Partial<IProps> => {
        console.log('ContextConnector-mapper');
        console.log(contextObject);
        console.log('contextObject.appManager.getName()');
        console.log(contextObject.appManager.getName());
        return {
            name: contextObject.appManager.getName(),
            todos: contextObject.appManager.todoManager.getTodos(),
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