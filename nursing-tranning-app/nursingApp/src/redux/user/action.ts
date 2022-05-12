import { Question } from "../../components/PopUpQuizTest/model";
import { PopUpQuestion, UserState } from "./state";

export function loggingIn(user: UserState) {
    return {
        type: "loggingIn" as const,
        user,
    };
}
export function purchase(user: UserState) {
    return {
        type: "purchase" as const,
        user,
    };
}

export function updateCoin(score: number) {
    return {
        type: "updateCoin" as const,
        score,
    };
}

export function removeUser() {
    return {
        type: "removeUser" as const,
    };
}

export function setActiveQuestion(question: PopUpQuestion) {
    return {
        type: "setActiveQuestion" as const,
        question,
    };
}

export function removeActiveQuestion() {
    return {
        type: "removeActiveQuestion" as const,
    };
}

export function saveDestination(destination: string) {
    return {
        type: "saveDestination" as const,
        destination,
    };
}

export type UserAction = ReturnType<
    | typeof loggingIn
    | typeof purchase
    | typeof removeUser
    | typeof setActiveQuestion
    | typeof removeActiveQuestion
    | typeof saveDestination
    | typeof updateCoin
>;
