import { NextFunction, Request, Response } from "express";
import { Bearer } from "permit";
import jwtDecode from "jwt-decode";
import { Knex } from "knex";
import { UserService } from "../service/userService";

const permit = new Bearer({
    query: "access_token",
});
export class GuardMiddleware {
    constructor(private knex: Knex, public userService: UserService) {}

    getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
        const token = permit.check(req);

        let jwtPayload: { email: string; id: number };

        try {
            jwtPayload = jwtDecode(token as string); //Check if token is issued by us

            if (!jwtPayload.id || !jwtPayload.email) {
                throw new Error();
            } //Check if token has id
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Invalid Token" });
            return;
        }

        try {
            const user = await this.userService.getUserInfo(jwtPayload.id);

            req.user = user;
            next();
        } catch (error) {
            console.log(error);

            res.status(400).json({ message: "User not Found" });
            return;
        }
    };
}
