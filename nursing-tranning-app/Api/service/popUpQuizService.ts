import { Knex } from "knex";
import { TestRecord } from "./model";

export type Token = {
    id: number;
    username: string | undefined;
};

export class PopUpQuizService {
    constructor(private knex: Knex) {}

    async getQuestions(userId: number) {
        try {
            let questions = await this.knex
                .select("questions.id", "questions.content")
                .from(
                    this.knex
                        .select("*")
                        .from("test_records")
                        .where("user_id", userId)
                        .as("a")
                )
                .rightJoin("questions", "a.question_id", "questions.id")
                .where("a.question_id", "is", null)
                .andWhere("questions.is_active", true);
            return questions;
        } catch (e) {
            return e;
        }
    }

    async getAnswers(questionId: number) {
        let answers = await this.knex
            .select("*")
            .from("answers")
            .where("question_id", questionId);
        return answers;
    }

    async updateCoin(userId: number, coinsChange: number) {
        let oldScore = await this.knex
            .select("score")
            .from("users")
            .where("id", userId)
            .first();

        let score;

        if (oldScore.score + coinsChange >= 0) {
            score = await this.knex
                .update({
                    score: oldScore.score + coinsChange,
                })
                .into("users")
                .where("id", userId)
                .returning("score");
        } else {
            score = await this.knex
                .update({
                    score: 0,
                })
                .into("users")
                .where("id", userId)
                .returning("score");
        }
        return score;
    }

    async postTestRecord(body: TestRecord, user: Token) {
        let insertBody = {
            user_id: user.id,
            question_id: body.question_id,
            is_correct: body.is_correct,
            selected_answer: body.selected_answer,
        };
        try {
            await this.knex.insert(insertBody).into("test_records");
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async finishedAllQuestions(userId: number) {
        await this.knex("users")
            .update({ finished_all_mc: true })
            .where("id", userId);
    }

    // async setActiveQuestion(userId: number, questionId: number) {
    //     await this.knex("users")
    //         .update({ active_question: questionId })
    //         .where("id", userId);
    // }

    // async getActiveQuestion(questionId: number) {
    //     await this.knex("questions").select("*").where("id", questionId);
    // }
}
