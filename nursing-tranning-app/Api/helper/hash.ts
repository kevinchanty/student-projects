import { hash, compare } from "bcrypt";

const rounds = 10;

export function hashPassword(password: string): Promise<string> {
    return hash(password, rounds);
}

export function comparePassword(
    password: string,
    password_hash: string
): Promise<boolean> {
    return compare(password, password_hash);
}
