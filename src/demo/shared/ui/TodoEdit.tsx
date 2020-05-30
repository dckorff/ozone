import React from 'react';

import { Todo } from '../lib/State';

interface IProps {
    todo: Todo;
    onDoneChanged: (value: boolean) => void;
    onNameChanged: (name: string) => void;
    onTodoDelete: () => void;
}

export class TodoEdit extends React.Component<IProps, {}> {

    private onTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onNameChanged(event.target.value);
    }

    private onChangeDone = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onDoneChanged(event.target.checked);
    }

    private onDelete = () => {
        this.props.onTodoDelete();
    }

    public render() {
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
                <button onClick={this.onDelete}>X</button>
            </div>
        );
    }

}
