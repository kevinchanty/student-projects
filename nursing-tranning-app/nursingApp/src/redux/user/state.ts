export type UserState = {
    id?: number;
    username?: string;
    score?: number;
    glycemic_index?: number;
    finished_all_mc?: boolean;
    biography?: string;
    active_question?: PopUpQuestion | null;
    email?: string;
    is_poly?: boolean;
    profile_picture?: string;
    destination?: string | null;
    is_admin?: boolean;
};

export type PopUpQuestion = {
    question: Question;
    answers: Answer[];
};

export type Question = {
    id: number;
    content: string;
};

export type Answer = {
    id: number;
    question_id: number;
    content: string;
    is_correct: boolean;
    is_active: boolean;
    option?: string;
};

export const initialState: UserState = {};
