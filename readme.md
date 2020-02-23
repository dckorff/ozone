# OZONE

## principles
3-tiered architecture. Need a business layer with complex logic. Think of the state as a database - you don't want your ui coupled to it. 
A single immutable state object.
Single event broadcast every time a state change occurs.
A layer of abstraction between the state object and the rest of the application (data access layer). Mutators and Projectors.
    - why? so your ui and state are not tighly coupled - you can change/refactor the state then instead of changing all the thing that refered to that state, you can instead change the projector function(s)
Strong typing with TypeScript
Less boilerplate than redux.
No direct access to the state. State changes occur through mutation functions, state read functions occur from projection functions


## TODO:
x- connector thing 
x- make the connector thing respond to state changes
x- add something in the connector thing for mapping things to props
x- fix the typing in the AppManager.applyMutation functions
x- reactions to state changes in the context wrapper - working for rerendering based on top-level state change
x- reactions to state changes in the context wrapper - work as context value change
- fix the typing in the connector
- pass-through props that are not connected
- asyncronous functions for onStateChanged callbacks

- the connect function should do a diff of the props and only render if they're different?

- demo that is purely functional - no manager?

- mutations & projections
    - do not allow access to the state directly - only change through mutation functions, and only get through projection functions
        - no getState() function - force a layer between the state and the business logic
    - pass to the state manager?
    
- watchers?
    - should there be a separate concept for watchers?

- similarly to how actions can be serialized and replayed, would there be a way to do that with these mutation functions?
        

- unit test - state manager
- unit test mutations
- unit test projections