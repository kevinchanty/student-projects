export type Question = {
    id: number;
    content: string;
};

export type TestRecord = {
    id: number;
    user_id: number;
    question_id: number;
    selected_answers: JSON;
    question_time: number;
    answer_time: number;
};

export type ShopItems = {
    item_name: string;
    calories: number;
    price: number;
    is_gym: boolean;
}