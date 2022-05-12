import { Request, Response } from "express";
import { ManageQuizService } from "../service/manageQuizService";

export class ManageQuizController {
    constructor(private manageQuizService: ManageQuizService) {}

    manageQuestion = async (req: Request, res: Response) => {
        let questionId = parseInt(req.params.questionId);

        try {
            let question = await this.manageQuizService.getQuestion(questionId);
            let answers = await this.manageQuizService.getAnswers(question.id);
            res.status(200).json({ question, answers });
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "unable to get question" });
            return;
        }
    };

    getQuestions = async (req: Request, res: Response) => {
        try {
            let result = await this.manageQuizService.getQuestions();
            res.json(result);
        } catch (e) {
            res.json(e);
        }
    };

    getAnswers = async (req: Request, res: Response) => {
        const questionId = parseInt(req.params.id);
        try {
            let result = await this.manageQuizService.getAnswers(questionId);
            res.json(result);
        } catch (e) {
            res.json(e);
        }
    };

    deleteQuestion = async (req: Request, res: Response) => {
        const questionId = parseInt(req.params.id);
        try {
            await this.manageQuizService.deleteQuestion(questionId);
            res.json({ message: "question has been deleted" });
        } catch (e) {
            res.json(e);
        }
    };

    postQuestion = async (req: Request, res: Response) => {
        const body = req.body;
        const question = body.question;
        const answerList = body.answerList;

        try {
            await this.manageQuizService.postQuestion(question, answerList);
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "unable to create question" });
            return;
        }
    };

    updateQuestion = async (req: Request, res: Response) => {
        const body = req.body;
        const question = body.question;
        const AnsList = body.answer;
        // updating the question
        try {
            await this.manageQuizService.updateQuestion(question);
        } catch (e) {
            return e;
        }

        // delete all the old answers
        try {
            await this.manageQuizService.deleteAns(question.id);
        } catch (e) {
            return e;
        }

        // insert new answers
        try {
            await this.manageQuizService.addAns(question.id, AnsList);
        } catch (e) {
            return e;
        }

        return res.json({ success: true });
    };
}
