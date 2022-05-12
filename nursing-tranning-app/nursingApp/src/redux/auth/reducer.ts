import { removeUser } from "../user/action";
import { AuthAction } from "./action";
import { AuthState, initialState } from "./state";

export function authReducer(
    state: AuthState = initialState,
    action: AuthAction
): AuthState {
    switch (action.type) {
        case "login":
            return {
                ...state,
                token: action.token,
            };

        case "loginFailed":
            return { ...state, error: action.reason };

        case "logout":
            return {};

        case "signupFailed":
            return { ...state, error: action.reason };

        default:
            return state;
    }
}
