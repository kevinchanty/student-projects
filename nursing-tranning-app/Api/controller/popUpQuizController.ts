import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import { ManageQuizService } from "../service/manageQuizService";
import { PopUpQuizService, Token } from "../service/popUpQuizService";
import { Question } from "./model";

export class PopUpQuizController {
    constructor(private popUpQuizService: PopUpQuizService) {}

    getQuestions = async (req: Request, res: Response) => {
        let userId = req.user.id;
        try {
            let questions: Question[] =
                await this.popUpQuizService.getQuestions(userId);
            if (questions) {
                res.status(200).json(questions);
            } else {
                res.status(400).json({
                    msg: "all questions has been answered",
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    // getActiveQuestion = async (req: Request, res: Response) => {
    //     let questionId = parseInt(req.params.questionId);
    //     try {
    //         let activeQuestion = await this.popUpQuizService.getActiveQuestion(
    //             questionId
    //         );
    //         res.status(200).json({ message: "get active question sucess" });
    //     } catch (e) {
    //         console.log(e);
    //         res.status(500).json({ message: "internal error" });
    //     }
    // };

    getAnswers = async (req: Request, res: Response) => {
        let questionId = parseInt(req.params.id);
        try {
            let answers = await this.popUpQuizService.getAnswers(questionId);
            res.json(answers);
        } catch (e) {
            res.json(e);
        }
    };

    submitAnswer = async (req: Request, res: Response) => {
        let body = req.body;
        let user = { id: req.user.id, username: req.user.username };
        console.log("submit answer success");
        let score;

        try {
            // inserting test record
            await this.popUpQuizService.postTestRecord(body, user);

            // update coins
            if (body.is_correct) {
                score = await this.popUpQuizService.updateCoin(user.id, 50);
            } else {
                score = await this.popUpQuizService.updateCoin(user.id, -30);
            }
            console.log(score);

            res.status(201).json(score[0]);
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "internal server error" });
        }
    };

    finishedAllQuestions = async (req: Request, res: Response) => {
        let user = req.user;
        if (!user.finished_all_mc) {
            try {
                await this.popUpQuizService.finishedAllQuestions(user.id);
                res.status(200).json({
                    message: "all pop up questions are being answered",
                });
                return;
            } catch (e) {
                console.log(e);
                res.status(500).json({ message: "internal error" });
                return;
            }
        }
        res.status(200).json({
            message: "all pop up questions are being answered",
        });
        return;
    };

    // setActiveQuestion = async (req: Request, res: Response) => {
    //     let user = req.user;
    //     let questionId = parseInt(req.params.questionId);
    //     try {
    //         await this.popUpQuizService.setActiveQuestion(user.id, questionId);
    //         res.status(200).json({ message: "active question being set" });
    //         return;
    //     } catch (e) {
    //         console.log(e);
    //         res.status(500).json({ message: "internal error" });
    //         return;
    //     }
    // };
}
