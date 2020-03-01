import React from 'react';

import { AppContext } from '../lib/Types';
import { ContextConnector } from '../../../Ozone/ContextWrapper';
import { Todo } from '../lib/State';
import { TodoEdit } from './TodoEdit';
import { TodoMutations } from '../../test/lib/TodoMutations';
import { TodoProjections } from '../../layered/lib/TodoProjections';

interface IProps {
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

    private onRemoveTodo = (todoId: number) => {
        this.props.removeTodo(todoId);
    }

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
                            onTodoDelete={ () => this.onRemoveTodo(todo.id) }
                            todo={todo}
                        />
                    )
                }
            </div>
        );
    }

}


export default ContextConnector<AppContext>(
    TodoList,
    ( contextObject ): IProps => {
        return {
            addTodo: (title: string) => contextObject.store.applyMutation(
                TodoMutations.addTodo, [
                    {
                        title: title,
                        done: false,
                        id: contextObject.store.applyProjection(TodoProjections.getNextTodoId, [])
                    }
                ]
            ),
            removeTodo: (todoId: number) => contextObject.store.applyMutation( TodoMutations.removeTodo, [todoId] ),
            todos: contextObject.store.applyProjection(TodoProjections.getTodos, [])
        };
    }
);
