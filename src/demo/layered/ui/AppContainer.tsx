import { App, IProps } from '../../shared/ui/App';
import { AppContext } from '../lib/Types';
import { ContextConnector } from '../../../Ozone/ContextWrapper';
import TodoContainer from './TodoListContainer';

export default ContextConnector<AppContext>(
    App,
    ( contextObject ): Partial<IProps> => {
        return {
            name: contextObject.todoManager.getName(),
            onNameChanged: contextObject.todoManager.setName,
            todoList: TodoContainer
        };
    }
);
