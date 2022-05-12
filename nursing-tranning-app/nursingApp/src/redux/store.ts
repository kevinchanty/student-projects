import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { AuthAction } from "./auth/action";
import { authReducer } from "./auth/reducer";
import { AuthState } from "./auth/state";
import { logger } from "redux-logger";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk, { ThunkDispatch } from "redux-thunk";
import { PhotoFeedAction } from "./photoFeed/action";
import { PhotoFeedState } from "./photoFeed/state";
import { photoFeedReducer } from "./photoFeed/reducer";
import { UserAction } from "./user/action";
import { UserState } from "./user/state";
import { userReducer } from "./user/reducer";

// State
export type RootState = {
    auth: AuthState;
    photoFeed: PhotoFeedState;
    user: UserState;
};

// Action & Dispatch
export type RootAction = AuthAction | PhotoFeedAction | UserAction;
export type RootDispatch = ThunkDispatch<RootState, {}, RootAction>;
// export type RootDispatch = Dispatch<RootAction>;

// Reducer
export const rootReducer: (
    rootState: RootState | undefined,
    action: RootAction
) => RootState = combineReducers({
    // Type
    auth: authReducer,
    photoFeed: photoFeedReducer,
    user: userReducer,
});

// Extension: Logger
declare global {
    /* tslint:disable:interface-name */
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;

export const history = createBrowserHistory();

export type IRootThunk = ThunkDispatch<RootState, null, RootAction>;

const rootEnhancer = composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
    // applyMiddleware(logger)
);

const store = createStore(rootReducer, rootEnhancer);

export default store;
