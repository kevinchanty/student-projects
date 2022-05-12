import { JWTPayload } from "../../../types";

export type AuthState = {
    user?: User;
    error?: string;
    token?: string;
};

export type User = JWTPayload;

export const initialState: AuthState = {
    user: undefined,
};
