import React from "react";

import PostList from "./PostList";

const App = () => {
  return (
    <div className="ui container">
      <br />
      <h1 style={{ color: "green" }}>
        This app fetches API from JSONPlaceholder using Axios, Redux-Thunk (for
        async action creators that performs the api requests) and React-Redux
        (to handle State management [store])
      </h1>
      <br />
      <br />
      <PostList />
    </div>
  );
};

export default App;
