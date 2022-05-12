import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("student_posts").del();
    await knex("post_images").del();
    await knex("post_comments").del();

    // Inserts seed entries
    await knex("student_posts").insert([
        {
            user_id: 1,
            caption: "This is breakfast.",
            visibility: true,
            create_at: new Date(2021, 9, 19, 8, 10, 10),
            update_at: new Date(),
        },
        {
            user_id: 1,
            caption: "This is lunch.",
            visibility: true,
            create_at: new Date(2021, 9, 19, 12, 10, 10),
            update_at: new Date(),
        },
        {
            user_id: 1,
            caption: "This is dinner.",
            visibility: false,
            create_at: new Date(2021, 9, 19, 18, 10, 10),
            update_at: new Date(),
        },
        {
            user_id: 1,
            caption: "This is breakfast.",
            visibility: false,
            create_at: new Date(2021, 9, 10, 8, 10, 10),
            update_at: new Date(),
        },
        {
            user_id: 1,
            caption: "This is lunch.",
            visibility: true,
            create_at: new Date(2021, 9, 10, 12, 10, 10),
            update_at: new Date(),
        },
        {
            user_id: 1,
            caption: "This is dinner.",
            visibility: false,
            create_at: new Date(2021, 9, 10, 18, 10, 10),
            update_at: new Date(),
        },
        {
            user_id: 5,
            caption: "This is diner.",
            visibility: false,
            create_at: new Date(2021, 9, 10, 18, 10, 10),
            update_at: new Date(),
        },
        {
            user_id: 6,
            caption: "This is lunch.",
            visibility: true,
            create_at: new Date(2021, 9, 10, 18, 10, 10),
            update_at: new Date(),
        },
    ]);

    await knex("post_images").insert([
        {
            post_id: 1,
            url: "real-dinner.jpeg",
        },
        {
            post_id: 2,
            url: "real-lunch.jpeg",
        },
        {
            post_id: 3,
            url: "real-dinner.jpeg",
        },
        {
            post_id: 4,
            url: "real-lunch.jpeg",
        },
        {
            post_id: 5,
            url: "real-dinner.jpeg",
        },
        {
            post_id: 6,
            url: "real-lunch.jpeg",
        },
        {
            post_id: 7,
            url: "real-dinner.jpeg",
        },
        {
            post_id: 8,
            url: "real-lunch.jpeg",
        },
    ]);

    // function createRating() {
    //     return Math.floor(Math.random() * 4) + 1
    // }
    // let myRating:any = []

    // for (let i = 0; i < 35; i++) {
    //     myRating.push({
    //         user_id:  Math.floor(Math.random() * 7) + 1,
    //         post_id: Math.floor(Math.random() * 7) + 1,
    //         rating: createRating()
    //     })

    // }
    // await knex("post_ratings").insert(myRating)
}
