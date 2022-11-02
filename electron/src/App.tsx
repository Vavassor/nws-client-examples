import React from "react";
import "./App.css";
import { CurrentConditions } from "./CurrentConditions";
import { store } from "./store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <CurrentConditions />
      </div>
    </Provider>
  );
};

export default App;
