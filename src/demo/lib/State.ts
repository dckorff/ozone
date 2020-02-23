export class State {

    public data: {
        a: number;
        b: number;
        c: number;
    }

    public name: string;

    public nestedValues: {
        level2Values: {
            a: string;
            b: string;
            c: string;
        }
    }

    todos: Array<Todo> = [];

}



export class Todo {
    id: number;
    title: string;
    done: boolean;
}