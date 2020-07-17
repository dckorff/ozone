import { AppContext } from '../../shared/lib/Types';
import { ContextConnector } from '../../../ozone/ContextWrapper';
import { App, IProps } from '../../shared/ui/App';
import { TodoOperations } from '../../shared/lib/TodoOperations';
import TodoListContainer from './TodoListContainer';

export default ContextConnector<AppContext>(
    App,
    ( contextObject ): IProps => {
        return {
            name: contextObject.store.get(TodoOperations.getName, []),
            onNameChanged: (name: string) => contextObject.store.set(TodoOperations.setName, [name]),
            todoList: TodoListContainer
        };
    }
);
