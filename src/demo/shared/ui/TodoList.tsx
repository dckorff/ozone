import React from 'react';

import { Todo } from '../lib/State';
import { TodoEdit } from './TodoEdit';

export interface IProps {
    addTodo?: (title: string, done: boolean) => void;
    setDone: (todoIndex: number, done: boolean) => void;
    removeTodo?: (todoId: number) => void;
    onChangedTitle?: (todoIndex: number, name: string) => void;
    todos?: Array<Todo>;
}

interface IState {
    newTodoName: string;
}

export class TodoList extends React.Component<IProps, IState> {

    public state = {
        newTodoName: ''
    };

    private onAddNewTodo = () => {
        this.props.addTodo(this.state.newTodoName, false);
        this.setState({newTodoName: ''});
    }

    private onNewTodoTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({newTodoName: event.target.value});
    }

    public render() {
        return (
            <div>
                <input
                    type='text'
                    onChange={this.onNewTodoTextChanged}
                    value={this.state.newTodoName}
                ></input>
                <button onClick={this.onAddNewTodo}>+</button>
                {
                    this.props.todos.map( (todo, index) =>
                        <TodoEdit
                            key={index}
                            onDoneChanged={ (done) => this.props.setDone(index, done) }
                            onNameChanged={ (title) => this.props.onChangedTitle(index, title) }
                            onTodoDelete={ () => this.props.removeTodo(index) }
                            todo={todo}
                        />
                    )
                }
            </div>
        );
    }

}
