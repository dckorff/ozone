import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';

import { Store } from '../Store';

describe('Store Tests',
  function() {

    it('The initial state should equal get state', function() {
        const initialState = {value: 'hello'}
        const store = new Store(initialState);
        const currentState = store.get( (state) => state, [] );
        chai.expect(initialState).to.deep.equal(currentState);
    });

    it('After a state set, state get should equal the new state', function() {
        const initialState = {value: 'hello'}
        const store = new Store(initialState);
        const changedState = { value: 'changed' };
        store.set( (state) => changedState, []);
        const currentState = store.get( (state) => state, [] );
        chai.expect(changedState).to.deep.equal(currentState);
    });

    it('When subscribed, you should recieve notification of state changes', function(){

        const initialState = {value: 'hello'};
        const newState = {value: 'goodbye'};
        const store = new Store(initialState);

        const callback = sinon.fake();

        store.onStateChanged(callback);

        store.set( (state) => {return newState;}, [] );

        // @ts-ignore
        const [currentStore, previousStore] = callback.getCall(0).args;

        // @ts-ignore
        chai.expect(currentStore.get( (state) => state, [] )).to.deep.equal(newState);

        // @ts-ignore
        chai.expect(previousStore.get( (state) => state, [] )).to.deep.equal(initialState);


    });

    it('Unsubscribing from state changes should prevent you from recieving notifications of state changes', function(){

        const initialState = {value: 'hello'};
        const newState = {value: 'goodbye'};
        const store = new Store(initialState);

        const callback = sinon.fake();

        const unsubscribe = store.onStateChanged(callback);

        store.set( (state) => {return newState;}, [] );

        unsubscribe();

        store.set( (state) => {return initialState;}, [] );

        chai.expect(callback.calledOnce).to.equal(true);

    });

});
