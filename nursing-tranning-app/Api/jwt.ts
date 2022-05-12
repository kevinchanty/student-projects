let JWT_SECRET = "secret";
if (!JWT_SECRET) {
    throw new Error("missing JWT_SECRET in env");
}

export let jwtConfig = {
    SECRET: JWT_SECRET,
};
