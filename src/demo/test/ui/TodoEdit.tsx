import React from 'react';

import { AppManager } from '../lib/AppManager';
import { ContextConnector } from '../../../Ozone/ContextWrapper';
import { Todo } from '../lib/State';

interface IProps {
    todo: Todo;
    onDoneChanged: (value: boolean) => void;
    onNameChanged: (name: string) => void;
}

export class TodoEdit extends React.Component<IProps, {}> {

    private onTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        this.props.onNameChanged(event.target.value);
    }

    private onChangeDone = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('event.target.checked');
        console.log(event.target.checked);
        this.props.onDoneChanged(event.target.checked);
    }

    public render() {
        console.log('todo-render', this);
        return (
            <div>
                <input
                    type='text'
                    onChange={this.onTextChanged}
                    value={this.props.todo.title}
                ></input>
                <input
                    type='checkbox'
                    onChange={this.onChangeDone}
                    checked={this.props.todo.done}
                />
            </div>
        );
    }

}
