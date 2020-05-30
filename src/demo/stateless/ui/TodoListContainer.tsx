import { AppContext } from '../../shared/lib/Types';
import { ContextConnector } from '../../../Ozone/ContextWrapper';
import { TodoList, IProps } from '../../shared/ui/TodoList';
import { TodoOperations } from '../../shared/lib/TodoOperations';

export default ContextConnector<AppContext>(
    TodoList,
    ( contextObject ): IProps => {
        return {
            addTodo: (title: string) => contextObject.store.set(
                TodoOperations.addTodo, [
                    {
                        title: title,
                        done: false
                    }
                ]
            ),
            setDone: (todoIndex: number, done: boolean) => contextObject.store.set(
                TodoOperations.setTodoDone,
                [todoIndex, done]
            ),
            onChangedTitle: (todoIndex: number, title: string) => contextObject.store.set(
                TodoOperations.setTodoTitle,
                [todoIndex, title]
            ),
            removeTodo: (todoIndex: number) => contextObject.store.set( TodoOperations.removeTodo, [todoIndex] ),
            todos: contextObject.store.get(TodoOperations.getTodos, [])
        };
    }
);
