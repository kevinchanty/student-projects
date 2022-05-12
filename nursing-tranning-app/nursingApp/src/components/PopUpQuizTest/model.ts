export type TestRecord = {
    id: number;
    user_id: number;
    question_id: number;
    answer_id: number;
    is_selected: boolean | null;
    is_active: boolean;
    is_answered: boolean;
    question_time: number | null;
    answer_time: number | null;
};

export type User = {
    id: number;
    username: string;
    password: string;
    score: number;
    glycemic_index: number;
    finished_all_mc: boolean;
};

export type Answer = {
    id: number;
    question_id: number;
    content: string;
    is_correct: boolean;
};

export type Question = {
    id: number;
    content: string;
};
