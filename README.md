# Redux-Thunk
<br>
<em>npm install --save redux-thunk</em>
<br>
<br>

Fetching data in a redux app: 

- component gets rendered
- componentDidMount
- we call action creator from componentDidMount
- action creator makes API request
- api responds with data
- action creator creates action that has data on the payload
- reducers take action
- new state, rerender
<br>
<br>

# Async Action-Creators
<br>
<br>
- action creators must return plain JS objects<br><br>

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
<br>
<br>

# Middlewares
<br>
<br>
- action -> dispatch -> middlewares -> reducers
- functions that STOP, MODIFY actions
- redux-thunk allows action-creators to return functions with (dispatch, getState) params
<br>
<br>

# Config index.js to use middlewares
<br>
<br>
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



