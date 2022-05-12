import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("special_tiles").del();

    // Inserts seed entries
    await knex("special_tiles").insert([
        { origin: 3, destination: 24, reward: 26, is_reward: true },
        { origin: 21, destination: 84, reward: 68, is_reward: true },
        { origin: 26, destination: 46, reward: 25, is_reward: true },
        { origin: 30, destination: 68, reward: 43, is_reward: true },
        { origin: 71, destination: 93, reward: 27, is_reward: true },
        { origin: 95, destination: 73, reward: -27, is_reward: false },
        { origin: 81, destination: 41, reward: -45, is_reward: false },
        { origin: 75, destination: 38, reward: -43, is_reward: false },
        { origin: 54, destination: 9, reward: -50, is_reward: false },
        { origin: 37, destination: 6, reward: -36, is_reward: false },
    ]);
}
