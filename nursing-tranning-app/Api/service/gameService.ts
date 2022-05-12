import { Knex } from "knex";

export type Player = {
    id: number;
    location: number;
    answering_mc: boolean;
    coins: number;
};

export class GameService {
    constructor(private knex: Knex) {}
    async getUser(userId: number) {
        return await this.knex("users").select("*").where("id", userId).first();
    }

    async createRoom(roomName: string) {
        return await this.knex
            .insert({ name: roomName, turn: 0 })
            .into("game_rooms")
            .returning("id");
    }

    async checkInRoom(userId: number) {
        return await this.knex
            .select("*")
            .from("game_room_members")
            .where("user_id", userId);
    }

    async getRoomList() {
        const roomList = await this.knex
            .select("game_rooms.id", "game_rooms.name")
            .from("game_rooms")
            .innerJoin(
                "game_room_members",
                "game_room_members.game_room_id",
                "game_rooms.id"
            )
            .groupBy("game_rooms.id", "game_rooms.name")
            .havingRaw("count(*)>0");
        console.log(roomList);

        const roomIds = roomList.reduce((agg, result) => {
            agg.push(result.id);
            return agg;
        }, []);

        const userInRoom = await this.knex("game_room_members")
            .select(
                "game_room_members.*",
                "users.username",
                "users.profile_picture"
            )
            .whereIn("game_room_id", roomIds)
            .join("users", { "game_room_members.user_id": "users.id" })
            .orderBy("game_room_members.id", "asc");

        const aggUserInRoom = userInRoom.reduce((agg, user) => {
            const newUser = {
                id: user.user_id,
                username: user.username,
                profile_picture: user.profile_picture,
            };

            if (!agg[user.game_room_id]) {
                agg[user.game_room_id] = [newUser];
            } else {
                agg[user.game_room_id].push(newUser);
            }
            return agg;
        }, {});

        const result = roomList.map((record) => {
            return {
                ...record,
                userList: aggUserInRoom[record.id],
            };
        });
        return result;
    }

    async joinRoom(userId: number, roomId: any) {
        await this.knex
            .insert({ user_id: userId, game_room_id: parseInt(roomId) })
            .into("game_room_members");
    }

    async leaveRoom(row: { user_id: number; game_room_id: number }) {
        await this.knex("game_room_members").where(row).delete();
    }

    async checkPlayer(roomId: any) {
        let playersToPlay = 2;
        let record = await this.knex("game_room_members")
            .select("user_id")
            .where("game_room_id", parseInt(roomId));
        let playerInRoom = record.length;
        if (playerInRoom >= playersToPlay) {
            return true;
        } else {
            return false;
        }
    }

    async getPlayerList(roomId: number) {
        let playerList = await this.knex
            .select(
                "users.id",
                "users.username",
                "users.profile_picture",
                "game_room_members.game_room_id",
                { order: "game_room_members.id" }
            )
            .from("game_room_members")
            .leftJoin("users", "game_room_members.user_id", "users.id")
            .where("game_room_members.game_room_id", roomId);
        return playerList;
    }

    async insertGameRecord(row: {
        user_id: number;
        game_room_id: number;
        location: number;
        coins: number;
        answering_mc: boolean;
    }) {
        await this.knex.insert(row).into("game_records");
    }

    async getGameRecord(userId: number, roomId: number) {
        return await this.knex
            .select(
                "game_records.location",
                "game_records.coins",
                "game_records.answering_mc",
                "users.username",
                "users.profile_picture",
                "users.id"
            )
            .from("game_records")
            .leftJoin("users", "game_records.user_id", "users.id")
            .where({ game_room_id: roomId, user_id: userId })
            .orderBy("game_records.id", "desc")
            .first();
    }

    async getGameRecords(roomId: number) {
        return await this.knex
            .select(
                "game_records.location",
                "game_records.coins",
                "game_records.answering_mc",
                "users.id",
                "users.username",
                "users.profile_picture"
            )
            .from("game_records")
            .leftJoin("users", "game_records.user_id", "users.id")
            .where({ game_room_id: roomId })
            .orderBy("game_records.id", "desc");
    }

    async getTurn(gameRoomId: number) {
        return await this.knex("game_rooms")
            .select("turn")
            .where("id", gameRoomId);
    }

    async changeTurn(gameRoomId: number) {
        return await this.knex("game_rooms")
            .increment("turn")
            .where("game_rooms.id", gameRoomId)
            .returning("turn");
    }

    async getSpecialTiles() {
        return this.knex.select("*").from("special_tiles");
    }

    async getSpecialTilesList() {
        return this.knex.select("origin").from("special_tiles");
    }

    async getSpecialTile(location: number) {
        return this.knex
            .select("*")
            .from("special_tiles")
            .where("origin", location)
            .first();
    }

    async getQuestions() {
        return this.knex.select("*").from("questions");
    }

    async getAnswers(questionId: number) {
        return this.knex
            .select("*")
            .from("answers")
            .where("question_id", questionId);
    }

    async submitAnswer(row: {
        user_id: number;
        question_id: number;
        answer_id: number;
        game_room_id: number;
        special_tile_id: number;
    }) {
        return this.knex.insert(row).into("game_question_records");
    }

    async gameOver(winner: Player, playerState: Player[]) {
        //insert winning record
        await this.knex("users").increment("win").where("id", winner.id);

        // inserting coins
        for (let player of playerState) {
            let { score } = await this.knex("users")
                .select("score")
                .where("id", player.id)
                .first();
            console.log("score: ", score);
            console.log(player);

            await this.knex("users")
                .update({ score: score + player.coins })
                .where("id", player.id);
        }

        return;
    }
}

const gameRoomList = [
    {
        id: 1,
        name: "jhsdk",
        userList: [
            {
                id: "sfda",
                username: "",
                profile_picture: "",
            },
        ],
    },
];
