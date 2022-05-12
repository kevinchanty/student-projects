import { Knex } from "knex";
import jwtSimple from "jwt-simple";
import { jwtConfig } from "../jwt";
// import { sendEmail } from "../controller/userController";
import dotenv from "dotenv";
import { Users } from "./model";

dotenv.config();

export class UserService {
    constructor(private knex: Knex) {}

    async getUserInfo(userId: number) {
        let user = await this.knex
            .select("*")
            .from("users")
            .where("id", userId)
            .first();
        return user as Users;
    }

    async getUserProfile(userId: number) {
        const row = await this.knex
            .select("id", "username", "score", "glycemic_index", "biography")
            .from("users")
            .where({ id: userId })
            .first();

        if (!row) {
            throw new Error("User does not exist");
        }
        return row;
    }

    async checkDuplicatedUser(email: string) {
        let user;
        try {
            user = await this.knex
                .select("*")
                .from("users")
                .where("email", email);
        } catch (e) {
            console.error(e);
        }
        if ((user as any).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    async signUp(name: string, email: string,bio:string, image:string) {
        let insertItem = {
            username: name,
            email,
            score: 0,
            glycemic_index: 0,
            finished_all_mc: false,
            is_active: false,
            profile_picture: image,
            is_poly:false,
            gym_quota:2,
            biography:bio,
        };
        try {
            const id = await this.knex("users")
                .insert(insertItem)
                .returning("id");
            return id;
        } catch (e) {
            console.log(e);
            return;
        }
    }

    async checkAccount(email: string) {
        return await this.knex
            .select("*")
            .from("users")
            .where("email", email)
            .first();
    }

    async activateAcc(userId: number) {
        await this.knex("users")
            .update({ is_active: true })
            .where("id", userId);
    }

    async genToken(id: number, email: string) {
        let token = jwtSimple.encode({ id, email }, jwtConfig.SECRET);
        for (;;) {
            let passcode = Math.random().toString().slice(-6);
            if (this.passcode_token_map.has(passcode)) {
                continue;
            }
            let timer = setTimeout(() => {
                this.passcode_token_map.delete(passcode);
            }, 1000 * 60 * 5);
            this.passcode_token_map.set(passcode, { token, timer });
            // todo send link with passcode to email
            return passcode;
        }
    }

    checkPasscode(passcode: string) {
        let session = this.passcode_token_map.get(passcode);
        if (session) {
            this.passcode_token_map.delete(passcode);
            clearTimeout(session.timer);
            return session.token;
        }
        console.error("wrong passcode or expired");
        return;
    }

    passcode_token_map = new Map<string, { token: string; timer: any }>();
}
