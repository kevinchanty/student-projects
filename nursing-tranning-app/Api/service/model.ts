export type Answer = {
    id: number;
    question_id?: number;
    content?: string;
    is_correct: boolean;
    is_active: boolean;
};

export type Question = {
    id: number;
    content: string;
};

export type TestRecord = {
    user_id: number;
    question_id: number;
    selected_answer: number;
    is_correct: boolean;
    question_time: number;
    answer_time: number;
};

export type StockItems = {
    id: number;
    item_name: string;
    glycemic_index: number;
    price: number;
    is_gym?: boolean;
    is_supermarket?: boolean;
    description?: string;
};

export type PurchasedItems = {
    user_id?: number;
    item_id?: number;
    purchase_at?: number;
};

export type Users = {
    id: number
    username?: string;
    token?: string;
    email?: string;
    is_active?: boolean;
    score?: number;
    glycemic_index?: number;
    finished_all_mc?: boolean;
    biography?: string;
    active_question?: number;
    is_poly: boolean;
    profile_picture?: string;
    gym_quota: number;
}

declare global{
    namespace Express{
        interface Request{
            user: Users
        }
    }
}