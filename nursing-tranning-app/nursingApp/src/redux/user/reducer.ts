import { userInfo } from "os";
import { UserAction } from "./action";
import { UserState, initialState } from "./state";

export function userReducer(
    state: UserState = initialState,
    action: UserAction
): UserState {
    switch (action.type) {
        case "loggingIn":
            return action.user;

        case "purchase":
            return action.user;

        case "removeUser":
            return {};

        case "setActiveQuestion":
            return {
                ...state,
                active_question: action.question,
            };

        case "removeActiveQuestion":

            return {
                ...state,
                active_question: null,
                destination: null,
            };

        case "saveDestination":
            return {
                ...state,
                destination: action.destination,
            };

        case "updateCoin":
            return {
                ...state,
                score: action.score,
            };

        default:
            return state;
    }
}
