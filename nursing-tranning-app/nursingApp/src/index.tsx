import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { defineCustomElements } from "@ionic/pwa-elements/loader"; // For Camera Desktop Experience
import store from "./redux/store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../src/redux/store";
// import { socket, SocketContext } from "./components/Context/socket";

// ReactDOM.render(<App />, document.getElementById("root")); // For Camera Desktop Experience
// defineCustomElements(window); // For Camera Desktop Experience

ReactDOM.render(
    <React.StrictMode>
        {/* <SocketContext.Provider value={socket}> */}
        <Provider store={store}>
            {/* <ConnectedRouter history={history}> */}
            <App />
            {/* </ConnectedRouter> */}
        </Provider>
        {/* </SocketContext.Provider> */}
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
