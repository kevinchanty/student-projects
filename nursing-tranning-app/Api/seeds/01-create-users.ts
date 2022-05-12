import { Knex } from "knex";
import jwtSimple from "jwt-simple";
import { jwtConfig } from "../jwt";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            username: "kevinboy1",
            email: "kevinboy1@tecky.io",
            is_active: true,
            score: 1000,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: true,
            profile_picture: "placeholder.webp",
            gym_quota: 2,
            is_admin: true,
            win: 0,
            created_at: new Date(2021, 9, 28),
        },
        {
            username: "kevinboy2",
            email: "kevinboy2@tecky.io",
            is_active: true,
            score: 1000,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: true,
            profile_picture: "placeholder.webp",
            gym_quota: 2,
            is_admin: true,
            win: 0,
            created_at: new Date(2021, 9, 28),
        },
        {
            username: "kevinboy3",
            email: "kevinboy3@tecky.io",
            is_active: true,
            score: 1000,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: true,
            profile_picture: "placeholder.webp",
            gym_quota: 2,
            is_admin: true,
            win: 0,
            created_at: new Date(2021, 9, 28),
        },
        {
            username: "sandiegirl1",
            email: "sandiegirl1@tecky.io",
            is_active: true,
            score: 1399,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: true,
            profile_picture: "pig-bank.png",
            gym_quota: 2,
            is_admin: true,
            win: 0,
            created_at: new Date(2021, 8, 1),
        },
        {
            username: "sandiegirl2",
            email: "sandiegirl2@tecky.io",
            is_active: true,
            score: 1399,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: true,
            profile_picture: "pig-bank.png",
            gym_quota: 2,
            is_admin: true,
            win: 0,
            created_at: new Date(2021, 8, 1),
        },
        {
            username: "sandiegirl3",
            email: "sandiegirl3@tecky.io",
            is_active: true,
            score: 1399,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: true,
            profile_picture: "pig-bank.png",
            gym_quota: 2,
            is_admin: true,
            win: 0,
            created_at: new Date(2021, 8, 1),
        },
        {
            username: "fanboy1",
            email: "fanboy1@tecky.io",
            is_active: true,
            score: 1234,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: false,
            profile_picture: "seal.jpeg",
            gym_quota: 2,
            win: 0,
            is_admin: true,
        },
        {
            username: "fanboy2",
            email: "fanboy2@tecky.io",
            is_active: true,
            score: 1234,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: false,
            profile_picture: "seal.jpeg",
            gym_quota: 2,
            win: 0,
            is_admin: true,
        },
        {
            username: "fanboy3",
            email: "fanboy3@tecky.io",
            is_active: true,
            score: 1234,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: false,
            profile_picture: "seal.jpeg",
            gym_quota: 2,
            win: 0,
            is_admin: true,
        },
        {
            username: "markdude",
            email: "markdude@tecky.io",
            is_active: true,
            score: 1987,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: false,
            profile_picture: "mark.jpeg",
            gym_quota: 2,
            win: 0,
            is_admin: false,
        },
        {
            username: "wayneperson",
            email: "wayneperson@tecky.io",
            is_active: true,
            score: 1560,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: false,
            profile_picture: "wayne.jpeg",
            gym_quota: 2,
            win: 0,
            is_admin: false,
        },
        {
            username: "katekapo",
            email: "katekapo@tecky.io",
            is_active: true,
            score: 1233,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: false,
            profile_picture: "kate.jpeg",
            gym_quota: 2,
            is_admin: false,
        },
        {
            username: "lynlynlyn",
            email: "lynlynlyn@tecky.io",
            is_active: true,
            score: 1900,
            glycemic_index: 99,
            finished_all_mc: false,
            biography:
                "Hello, I am a happy nursing student.\n Study hard! Play hard!",
            is_poly: false,
            profile_picture: "https://picsum.photos/300",
            gym_quota: 2,
            win: 0,
            is_admin: false,
        },
    ]);

    let idList = [];
    for (let i = 1; i < 14; i++) {
        idList.push(i);
    }
    let emailList = [
        "kevinboy1@tecky.io",
        "kevinboy2@tecky.io",
        "kevinboy3@tecky.io",
        "sandiegirl1@tecky.io",
        "sandiegirl2@tecky.io",
        "sandiegirl3@tecky.io",
        "fanboy1@tecky.io",
        "fanboy2@tecky.io",
        "fanboy3@tecky.io",
        "markdude@tecky.io",
        "wayneperson@tecky.io",
        "katekapo@tecky.io",
        "lynlynlyn@tecky.io",
    ];

    for (let i = 0; i < idList.length; i++) {
        await knex("users")
            .update({
                token: jwtSimple.encode(
                    { id: idList[i], email: emailList[i] },
                    jwtConfig.SECRET
                ),
            })
            .where("id", idList[i]);
    }
}
