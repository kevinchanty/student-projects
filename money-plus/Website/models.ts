export interface sessionUser {
    username: string,
    password: string,
};

export interface Users {
    id?: number,
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    is_superuser: boolean,
    username: string,
    password: string,
    age: string,
    image?: string
};
