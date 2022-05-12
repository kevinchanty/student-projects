import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("purchased_items").del();
    await knex("stock_items").del();

    // Inserts seed entries
    await knex("stock_items").insert([
        {
            item_name: "Fruit Meal",
            glycemic_index: 10,
            price: 50,
            is_supermarket: true,
            description: "Apples, pears, bananas, nuts and orange juice. ",
            item_pic: "shop1.jpg",
        },
        {
            item_name: "Avocado",
            glycemic_index: 5,
            price: 70,
            is_supermarket: true,
            description: "Avocado, tomato and cucumber. ",
            item_pic: "shop2.jpg",
        },
        {
            item_name: "Salad",
            glycemic_index: 15,
            price: 30,
            is_supermarket: true,
            description: "Cucumber, tomato, eggs, and vegetables salad. ",
            item_pic: "shop3.jpg",
        },
        {
            item_name: "Rice",
            glycemic_index: 50,
            price: 10,
            is_supermarket: true,
            description: "Green apple and rice. ",
            item_pic: "shop4.jpg",
        },
        {
            item_name: "Yogurt",
            glycemic_index: 10,
            price: 20,
            is_supermarket: true,
            description: "Strawberry yogurt and blueberry wheat peel. ",
            item_pic: "shop5.jpg",
        },
        {
            item_name: "Coffee",
            glycemic_index: 30,
            price: 20,
            is_supermarket: true,
            description: "Special Turkish Coffee. ",
            item_pic: "shop6.jpg",
        },
        {
            item_name: "Milk",
            glycemic_index: 20,
            price: 25,
            is_supermarket: true,
            description: "Corn chips with fresh milk. ",
            item_pic: "shop7.jpg",
        },
        {
            item_name: "Eggs and Sausage",
            glycemic_index: 70,
            price: 5,
            is_supermarket: true,
            description: "British breakfast: Eggs and Sausage. ",
            item_pic: "shop8.jpg",
        },
        {
            item_name: "Hotcake",
            glycemic_index: 80,
            price: 3,
            is_supermarket: true,
            description: "Hotcakes with blueberry jams and juice. ",
            item_pic: "shop9.jpg",
        },

        // { item_name: "igable", glycemic_index: 10, price: 800, is_gym: true, description: "I am very strong and handsome!!! ", item_pic:"gym0.jpg" },
        {
            item_name: "Side Lunges",
            glycemic_index: 20,
            is_gym: true,
            description:
                "Tightness in the groin, hip, and ankle can make this move challenging. ",
            item_pic: "gym1.jpg",
        },
        {
            item_name: "Side Plank",
            glycemic_index: 20,
            is_gym: true,
            description:
                "This exercise can help you be able to sustain good posture and ease of movement by building a strong core and better balance.",
            item_pic: "gym2.jpg",
        },
        {
            item_name: "Running",
            glycemic_index: 60,
            is_gym: true,
            description:
                "help to build strong bones, as it is a weight bearing exercise. ",
            item_pic: "gym3.jpg",
        },
        {
            item_name: "Stretching",
            glycemic_index: 30,
            is_gym: true,
            description:
                "Improve your performance in physical activities, decrease your risk of injuries and enable your muscles to work most effectively. ",
            item_pic: "gym4.jpg",
        },
        {
            item_name: "Weight Lifting",
            glycemic_index: 80,
            is_gym: true,
            description:
                "It's improved posture, better sleep, gaining bone density, maintaining weight loss, among a laundry list of positives.",
            item_pic: "gym5.jpg",
        },
        {
            item_name: "Yoga",
            glycemic_index: 50,
            is_gym: true,
            description:
                "It helps a person manage stress, which is known to have devastating effects on the body and mind.",
            item_pic: "gym6.jpg",
        },
        {
            item_name: "Barbell training",
            glycemic_index: 90,
            is_gym: true,
            description:
                "Lifting weights makes you stronger which allows you to do things with less effort, which boosts confidence. ",
            item_pic: "gym7.jpg",
        },
        {
            item_name: "Dumbbell training",
            glycemic_index: 80,
            is_gym: true,
            description:
                "They allow more balanced development of the left and right sides of your body. ",
            item_pic: "gym8.jpg",
        },
        {
            item_name: "Boxing",
            glycemic_index: 100,
            is_gym: true,
            description:
                "To improve your cardiovascular health and ultimately will benefit from an overall healthier heart. ",
            item_pic: "gym9.jpg",
        },
        {
            item_name: "Jumping Rope",
            glycemic_index: 70,
            is_gym: true,
            description:
                "Burning calories, better coordination, stronger bones, a lower injury risk, and improved heart health. ",
            item_pic: "gym10.jpg",
        },
    ]);

    await knex("purchased_items").insert([
        { user_id: 1, item_id: 1, purchase_at: "2021-10-18" },
        { user_id: 1, item_id: 2, purchase_at: "2021-10-18" },
        { user_id: 1, item_id: 3, purchase_at: "2021-10-17" },
        { user_id: 1, item_id: 4, purchase_at: "2021-10-17" },
        { user_id: 1, item_id: 10, purchase_at: "2021-10-17" },
        { user_id: 1, item_id: 11, purchase_at: "2021-10-17" },
        { user_id: 1, item_id: 12, purchase_at: "2021-10-18" },
        { user_id: 1, item_id: 13, purchase_at: "2021-10-18" },
        { user_id: 2, item_id: 14, purchase_at: "2021-10-18" },
        { user_id: 2, item_id: 15, purchase_at: "2021-10-18" },
        { user_id: 2, item_id: 16, purchase_at: "2021-10-16" },
        { user_id: 2, item_id: 17, purchase_at: "2021-10-16" },
        { user_id: 2, item_id: 8, purchase_at: "2021-10-16" },
        { user_id: 2, item_id: 7, purchase_at: "2021-10-16" },
        { user_id: 2, item_id: 6, purchase_at: "2021-10-20" },
        { user_id: 2, item_id: 5, purchase_at: "2021-10-20" },
        { user_id: 3, item_id: 4, purchase_at: "2021-10-20" },
        { user_id: 3, item_id: 3, purchase_at: "2021-10-20" },
        { user_id: 3, item_id: 2, purchase_at: "2021-10-15" },
        { user_id: 3, item_id: 1, purchase_at: "2021-10-15" },
        { user_id: 3, item_id: 11, purchase_at: "2021-10-15" },
        { user_id: 3, item_id: 12, purchase_at: "2021-10-15" },
        { user_id: 3, item_id: 13, purchase_at: "2021-10-16" },
        { user_id: 3, item_id: 14, purchase_at: "2021-10-16" },
        { user_id: 4, item_id: 15, purchase_at: "2021-10-16" },
        { user_id: 4, item_id: 16, purchase_at: "2021-10-16" },
        { user_id: 4, item_id: 17, purchase_at: "2021-10-14" },
        { user_id: 4, item_id: 18, purchase_at: "2021-10-14" },
        { user_id: 4, item_id: 9, purchase_at: "2021-10-14" },
        { user_id: 4, item_id: 8, purchase_at: "2021-10-14" },
        { user_id: 4, item_id: 7, purchase_at: "2021-10-15" },
        { user_id: 4, item_id: 6, purchase_at: "2021-10-15" },
        { user_id: 5, item_id: 5, purchase_at: "2021-10-15" },
        { user_id: 5, item_id: 4, purchase_at: "2021-10-15" },
        { user_id: 5, item_id: 3, purchase_at: "2021-10-17" },
        { user_id: 5, item_id: 2, purchase_at: "2021-10-17" },
        { user_id: 5, item_id: 12, purchase_at: "2021-10-17" },
        { user_id: 5, item_id: 13, purchase_at: "2021-10-17" },
        { user_id: 5, item_id: 14, purchase_at: "2021-10-15" },
        { user_id: 5, item_id: 15, purchase_at: "2021-10-15" },
        { user_id: 6, item_id: 16, purchase_at: "2021-10-15" },
        { user_id: 6, item_id: 17, purchase_at: "2021-10-15" },
        { user_id: 6, item_id: 18, purchase_at: "2021-10-17" },
        { user_id: 6, item_id: 19, purchase_at: "2021-10-17" },
        { user_id: 6, item_id: 2, purchase_at: "2021-10-17" },
        { user_id: 6, item_id: 4, purchase_at: "2021-10-17" },
        { user_id: 6, item_id: 6, purchase_at: "2021-10-14" },
        { user_id: 6, item_id: 8, purchase_at: "2021-10-14" },
        { user_id: 7, item_id: 11, purchase_at: "2021-10-14" },
        { user_id: 7, item_id: 13, purchase_at: "2021-10-14" },
        { user_id: 7, item_id: 15, purchase_at: "2021-10-20" },
        { user_id: 7, item_id: 17, purchase_at: "2021-10-20" },
        { user_id: 7, item_id: 1, purchase_at: "2021-10-20" },
        { user_id: 7, item_id: 3, purchase_at: "2021-10-20" },
        { user_id: 7, item_id: 5, purchase_at: "2021-10-14" },
        { user_id: 7, item_id: 7, purchase_at: "2021-10-14" },
    ]);
}
