import { UserService } from "../service/userService";
import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { errorMonitor } from "events";
var nodeoutlook = require("nodejs-nodemailer-outlook");

export type User = {
    id: number;
    username: string;
};

export type Decode = {
    id: number;
    email: string;
};

dotenv.config();

// export function sendEmail(recipient: string, subject: string, body: string) {
//     let transporter = nodemailer.createTransport({
//         service: "hotmail",
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.EMAIL_PW,
//         },
//     });
//     let mailOptions = {
//         from: process.env.EMAIL,
//         to: recipient,
//         subject: subject,
//         text: body,
//     };
//     transporter.sendMail(mailOptions, function (error, response) {
//         if (error) {
//             console.log(error);
//         }
//     });
// }

export class UserController {
    constructor(private userService: UserService) {}

    sendEmail(recipient: string, subject: string, body: string) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "teckydemo@gmail.com",
                pass: "NotAPolyUProject",
            },
        });
        let mailOptions = {
            from: process.env.EMAIL,
            to: recipient,
            subject: subject,
            text: body,
        };
        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            }
        });
    }

    postNewUser = async (req: Request, res: Response) => {
        const { email, username, bio } = req.body;
        const image = req.file?.filename;
        let idList;
        let id;
        let isNew;

        //check if the email has been registered
        try {
            isNew = await this.userService.checkDuplicatedUser(email);
        } catch (e) {
            console.error("check existing user error: ", e);
            res.status(400).json({ message: "user existed" });
            return;
        }
        console.log(isNew);

        if (!isNew) {
            res.status(400).json({ message: "user existed" });
            return;
        }

        if (!image) {
            res.status(400).json({ message: "No image" });
            return;
        }
        if (!bio) {
            res.status(400).json({ message: "No Bio" });
            return;
        }

        // inserting the user into the DB returning the user id
        try {
            idList = await this.userService.signUp(username, email, bio, image);

            if (idList) {
                id = idList[0];
            }

            let passcode = await this.userService.genToken(id, email);

            // send email to the registration email
            let emailBody =
                "activation link: " +
                process.env.CLIENT_SERVER +
                "/user/activationPage/" +
                passcode;
            this.sendEmail(email, "Register Successfully", emailBody);
            res.status(200).json({ msg: "registration success" });
            return;
        } catch (e) {
            res.status(400).json({ message: "fail to create account" });
            return;
        }
    };

    activateUser = async (req: Request, res: Response) => {
        let passcode = req.params.passcode;
        let token;
        let userInfo: User;
        try {
            token = this.userService.checkPasscode(passcode);
        } catch (e) {
            console.log(e);
        }

        if (token) {
            userInfo = jwtDecode(token);
            try {
                await this.userService.activateAcc(userInfo.id);
                res.status(200).json({ msg: "account being activated" });
                return;
            } catch (e) {
                console.log(e);
                res.status(400).json({ message: "activation failed" });
                return;
            }
        }
    };

    getUserInfo = async (req: Request, res: Response) => {
        const userId = req.user.id;

        try {
            let userInfo = await this.userService.getUserInfo(userId);
            res.json({ userInfo });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: (e as Error).toString() });
        }
    };

    getUserProfile = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);

        if (!userId) {
            res.status(400).json({ error: "missing usderId in req.body" });
            return;
        }

        try {
            const result = await this.userService.getUserProfile(userId);
            res.json(result);
        } catch (error) {
            res.status(400).json({
                error: (error as Error).toString(),
            });
        }
    };

    sendLoginEmail = async (req: Request, res: Response) => {
        let email = req.headers.email;
        let accountInfo;
        let passcode;

        //check if user exist with email submitted from client
        try {
            accountInfo = await this.userService.checkAccount(email as string);
            if (!accountInfo) {
                console.log("user not exist");
                res.status(401).json({
                    error: "user not exist",
                });
                return;
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: "user not exist" });
            return;
        }

        try {
            passcode = await this.userService.genToken(
                accountInfo.id,
                accountInfo.email
            );
            let emailBody =
                "Login link: " +
                process.env.CLIENT_SERVER +
                "/loginPage/" +
                passcode;
            this.sendEmail(accountInfo.email, "Login Link", emailBody);
            res.status(200).json({ msg: "login email sent" });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: "user not exist / passcode expired",
            });
        }
    };

    logInWithLink = async (req: Request, res: Response) => {
        let passcode = req.params.passcode;
        let token;

        try {
            token = this.userService.checkPasscode(passcode);
            console.log(token);

            res.status(200).json(token);
            return;
        } catch (e) {
            console.log(e);
            res.status(400).json({ msg: "incorrect passcode" });
        }
    };
}
