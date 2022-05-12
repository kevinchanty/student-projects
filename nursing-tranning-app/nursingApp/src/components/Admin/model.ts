export type Answer = {
    id: number;
    question_id: number;
    content: string;
    is_correct: boolean;
    is_active: boolean;
};

export type Question = {
    id: number;
    content: string;
    is_active?: boolean;
};
