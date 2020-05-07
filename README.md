reduxthunk

fetching data in a redux app

- component gets rendered
- componentDidMount
- we call action creator from componentDidMount
- action creator makes API request
- api responds with data
- action creator creates action that has data on the payload
- reducers take action
- new state, rerender

async actions creators

- action creators must return plain JS objects

bad approach

```javascript
export const fetchPosts = async () => {
  const response = await jsonPlaceholder.get("/posts");

  return {
    type: "FETCH_POSTS",
    payload: response,
  };
};
```

- because of async await, it returns a request instead of an action, reducers can't accept this
- secondly, by the time our reducer get the action, payload: response isn't there yet

## Middlewares

- action -> dispatch -> middlewares
- functions that STOP, MODIFY actions
- redux-thunk allows action-creators to return functions with (dispatch, getState) params

## Config index.js to use middlewares

index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
```

action-creator

```javascript
export const fetchPosts = () => async (dispatch, getState) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response });
};
```

# rules of reducers

- can't return undefined, default the STATE
- returns STATE using ONLY previous state and action
- can't mutate previous state, return new object/array to allow for new STATE

## safe state updates in reducers

- state.filter() - remove
- [...state, 'hi'] - adding element to array state
- state.map(el => el === 'hi' ? 'bye' : el ) - replacing element in an array
- {...state, name: 'Sam'} - updating/adding propery in an object
- {...state, age: undefined} || \_.omit{state, 'age'} (lodash) - removing propery from an object

## MapStateToPRops(state, ownProps)
