import React from 'react';

import { AppContext } from '../lib/Types';
import { AppManager } from '../lib/AppManager';
import { ContextConnector } from '../../../Ozone/ContextWrapper';
import { Todo } from '../lib/State';
import { TodoEdit } from './TodoEdit';

interface IProps {
    // todo: Todo;
    // onDoneChanged: (value: boolean) => void;
    // onNameChanged: (name: string) => void;
    // TODO: remove these question marks, the problem is that these props are provided by the connector,
    //   and TS complains when the component is used like <TodoList /> without and props
    addTodo?: (title: string, done: boolean) => void;
    removeTodo?: (todoId: number) => void;
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
        console.log('ok1')
        this.setState({newTodoName: ''}, () => console.log('ok3'));
        console.log('ok2')
    }

    private onDoneChanged = (todoId: number, value: boolean) => {
        // this.props.
    };

    private onNameChanged = (todoId: number, name: string) => {

    };

    private onTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({newTodoName: event.target.value});
    }

    public render() {
        return (
            <div>
                <input
                    type='text'
                    onChange={this.onTextChanged}
                    value={this.state.newTodoName}
                ></input>
                <button onClick={this.onAddNewTodo}>+</button>
                {
                    this.props.todos.map( todo =>
                        <TodoEdit
                            key={todo.id}
                            onDoneChanged={ (done) => this.onDoneChanged(todo.id, done) }
                            onNameChanged={ (name) => this.onNameChanged(todo.id, name) }
                            todo={todo}
                        />
                    )
                }
            </div>
        );
    }

}


export default ContextConnector<AppContext>(TodoList,
    // (contextObject: {appManager: AppManager} ): Partial<IProps> => {
    ( contextObject ): Partial<IProps> => {
        console.log('ContextConnector-mapper-TodoList');
        console.log(contextObject);
        console.log('contextObject.appManager.todoManager.getTodos()');
        console.log(contextObject.appManager.todoManager.getTodos());
        return {
            addTodo: contextObject.appManager.todoManager.addTodo,
            removeTodo: contextObject.appManager.todoManager.removeTodo,
            todos: contextObject.appManager.todoManager.getTodos(),
        };
    }
);
