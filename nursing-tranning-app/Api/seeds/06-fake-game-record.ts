import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("game_records").del();
    await knex("game_room_members").del();
    await knex("game_rooms").del();

    // Inserts seed entries
    await knex("game_rooms").insert([
        { id: 99, name: "test room 1", turn: 1 },
        { id: 98, name: "test room 2", turn: 1 },
    ]);
    await knex("game_room_members").insert([
        { user_id: 10, game_room_id: 99 },
        { user_id: 11, game_room_id: 98 },
        { user_id: 12, game_room_id: 98 },
    ]);
    await knex("game_records").insert([
        {
            game_room_id: 99,
            user_id: 10,
            location: 1,
            coins: 0,
            answering_mc: false,
        },
        {
            game_room_id: 98,
            user_id: 11,
            location: 50,
            coins: -40,
            answering_mc: false,
        },
        {
            game_room_id: 98,
            user_id: 12,
            location: 80,
            coins: 40,
            answering_mc: false,
        },
    ]);
}
