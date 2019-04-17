import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { Store } from "redux";
import configStore, { IApplicationState } from "./Store";

interface IProps {
  store: Store<IApplicationState>;
}

const Root: React.SFC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <Routes />
    </Provider>
  );
};

const store = configStore();
ReactDOM.render(<Root store={store} />, document.getElementById(
  "root"
) as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
