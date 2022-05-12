import { JWTPayload } from "../../../types";
import { Users } from "../../components/Supermarket/model";

export function login(token: string) {
    return {
        type: "login" as const,
        token,
    };
}

export function loginFailed(reason: string) {
    return {
        type: "loginFailed" as const,
        reason,
    };
}

export function logout() {
    return {
        type: "logout" as const,
    };
}

export function signupFailed(reason: string) {
    return {
        type: "signupFailed" as const,
        reason,
    };
}

export type AuthAction =
    | ReturnType<typeof login>
    | ReturnType<typeof logout>
    | ReturnType<typeof loginFailed>
    | ReturnType<typeof signupFailed>;
