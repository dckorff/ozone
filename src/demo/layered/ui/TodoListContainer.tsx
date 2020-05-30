import { AppContext } from '../lib/Types';
import { ContextConnector } from '../../../Ozone/ContextWrapper';
import { TodoList, IProps } from '../../shared/ui/TodoList';

export default ContextConnector<AppContext>(
    TodoList,
    ( contextObject ): Partial<IProps> => {
        return {
            addTodo: (title: string) => contextObject.todoManager.addTodo(title, false),
            setDone: (todoIndex: number, done: boolean) => contextObject.todoManager.setTodoDone(todoIndex, done),
            onChangedTitle: (todoIndex: number, title: string) => contextObject.todoManager.setTodoTitle(todoIndex, title),
            removeTodo: (todoIndex: number) => contextObject.todoManager.removeTodo(todoIndex),
            todos: contextObject.todoManager.getTodos()
        };
    }
);
