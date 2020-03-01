# Ozone

## Principles
- A single immutable state object.
- No direct access to the state. Change the state with mutation functions, read the state with projection functions.
- Single event broadcast every time a state change occurs.
- Strong typing with TypeScript
- Same idea as redux but with less (or at least different) boilerplate.

```
const store = new OzoneStore({value: 'hello'});

store.onChange( (store, previousStore) => {
    console.log(store.applyProjection( (state) => state.value ));
});

store.applyMutation( (state) => {value: 'hello world'} );
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