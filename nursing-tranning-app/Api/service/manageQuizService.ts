import { Knex } from "knex";
import { Answer, Question } from "./model";

export class ManageQuizService {
    constructor(private knex: Knex) {}

    async getQuestion(questionId: number) {
        return await this.knex("questions")
            .select("*")
            .where("id", questionId)
            .first();
    }

    async getQuestions() {
        const result = await this.knex.select("*").from("questions");
        return result;
    }

    async getAnswers(questionId: number) {
        const result = await this.knex("answers")
            .where({ question_id: questionId })
            .select("*");
        return result;
    }

    async deleteQuestion(questionId: number) {
        // delete the answers
        const delAns = await this.knex("answers")
            .where("question_id", questionId)
            .update({ is_active: false });

        // delete the question
        const result = await this.knex("questions")
            .where("id", questionId)
            .update({ is_active: false });
        return result;
    }

    async postQuestion(question: string, answerList: Answer[]) {
        //insert the question first and return the id of the question
        console.log("start inserting question");
        console.log(question);

        let id = await this.knex
            .insert({ content: question, is_active: true })
            .into("questions")
            .returning("id");
        console.log("finish insert question");

        console.log(answerList);

        answerList.map(async (answer) => {
            await this.knex
                .insert({
                    question_id: id[0],
                    content: answer.content,
                    is_correct: answer.is_correct,
                    is_active: true,
                })
                .into("answers");
        });
    }

    async updateQuestion(question: Question) {
        const txn = await this.knex.transaction();
        await txn
            .where("id", question.id)
            .update({ content: question.content })
            .into("questions");
        await txn.commit();
        return;
    }

    async deleteAns(questionId: number) {
        const txn = await this.knex.transaction();

        await txn.where("question_id", questionId).into("answers").del();
        await txn.commit();
        return;
    }

    async addAns(questionId: number, AnsList: Answer[]) {
        const txn = await this.knex.transaction();
        for (const answer of AnsList) {
            await txn
                .insert({
                    question_id: questionId,
                    content: answer.content,
                    is_correct: answer.is_correct,
                    is_active: answer.is_active,
                })
                .into("answers");
        }
        await txn.commit();
        return;
    }
}
