import React from 'react';

import { AppContext } from '../lib/Types';
import { ContextConnector } from '../../../Ozone/ContextWrapper';
import TodoList from './TodoList';
import { TodoOperations } from '../lib/TodoOperations';

interface IProps {
    name: string;
    onNameChanged: (name: string) => void;
}

export class App extends React.Component<IProps, {}> {

    private onTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onNameChanged(event.target.value);
    }

    public render() {
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
    ( contextObject ): IProps => {
        return {
            name: contextObject.store.get(TodoOperations.getName, []),
            onNameChanged: (name: string) => contextObject.store.set(TodoOperations.setName, [name]),
        };
    }
);
