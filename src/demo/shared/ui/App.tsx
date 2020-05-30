import React from 'react';

export interface IProps {
    name: string;
    onNameChanged: (name: string) => void;
    todoList: typeof React.Component;
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
                <this.props.todoList />
            </div>
        );
    }

}
