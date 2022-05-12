import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("answers").del();
    await knex("questions").del();
    // Inserts seed entries
    await knex("questions").insert([
        {
            content: "Normal fasting plasma glucose (FPS) is",
            is_active: true,
        },
        {
            content: "You are at risk of type 2 diabetes if you were",
            is_active: true,
        },
        {
            content: "The diagnostic criteria of diabetes are",
            is_active: true,
        },
        {
            content:
                "Good news! You can lower your risk of type 2 diabetes by taking on of the following step",
            is_active: true,
        },
        {
            content: "The criteria for defining prediabetes is",
            is_active: true,
        },
    ]);

    await knex("answers").insert([
        {
            question_id: 1,
            content: "< 5.6 mmol/L",
            is_correct: true,
            is_active: true,
        },
        {
            question_id: 1,
            content: "< 6.0 mmol/L",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 1,
            content: "< 7.0 mmol/L",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 1,
            content: "< 7.8 mmol/L",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 2,
            content: "less than 40 years old",
            is_correct: true,
            is_active: true,
        },
        {
            question_id: 2,
            content: "an Asian",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 2,
            content: "Body Mass Index is normal",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 2,
            content: "more than 50 years old",
            is_correct: false,
            is_active: false,
        },
        {
            question_id: 3,
            content: "HbA1c ≥ 6.5%",
            is_correct: true,
            is_active: true,
        },
        {
            question_id: 3,
            content: "(OGTT) is 140mg/dL (7.8 mmol/L)",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 3,
            content: "HbA1c 5.7 - 6.4%",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 3,
            content: "HbA1c 4.0 -6.0%",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 4,
            content: "weight management",
            is_correct: true,
            is_active: true,
        },
        {
            question_id: 4,
            content: "performing stomach surgery",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 4,
            content: "monitoring the blood glucose",
            is_correct: true,
            is_active: true,
        },
        {
            question_id: 4,
            content: "joining diabetes support group",
            is_correct: true,
            is_active: true,
        },
        {
            question_id: 5,
            content:
                "impaired fasting glucose (IFG): Fasting plasma glucose (FPG)",
            is_correct: true,
            is_active: true,
        },
        {
            question_id: 5,
            content:
                "impaired glucose tolerance(IGT): Fasting plasma glucose(FPG)",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 5,
            content: "HbA1c 6.0 - 7.0 %",
            is_correct: false,
            is_active: true,
        },
        {
            question_id: 5,
            content:
                "impaired gfasting glucose (IFG): 2-hr plasma glucose (PG) during to 199mg/dL (11.0 mmol?L)",
            is_correct: false,
            is_active: true,
        },
    ]);
}
