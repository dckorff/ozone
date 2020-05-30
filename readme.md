# Ozone

## Principles
- A single immutable state object.
- No direct access to the state. Get and set the state with pure functions.
- Single event broadcast every time a state change occurs.
- Strong typing with TypeScript
- Similar idea as Redux but with more flexibility and less boilerplate.


## Example
```
import { Store } from 'ozone';

const store = new Store({value: 'hello'});

// Any time the store changes...
store.onChange( (store, previousStore) => {
    // Provide a pure function for getting a value out of the store:
    console.log(store.get( (state) => state.value ));
});

// Provide a pure function for mutating the store:
store.set( (state) => {value: 'hello world'} );

```


## React Integration
Ozone includes an additional but separate tool help itegrate with React.

Add the store to your app's context:
```
import { Store, ContextWrapper } from 'ozone';

const store = new Store({value: 'hello'});

<ContextWrapper
    contextObject={{store: store}}
    onChange={store.onStateChanged}
>
    <App />
</ContextWrapper>
```
Connect your component to the store:
```
class Label extends React.Component {
    render() {
        <span>{this.props.value}</span>
    }
}
// Any time your store chanages this will run and if any values are different
// your component will be rerendered
export default ContextConnector(
    Label,
    ( contextObject ): IProps => {
        return {
            value: contextObject.store.get( (state) => state.value )
        };
    }
);
```


## TODO:
- share mutations/projections between demo apps
- fix the typing in the connector
- pass-through props that are not connected
- asyncronous functions for onStateChanged callbacks
- optionally pass in context
- the connect function should do a diff of the props and only render if they're different
- similarly to how actions can be serialized and replayed, would there be a way to do that with these mutation functions?
- middleware/hooks
    - start/end mutation
    - serialize mutations (playback/undo)

- unit tests
    - store
        - mutations
        - projections
        - subscriptions
            - subscribe
            - unsubscribe
            - async subscriptions
            - errors in subscription
            - order of operations - each subscriber should be triggered for each mutation serially
    - context wrapper
        - container of a connected component does not rerender if the context value changes (only connected components should rerender)
        - test equality
        - test that props being passed in are merged with connected props (what if they're the same?)